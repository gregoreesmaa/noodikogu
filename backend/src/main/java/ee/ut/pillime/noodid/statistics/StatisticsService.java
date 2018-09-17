package ee.ut.pillime.noodid.statistics;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

@Service
public class StatisticsService {

    private static final String LOG_LOCATION = "/logs/access.log";

    public StatisticsResult getStatistics() throws IOException {
        List<LogRow> logRows = getLogRows();
        return StatisticsResult.builder()
                .browserPopularity(getBrowsersPopularity(logRows))
                .build();
    }

    private List<LogRow> getLogRows() throws IOException {
        return Files.lines(Paths.get(LOG_LOCATION))
                .map(LogRow::from).collect(Collectors.toList());
    }

    private Map<String, Long> getBrowsersPopularity(List<LogRow> logRows) {
        return logRows.stream()
                .map(LogRow::getUserAgent)
                .map(agent -> agent.getValue("AgentName"))
                .collect(groupingBy(identity(), counting()));
    }

}
