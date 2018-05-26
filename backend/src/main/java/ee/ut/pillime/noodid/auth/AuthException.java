package ee.ut.pillime.noodid.auth;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Authentication error")
public class AuthException extends AuthenticationException {

    public AuthException() {
        super("Authentication error");
    }
}