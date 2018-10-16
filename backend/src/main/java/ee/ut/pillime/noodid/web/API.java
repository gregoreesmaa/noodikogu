package ee.ut.pillime.noodid.web;

import ee.ut.pillime.noodid.auth.AuthService;
import ee.ut.pillime.noodid.db.*;
import ee.ut.pillime.noodid.scores.ScoreService;
import ee.ut.pillime.noodid.statistics.StatisticsResult;
import ee.ut.pillime.noodid.statistics.StatisticsService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static ee.ut.pillime.noodid.auth.AuthService.ROLE_ADMIN;

@RestController
@CrossOrigin(allowCredentials = "true")
@RequiredArgsConstructor
public class API {

    @Value("${regJwtSecret}")
    private String regJwtSecret;

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
        Optional<Partii> scoreOptional = authService.hasRole(ROLE_ADMIN)
                ? databaseService.getPartii(partii)
                : databaseService.getPartii(authService.getPillimees().orElse(null), partii);

        if (!scoreOptional.isPresent()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.flushBuffer();
            return;
        }

        scoreService.findScoreImage(response, scoreOptional.get());
    }

    @GetMapping("/api/statistics")
    private StatisticsResult getStatistics() throws IOException {
        return statisticsService.getStatistics();
    }

    @PostMapping("/api/user")
    private void addUser(@RequestParam String username, @RequestParam String password, @RequestParam String jwt) {
        User user = new User();
        user.setKasutajanimi(username);
        int pillimeheId = Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(regJwtSecret.getBytes()))
                .parseClaimsJws(jwt)
                .getBody()
                .get("pillimeheId", Integer.class);
        user.setPillimees(databaseService.getPillimees(pillimeheId).orElseThrow(() -> new RuntimeException("Pillimeest ei eksisteeri")));
        String salt = UUID.randomUUID().toString();
        user.setParool(authService.saltPassword(password, salt));
        user.setSalt(salt);
        databaseService.addUser(user);
    }

    /*private Map<String, String> personalcodes = Map.of("kristjan", "39803142763", "gregor", "39806170815");

    public String getPersonalCode(String username) {
        if (personalcodes.containsKey(username))
            return personalcodes.get(username);
        return "0";
    }*/
}
