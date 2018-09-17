package ee.ut.pillime.noodid.web;

import ee.ut.pillime.noodid.auth.AuthService;
import ee.ut.pillime.noodid.db.DatabaseService;
import ee.ut.pillime.noodid.db.Partii;
import ee.ut.pillime.noodid.db.Partituur;
import ee.ut.pillime.noodid.db.Repertuaar;
import ee.ut.pillime.noodid.scores.ScoreService;
import ee.ut.pillime.noodid.statistics.StatisticsResult;
import ee.ut.pillime.noodid.statistics.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@CrossOrigin(allowCredentials = "true")
@RequiredArgsConstructor
public class API {

    private final AuthService authService;
    private final DatabaseService databaseService;
    private final ScoreService scoreService;
    private final StatisticsService statisticsService;

    @GetMapping("/api/repertuaarid")
    private Stream<Repertuaar> getRepertuaar() {
        return databaseService.getRepertuaarid();
    }

    @GetMapping("/api/repertuaar/{repertuaar}/partituurid")
    private Stream<Partituur> getPartituurid(@PathVariable int repertuaar) {
        return authService.getPartituurid()
                .filter(r -> r.getRepertuaarid().stream().anyMatch(a -> a.getId() == repertuaar));
    }

    @GetMapping("/api/partituur/{partituur}/partiid")
    private Stream<Partii> getPartiid(@PathVariable int partituur) {
        return databaseService.getPartiid(authService.getPillimees().orElse(null), partituur);
    }

    @GetMapping("/api/otsi/{osa}")
    private Map<String, List> leiaRepertuaaridJaPartituurid(@PathVariable String osa) {
        return Map.<String, List>of(
                "repertuaarid", databaseService.otsiRepertuaar(osa).collect(Collectors.toList()),
                "partituurid", databaseService.otsiPartituur(osa).collect(Collectors.toList()));
    }

    @GetMapping("/api/partii/{partii}")
    private void getPartii(HttpServletResponse response, @PathVariable int partii) throws IOException {
        Optional<Partii> scoreOptional = databaseService.getPartii(authService.getPillimees().orElse(null), partii);
        if (!scoreOptional.isPresent()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.flushBuffer();
            return;
        }

        scoreService.findScoreImage(response, scoreOptional.get());
    }

    @GetMapping("/api/pdf2svg/{failinimi}")
    private void pdf2svg(@PathVariable String failinimi) {
        scoreService.pdf2svg(failinimi);
    }

    @GetMapping("/statistics")
    private StatisticsResult getStatistics() throws IOException {
        return statisticsService.getStatistics();
    }

    /*private Map<String, String> personalcodes = Map.of("kristjan", "39803142763", "gregor", "39806170815");

    public String getPersonalCode(String username) {
        if (personalcodes.containsKey(username))
            return personalcodes.get(username);
        return "0";
    }*/
}
