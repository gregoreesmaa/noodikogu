package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "partituurid", schema = "public")
public class Partituur {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "partituur_id_generator")
    @SequenceGenerator(name = "partituur_id_generator", sequenceName = "partituurid_id_seq", allocationSize = 1)
    private int id;
    private String nimi;
    private String asukoht;

    @ManyToMany
    @JsonIgnoreProperties("partituurid")
    @JoinTable(name = "partituur_repertuaaris",
            joinColumns = @JoinColumn(name = "partituur"),
            inverseJoinColumns = @JoinColumn(name = "repertuaar"))
    List<Repertuaar> repertuaarid;

    @OneToMany(mappedBy = "partituur", fetch = FetchType.EAGER)
    //@JsonIgnoreProperties({"partituur", "pillirühmad"})
    @JsonIgnore
    List<Partii> partiid;
}
