package ee.ut.pillime.noodid.scores;

import ee.ut.pillime.noodid.db.DatabaseService;
import ee.ut.pillime.noodid.db.Partituur;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log4j2
public class PieceService {
    private final DatabaseService databaseService;
    private final ScoreService scoreService;

    public void saveFile(MultipartFile multiPartFile, Partituur partituur) throws IOException {
        //Teeme suvalise pathi
        Path tempPath = Paths.get(UUID.randomUUID().toString());
        //Salvestame faili suvalisele pathile
        multiPartFile.transferTo(tempPath.toFile());
        //Loome pathi tegeliku asukoha jaoks .svg-le
        Path piecePath = Paths.get("scores").resolve(partituur.getAsukoht());
        //Tekitame .svg failid
        scoreService.inkscape2svg(tempPath, piecePath, partituur.getNimi() + ".%02d");
        //Määrame partituurile asukoha
        //kustutame suvalise pathi
        FileUtils.deleteDirectory(tempPath.toFile());
    }

    public Partituur addNewPiece(String nimi) {
        Partituur partituur = new Partituur();
        partituur.setNimi(nimi);
        partituur.setAsukoht(nimi.toLowerCase().replace('ä', 'a').replace('ö', 'o').replace('õ', 'o').replace('ü', 'u').replace(' ', '_'));
        databaseService.addPartituur(partituur);
        return partituur;
    }
}
