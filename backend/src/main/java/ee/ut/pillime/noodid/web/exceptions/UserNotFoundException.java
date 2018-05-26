package ee.ut.pillime.noodid.web.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User not found")
public class UserNotFoundException extends UsernameNotFoundException {

    public UserNotFoundException() {
        super("User not found");
    }
}