package ee.ut.pillime.noodid.db.repository;

import ee.ut.pillime.noodid.statistics.LogRow;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public final class Main {

    public static void main(final String[] args) throws Exception {

        List<LogRow> logRows = Files.lines(Paths.get("C:\\Users\\Kristjan\\IdeaProjects\\noodid\\backend\\example_access.log"))
                .map(LogRow::from)
                .collect(Collectors.toList());

        logRows
                .forEach(System.out::println);

    }

}