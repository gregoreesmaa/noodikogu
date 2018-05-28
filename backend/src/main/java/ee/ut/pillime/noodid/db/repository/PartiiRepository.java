package ee.ut.pillime.noodid.db.repository;

import ee.ut.pillime.noodid.db.Partii;
import org.springframework.data.repository.CrudRepository;

public interface PartiiRepository extends CrudRepository<Partii, Integer> {
    Iterable<Partii> findAllByPartituur_Id(int partituur_id);
}
