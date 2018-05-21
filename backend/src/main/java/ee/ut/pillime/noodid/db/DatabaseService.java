package ee.ut.pillime.noodid.db;

import ee.ut.pillime.noodid.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class DatabaseService {

    private final UserRepository userRepository;
    private final PillimeesRepository pillimeesRepository;
    private final PillirühmRepository pillirühmRepository;
    private final RepertuaarRepository repertuaarRepository;
    private final PartiiRepository partiiRepository;
    private final PartituurRepository partituurRepository;

    public User addUser(User user) {
        userRepository.save(user);
        return user;
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public Iterable<Pillimees> getPillimehed() {
        return pillimeesRepository.findAll();
    }

    public Iterable<Pillirühm> getPillirühmad() {
        return pillirühmRepository.findAll();
    }

    public Iterable<Repertuaar> getRepertuaarid() {
        return repertuaarRepository.findAll();
    }

    public Iterable<Partii> getPartiid() {
        return partiiRepository.findAll();
    }

    public Iterable<Partituur> getPartituurid() {
        return partituurRepository.findAll();
    }

    public Optional<Repertuaar> getRepertuaar(int id) {
        return repertuaarRepository.findById(id);
    }

    public List<Partituur> otsiPartituur(String osa) {

        return StreamSupport.stream(getPartituurid().spliterator(), false)
                .filter(partituur -> partituur.getNimi().toLowerCase().contains(osa.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Repertuaar> otsiRepertuaar(String osa) {

        return StreamSupport.stream(getRepertuaarid().spliterator(), false)
                .filter(repertuaar -> repertuaar.getNimi().toLowerCase().contains(osa.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Partii otsiPartii(int id) {
        return partiiRepository.findById(id).orElse(null);
    }
}
