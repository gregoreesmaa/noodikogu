package ee.ut.pillime.noodid.db.repository;

import ee.ut.pillime.noodid.statistics.LogRow;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public final class Main {

    public static void main(final String[] args) throws Exception {

        /*List<LogRow> logRows = Files.lines(Paths.get("C:\\Users\\Kristjan\\IdeaProjects\\noodid\\backend\\example_access.log"))
                .map(LogRow::from)
                .collect(Collectors.toList());

        logRows
                .forEach(System.out::println);
*/
        String string = "193.40.12.10 - - [14/Sep/2018:09:36:47 +0300] \"GET /api/partii/35 HTTP/2.0\" 403 132 \"https://noodid.ninata.ga/piece\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36\"";

        System.out.println(LogRow.from(string));
    }
}