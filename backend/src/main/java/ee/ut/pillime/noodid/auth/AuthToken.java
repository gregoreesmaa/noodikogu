package ee.ut.pillime.noodid.auth;

import ee.ut.pillime.noodid.db.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthToken extends UsernamePasswordAuthenticationToken {
    public AuthToken(User user, Credentials credentials, Collection<GrantedAuthority> authorities) {
        super(user, credentials, authorities);
    }
}
