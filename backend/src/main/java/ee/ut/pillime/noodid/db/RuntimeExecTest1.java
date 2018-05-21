package ee.ut.pillime.noodid.db;

import java.io.IOException;

public class RuntimeExecTest1 {

    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("pdf2svg\\pdf2svg", "pdf2svg\\JustAGigolo.pdf", "pdf2svg\\JustAGigolo%d.svg", "all");
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            Process process = pb.start();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}