package ee.ut.pillime.noodid.db.repository;

import ee.ut.pillime.noodid.db.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
