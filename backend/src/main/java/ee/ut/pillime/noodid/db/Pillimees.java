package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "pillimehed", schema = "public")
public class Pillimees {
    @Id
    int id;
    String nimi;
    String kontaktinfo;

    @ManyToMany
    @JsonIgnoreProperties({"pillimehed", "partiid"})
    @JoinTable(name = "pillirühm_pillimehel",
            joinColumns = @JoinColumn(name = "pillimees"),
            inverseJoinColumns = @JoinColumn(name = "pillirühm"))
    List<Pillirühm> pillirühmad;
}
