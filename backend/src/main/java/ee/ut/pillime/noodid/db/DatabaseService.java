package ee.ut.pillime.noodid.db;

import ee.ut.pillime.noodid.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

import static com.google.common.collect.Streams.stream;

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

    public Stream<User> getUsers() {
        return stream(userRepository.findAll());
    }

    public Optional<User> getUser(String kasutajanimi) {
        return userRepository.findByKasutajanimi(kasutajanimi);
    }

    public Stream<Pillimees> getPillimehed() {
        return stream(pillimeesRepository.findAll());
    }

    public Stream<Pillirühm> getPillirühmad() {
        return stream(pillirühmRepository.findAll());
    }

    public Stream<Repertuaar> getRepertuaarid() {
        return stream(repertuaarRepository.findAll());
    }

    public Stream<Partituur> getPartituurid() {
        return stream(partituurRepository.findAll());
    }

    public Optional<Repertuaar> getRepertuaar(int id) {
        return repertuaarRepository.findById(id);
    }

    public Stream<Partii> getPartiid(int partituur) {
        return stream(partiiRepository.findAllByPartituur_Id(partituur));
    }

    public Stream<Partii> getPartiid(Pillimees pillimees, int partituur) {
        return stream(partiiRepository.findAllByPartituur_Id(partituur))
                .filter(partii -> partii.getPillirühmad().stream()
                        .map(Pillirühm::getPillimehed)
                        .flatMap(Collection::stream)
                        .map(Pillimees::getId)
                        .anyMatch(p -> p == pillimees.getId()));
    }

    public Optional<Partii> getPartii(Pillimees pillimees, int partii_id) {
        return partiiRepository.findById(partii_id)
                .filter(partii -> partii.getPillirühmad().stream()
                        .map(Pillirühm::getPillimehed)
                        .flatMap(Collection::stream)
                        .map(Pillimees::getId)
                        .anyMatch(p -> pillimees.getId() == p));
    }

    public Stream<Partituur> otsiPartituur(String osa) {
        return getPartituurid()
                .filter(partituur -> partituur.getNimi().toLowerCase().contains(osa.toLowerCase()));
    }

    public Stream<Repertuaar> otsiRepertuaar(String osa) {
        return getRepertuaarid()
                .filter(repertuaar -> repertuaar.getNimi().toLowerCase().contains(osa.toLowerCase()));
    }

    public Optional<Partii> getPartii(int id) {
        return partiiRepository.findById(id);
    }

    public void deletePartii(Partii partii) {
        partiiRepository.delete(partii);
    }
}
