package ee.ut.pillime.noodid.db.repository;

import ee.ut.pillime.noodid.db.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByKasutajanimi(String kasutajanimi);
}
