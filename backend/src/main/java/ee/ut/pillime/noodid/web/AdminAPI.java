package ee.ut.pillime.noodid.web;

import ee.ut.pillime.noodid.db.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Stream;

@RestController
@CrossOrigin(allowCredentials = "true")
@RequiredArgsConstructor
public class AdminAPI {

    private final DatabaseService databaseService;

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
}
