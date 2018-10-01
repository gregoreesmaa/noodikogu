package ee.ut.pillime.noodid.scores;

import ee.ut.pillime.noodid.db.Partii;
import ee.ut.pillime.noodid.db.Partituur;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class ScoreService {
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

    public void pdf2svg(String filename) {
        try {
            ProcessBuilder pb = new ProcessBuilder("pdf2svg\\pdf2svg",
                    "pdf2svg\\" + filename + ".pdf",
                    "pdf2svg\\" + filename + ".%d.svg",
                    "all");
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            Process process = pb.start();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
