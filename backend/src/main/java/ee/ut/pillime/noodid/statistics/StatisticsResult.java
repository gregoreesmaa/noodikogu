package ee.ut.pillime.noodid.statistics;

import lombok.Builder;
import lombok.Value;

import java.util.Map;

@Value
@Builder
public class StatisticsResult {

    Map<String, Long> browserPopularity;
}
