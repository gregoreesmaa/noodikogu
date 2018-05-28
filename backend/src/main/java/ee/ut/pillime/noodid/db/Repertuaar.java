package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "repertuaarid", schema = "public")
public class Repertuaar {
    @Id
    private int id;
    private String nimi;

    @ManyToMany(mappedBy = "repertuaarid")
    @JsonIgnoreProperties({"repertuaarid", "partiid"})
    List<Partituur> partituurid;
}
