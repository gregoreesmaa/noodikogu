package ee.ut.pillime.noodid.scores;

import ee.ut.pillime.noodid.db.DatabaseService;
import ee.ut.pillime.noodid.db.Partii;
import ee.ut.pillime.noodid.db.Partituur;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@Log4j2
public class PieceService {
    private final DatabaseService databaseService;
    private final ScoreService scoreService;

    public Path getPiecePath(Partituur piece) {
        return Paths.get("scores").resolve(piece.getAsukoht());
    }

    public void importFile(MultipartFile file, Partituur piece) {
        if ("application/pdf".equals(file.getContentType())) {
            convertPDFtoSVGs(file, piece);
        } else {
            throw new RuntimeException("Bad file type");
        }
        importScores(piece);
    }

    private void convertPDFtoSVGs(MultipartFile multipartPDF, Partituur piece) {
        try {
            //Teeme suvalise pathi
            Path pdf = Files.createTempFile("uploaded", ".pdf");
            //Salvestame faili suvalisele pathile
            multipartPDF.transferTo(pdf.toFile());
            //Tekitame .svg failid
            scoreService.inkscape2svg(pdf, getPiecePath(piece), piece.getNimi() + ".%02d");
            //Määrame partituurile asukoha
            //kustutame suvalise pathi
            FileUtils.forceDelete(pdf.toFile());
        } catch (IOException e) {
            log.error("Failed to import file", e);
            throw new RuntimeException("Failed to import file");
        }
    }

    private void importScores(Partituur piece) {
        try {
            Files.list(getPiecePath(piece))
                    .forEach(score -> {
                        String scoreFileName = score.getFileName().toString();
                        databaseService.getScoreByFolderAndFilename(piece, scoreFileName)
                                .orElseGet(() -> {
                                    Partii newScore = new Partii();
                                    newScore.setFail(scoreFileName);
                                    newScore.setPartituur(piece);
                                    databaseService.addPartii(newScore);
                                    return newScore;
                                });
                    });
        } catch (IOException e) {
            log.error("Failed to add scores to database", e);
        }
    }

    public Partituur addNewPiece(String nimi) {
        Partituur partituur = new Partituur();
        partituur.setNimi(nimi);
        partituur.setAsukoht(nimi.toLowerCase().replace('ä', 'a').replace('ö', 'o').replace('õ', 'o').replace('ü', 'u').replace(' ', '_'));
        try {
            Files.createDirectories(getPiecePath(partituur));
        } catch (IOException e) {
            log.error("Failed to create piece directory", e);
        }
        databaseService.addPartituur(partituur);
        return partituur;
    }

    public void deletePieceFiles(Partituur piece) {
        try {
            FileUtils.forceDelete(getPiecePath(piece).toFile());
        } catch (IOException e) {
            log.error("Failed to delete piece files", e);
        }
    }
}
