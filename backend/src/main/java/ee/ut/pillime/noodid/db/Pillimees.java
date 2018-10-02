package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "pillimehed", schema = "public")
public class Pillimees {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "pillimees_id_generator")
    @SequenceGenerator(name = "pillimees_id_generator", sequenceName = "pillimehed_id_seq", allocationSize = 1)
    int id;
    String nimi;
    String kontaktinfo;

    @OneToOne(mappedBy = "pillimees")
    @JsonIgnoreProperties({"pillimees"})
    User kasutaja;

    @ManyToMany
    @JsonIgnoreProperties({"pillimehed", "partiid"})
    @JoinTable(name = "pillirühm_pillimehel",
            joinColumns = @JoinColumn(name = "pillimees"),
            inverseJoinColumns = @JoinColumn(name = "pillirühm"))
    List<Pillirühm> pillirühmad;
}
