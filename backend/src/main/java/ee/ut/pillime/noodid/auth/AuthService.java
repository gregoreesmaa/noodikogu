package ee.ut.pillime.noodid.auth;

import ee.ut.pillime.noodid.db.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
@Log4j2
public class AuthService {

    private static final String ROLE_MASTER = "ROLE_MASTER";
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private static final String ROLE_USER = "ROLE_USER";

    private static final Map<Integer, List<GrantedAuthority>> AUTHORITIES = Map.of(
            1, AuthorityUtils.createAuthorityList(ROLE_USER),
            2, AuthorityUtils.createAuthorityList(ROLE_USER, ROLE_ADMIN),
            3, AuthorityUtils.createAuthorityList(ROLE_USER, ROLE_ADMIN, ROLE_MASTER)
    );

    private final DatabaseService databaseService;

    public AuthToken authenticate(Credentials credentials) {
        User u = databaseService.getUser(credentials.getUsername())
                .filter(user -> user.getParool().equals(credentials.getPassword(user.getSalt())))
                .orElseThrow(AuthException::new);

        return new AuthToken(u, credentials, AUTHORITIES.getOrDefault(u.getTase(), AuthorityUtils.NO_AUTHORITIES));
    }

    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            return new User();
        } else if (authentication instanceof AuthToken) {
            AuthToken authToken = (AuthToken) authentication;
            return (User) authToken.getPrincipal();
        }
        throw new IllegalStateException("User authentication invalid");
    }

    public Optional<Pillimees> getPillimees() {
        return Optional.ofNullable(getUser())
                .map(User::getPillimees);
    }

    public Stream<Pillirühm> getPillirühmad() {
        return getPillimees()
                .map(Pillimees::getPillirühmad)
                .stream()
                .flatMap(Collection::stream);
    }

    public Stream<Partii> getPartiid() {
        return getPillirühmad()
                .map(Pillirühm::getPartiid)
                .flatMap(Collection::stream)
                .distinct();
    }

    public Stream<Partituur> getPartituurid() {
        return getPartiid()
                .map(Partii::getPartituur)
                .distinct();
    }

    public Stream<Repertuaar> getRepertuaarid() {
        return getPartituurid()
                .map(Partituur::getRepertuaarid)
                .flatMap(Collection::stream)
                .distinct();
    }
}
