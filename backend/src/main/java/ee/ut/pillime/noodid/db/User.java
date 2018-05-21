package ee.ut.pillime.noodid.db;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "kasutajad", schema = "public")
public class User {
    @Id
    private int id;
    private String kasutajanimi;
    private String parool;
    private String salt;
    private int tase;
    private Integer pillimees;
}
