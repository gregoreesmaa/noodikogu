package ee.ut.pillime.noodid.db.repository;

import ee.ut.pillime.noodid.db.Pillimees;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PillimeesRepository extends CrudRepository<Pillimees, Integer> {
    @Query(
            value = "SELECT COUNT(nimi) from pillirühm_pillimehel JOIN pillirühmad ON pillirühm=id WHERE nimi = 'Flööt' GROUP BY nimi",
            nativeQuery = true
    )
    int flutePlayersCount();
}
