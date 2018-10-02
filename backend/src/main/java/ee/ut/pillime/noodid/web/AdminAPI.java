package ee.ut.pillime.noodid.web;

import ee.ut.pillime.noodid.db.*;
import ee.ut.pillime.noodid.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Stream;

@RestController
@CrossOrigin(allowCredentials = "true")
@RequiredArgsConstructor
@Log4j2
public class AdminAPI {

    private final DatabaseService databaseService;
    private final NotificationService notificationService;

    @GetMapping("/api/admin/pillimehed")
    private Stream<Pillimees> getPillimees() {
        return databaseService.getPillimehed();
    }

    @GetMapping("/api/admin/pillirühmad")
    private Stream<Pillirühm> getPillirühmad() {
        return databaseService.getPillirühmad();
    }

    @GetMapping("/api/admin/partituurid")
    private Stream<Partituur> getPartituurid() {
        return databaseService.getPartituurid();
    }

    @GetMapping("/api/admin/repertuaarid")
    private Stream<Repertuaar> getRepertuaarid() {
        return databaseService.getRepertuaarid();
    }

    @GetMapping("/api/admin/partiid/{partituur}")
    private Stream<Partii> getPartiid(@PathVariable int partituur) {
        return databaseService.getPartiid(partituur);
    }

    @PostMapping("/api/admin/pillimehed")
    private void addPlayer(@RequestParam("newPlayerName") String name, @RequestParam("newPlayerInfo") String info) {
        Pillimees newPlayer = new Pillimees();
        newPlayer.setNimi(name);
        newPlayer.setKontaktinfo(info);
        databaseService.addPlayer(newPlayer);
        notificationService.sendRegistrationInfo(newPlayer);
    }

    @GetMapping("/api/admin/flutePlayers")
    private int getFlutePlayers() {
        return databaseService.getFlutePlayersCount();
    }
}
