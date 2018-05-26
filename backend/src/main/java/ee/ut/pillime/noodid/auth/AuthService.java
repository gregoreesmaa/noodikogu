package ee.ut.pillime.noodid.auth;

import ee.ut.pillime.noodid.db.DatabaseService;
import ee.ut.pillime.noodid.db.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

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
}
