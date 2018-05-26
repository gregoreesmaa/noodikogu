package ee.ut.pillime.noodid.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(allowCredentials = "true")
@RequiredArgsConstructor
@Log4j2
public class AuthAPI {

    private final AuthService authService;

    @PostMapping("/api/auth/login")
    public Object login(@RequestBody Credentials credentials) {
        SecurityContext sc = SecurityContextHolder.getContext();

        AuthToken authentication = authService.authenticate(credentials);

        sc.setAuthentication(authentication);
        return sc.getAuthentication().getPrincipal();
    }

}
