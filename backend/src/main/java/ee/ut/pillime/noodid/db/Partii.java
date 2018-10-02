package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "partiid", schema = "public")
public class Partii {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "partii_id_generator")
    @SequenceGenerator(name = "partii_id_generator", sequenceName = "partiid_id_seq", allocationSize = 1)
    int id;
    String fail;

    @ManyToOne
    @JoinColumn(name = "partituur")
    @JsonIgnoreProperties({"partiid", "repertuaarid"})
    Partituur partituur;

    @ManyToMany
    @JsonIgnoreProperties({"partiid", "pillimehed"})
    @JoinTable(name = "pillirühm_partiil",
            joinColumns = @JoinColumn(name = "partii"),
            inverseJoinColumns = @JoinColumn(name = "pillirühm"))
    List<Pillirühm> pillirühmad;
}
