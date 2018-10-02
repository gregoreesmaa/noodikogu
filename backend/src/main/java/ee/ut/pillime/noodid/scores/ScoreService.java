package ee.ut.pillime.noodid.scores;

import ee.ut.pillime.noodid.db.Partii;
import ee.ut.pillime.noodid.db.Partituur;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class ScoreService {
    public void deleteScoreImage(Partii score) {
        Partituur piece = score.getPartituur();
        Path scoreImage = Paths.get("scores", piece.getAsukoht(), score.getFail());

        try {
            Files.deleteIfExists(scoreImage);
        } catch (IOException e) {
            log.error("Score deletion failed", e);
        }
    }

    public void findScoreImage(HttpServletResponse response, Partii score) {
        try {
            Partituur piece = score.getPartituur();
            Path scoreImage = Paths.get("scores", piece.getAsukoht(), score.getFail());

            String contentType = Optional.ofNullable(Files.probeContentType(scoreImage))
                    .orElseGet(() -> URLConnection.guessContentTypeFromName(score.getFail()));
            response.setContentType(contentType);

            InputStream is = Files.newInputStream(scoreImage);
            IOUtils.copy(is, response.getOutputStream());
        } catch (NoSuchFileException e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            log.error("Score file not found", e);
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            log.error("Failed to find score", e);
        }
    }

    public void pdf2svg(Path input, Path output) {
        try {
            log.info("[pdf2svg] Converting: " + input.toAbsolutePath() + " to " + output.toAbsolutePath());
            ProcessBuilder pb = new ProcessBuilder("pdf2svg\\pdf2svg", input.toString(), output.toString(), "all");
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            Process process = pb.start();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            log.error("Failed to convert PDF to SVG", e);
        }
    }

    public void inkscape2svg(Path input, Path dest, String filenameFormat) {
        try {
            log.info("[inkscape2svg] Converting: " + input.toAbsolutePath() + " to " + dest.resolve(filenameFormat + ".svg").toAbsolutePath());
            Path splitPages = Files.createTempDirectory("pdftk_splitting");
            runCommand("pdftk", input.toString(), "burst", "output", splitPages.resolve(filenameFormat + ".pdf").toString());
            Files.list(splitPages)
                    .filter(page -> page.toString().endsWith(".pdf"))
                    .forEach(path -> runCommand("inkscape", "-l", dest.resolve(path.getFileName().toString() + ".svg").toString(), path.toString()));
            FileUtils.forceDelete(splitPages.toFile());
        } catch (IOException e) {
            log.error("Failed to convert PDF to SVG", e);
        }
    }

    private void runCommand(String... command) {
        try {
            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            Process process = pb.start();
            process.waitFor();
        } catch (InterruptedException | IOException e) {
            log.error("Failed to run command: " + Arrays.toString(command), e);
        }
    }
}
