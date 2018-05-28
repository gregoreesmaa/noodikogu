package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "pillirühmad", schema = "public")
public class Pillirühm {
    @Id
    int id;
    String nimi;

    @ManyToMany(mappedBy = "pillirühmad")
    @JsonIgnoreProperties({"pillirühmad", "pillimehed"})
    List<Pillimees> pillimehed;

    @ManyToMany(mappedBy = "pillirühmad")
    @JsonIgnoreProperties({"partiid", "pillirühmad"})
    List<Partii> partiid;
}
