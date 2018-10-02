package ee.ut.pillime.noodid;

import ee.ut.pillime.noodid.db.DatabaseService;
import ee.ut.pillime.noodid.db.Partii;
import ee.ut.pillime.noodid.db.Partituur;
import ee.ut.pillime.noodid.scores.ScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Log4j2
@Component
@RequiredArgsConstructor
public class CommandLineAppStartupRunner implements CommandLineRunner {

    private final ScoreService scoreService;
    private final DatabaseService databaseService;

    @Override
    public void run(String... args) {
        //if (args.length == 0 || !args[0].equals("import"))
        //    return;
        try {
            Files.list(Paths.get("scores", "import"))
                    .flatMap(this::importPiece)
                    .forEach(score -> log.info("Imported score, " + score.getFail()));
            log.info("Finished import");
        } catch (Exception e) {
            log.error("Failed to import scores", e);
        }
    }

    private Stream<Partii> importPiece(Path path) {
        log.info("Importing piece: " + path);
        String pieceName = path.getFileName().toString();
        String pieceFolder = pieceName.toLowerCase().replace('ä', 'a').replace('ö', 'o').replace('õ', 'o').replace('ü', 'u').replace(' ', '_');
        Path piecePath = Paths.get("scores").resolve(pieceFolder);

        if (!databaseService.getPieceByFolder(pieceFolder).isPresent()) {
            Partituur piece = new Partituur();
            piece.setNimi(pieceName);
            piece.setAsukoht(pieceFolder);
            databaseService.addPartituur(piece);
        }

        try {
            Files.createDirectories(piecePath);
            Stream<Partii> partiiStream = Files.walk(path)
                    .peek(log::info)
                    .filter(file -> file.getFileName().toString().endsWith(".pdf"))
                    .flatMap(pdf -> importScore(pdf, piecePath));

//            FileUtils.deleteDirectory(path.toFile()); does not work because stream is not fulfilled

            return partiiStream;
        } catch (IOException e) {
            log.error("Failed to import score", e);
        }
        return Stream.empty();
    }

    private Stream<Partii> importScore(Path scoreInPath, Path piecePath) {
        log.info("Importing score: " + scoreInPath);
        String filenameFormat = scoreInPath.getFileName().toString().replaceFirst("[.][^.]+$", ".%d");

        scoreService.inkscape2svg(scoreInPath, piecePath, filenameFormat);

        String pieceFolder = piecePath.getFileName().toString();
        try {
            return Files.list(piecePath)
                    .map(score -> {
                        String scoreFileName = score.getFileName().toString();
                        return databaseService.getScoreByFolderAndFilename(pieceFolder, scoreFileName)
                                .orElseGet(() -> {
                                    Partii newScore = new Partii();
                                    newScore.setFail(scoreFileName);
                                    newScore.setPartituur(databaseService.getPieceByFolder(pieceFolder).get());
                                    databaseService.addPartii(newScore);
                                    return newScore;
                                });
                    });
        } catch (IOException e) {
            log.error("Failed to add score to database", e);
        }
        return Stream.empty();

    }
}