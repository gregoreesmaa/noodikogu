package ee.ut.pillime.noodid.web;

import ee.ut.pillime.noodid.db.*;
import ee.ut.pillime.noodid.scores.PieceService;
import ee.ut.pillime.noodid.scores.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Stream;

@RestController
@CrossOrigin(allowCredentials = "true")
@RequiredArgsConstructor
public class AdminAPI {

    private final PieceService pieceService;
    private final ScoreService scoreService;
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

    @GetMapping("/api/admin/partituur/{partituur}/partiid")
    private Stream<Partii> getPartiid(@PathVariable int partituur) {
        return databaseService.getPartiid(partituur);
    }

    @DeleteMapping("/api/admin/partii/{piece}")
    private void deletePiece(@PathVariable int pieceId) {
        databaseService.getPartituur(pieceId).ifPresent(
                piece -> {
                    pieceService.deletePieceFiles(piece);
                    // TODO delete linked scores
                    databaseService.deletePartituur(piece);
                }
        );
    }

    @DeleteMapping("/api/admin/partii/{partiiId}")
    private void deletePartii(@PathVariable int partiiId) {
        databaseService.getPartii(partiiId).ifPresent(
                partii -> {
                    scoreService.deleteScoreImage(partii);
                    databaseService.deletePartii(partii);
                }
        );
    }

    @PostMapping("/api/admin/partituur")
    private void addPartituur(@RequestParam("file") MultipartFile file, @RequestParam("name") String name) {
        Partituur partituur = pieceService.addNewPiece(name);
        pieceService.importFile(file, partituur);
    }
}
