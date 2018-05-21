package ee.ut.pillime.noodid.web;

import ee.ut.pillime.noodid.db.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
@CrossOrigin
public class API {

    private final DatabaseService databaseService;

    @GetMapping("/kaalikas")
    private Object getKaalikas() {
        List<User> users = new ArrayList<>();
        for (User u : databaseService.getUsers()) {
            users.add(u);
        }
        return users;
    }

    @GetMapping("/pillimehed")
    private Object getPillimees() {
        List<Pillimees> pillimehed = new ArrayList<>();
        for (Pillimees p : databaseService.getPillimehed())
            pillimehed.add(p);
        return pillimehed;
    }

    @GetMapping("/repertuaarid")
    private Object getRepertuaar() {
        List<Repertuaar> repertuaarid = new ArrayList<>();
        for (Repertuaar r : databaseService.getRepertuaarid())
            repertuaarid.add(r);
        return repertuaarid;
    }

    @GetMapping("/repertuaarid/{repertuaar}")
    private Object getPartituurid(@PathVariable int repertuaar) {
        return databaseService.getRepertuaar(repertuaar).map(r -> r.getPartituurid()).orElse(null);
    }

    @GetMapping("/otsi/{osa}")
    private List<Partituur> otsiMidagi(@PathVariable String osa) {
        return databaseService.otsiPartituur(osa);
    }

    @GetMapping("/partiid/{partii}")
    private Partii otsiPartii(@PathVariable int partii) {
        return databaseService.otsiPartii(partii);
    }

    @GetMapping("/pdf2svg/{failinimi}")
    private void pdf2svg(@PathVariable String failinimi) {
        try {
            ProcessBuilder pb = new ProcessBuilder("pdf2svg\\pdf2svg",
                    "pdf2svg\\" + failinimi + "pdf",
                    "pdf2svg\\JustAGigolo%d.svg",
                    "all");
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            Process process = pb.start();
            process.waitFor();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }


    /*private Map<String, String> personalcodes = Map.of("kristjan", "39803142763", "gregor", "39806170815");

    public String getPersonalCode(String username) {
        if (personalcodes.containsKey(username))
            return personalcodes.get(username);
        return "0";
    }*/
}
