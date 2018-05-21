package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "partituurid", schema = "public")
public class Partituur {
    @Id
    private int id;
    private String nimi;
    private String asukoht;

    @ManyToMany
    @JsonIgnoreProperties("partituurid")
    @JoinTable(name = "partituur_repertuaaris",
            joinColumns = @JoinColumn(name = "partituur"),
            inverseJoinColumns = @JoinColumn(name = "repertuaar"))
    List<Repertuaar> repertuaarid;

    @OneToMany(mappedBy = "partituur")
    @JsonIgnoreProperties({"partituur", "pillirühmad"})
    List<Partii> partiid;
}
