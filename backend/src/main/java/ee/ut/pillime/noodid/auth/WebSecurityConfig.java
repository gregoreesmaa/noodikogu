package ee.ut.pillime.noodid.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${noauth:false}")
    private boolean noauth;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (noauth) {
            http
                    /**/.csrf().disable();
        } else {
            http
                    .authorizeRequests()
                    /**/.antMatchers(HttpMethod.OPTIONS).permitAll()
                    /**/.antMatchers("/api/auth/**").permitAll()
                    /**/.antMatchers("/api/admin/**").hasRole("ADMIN")
                    /**/.antMatchers("/api/**").authenticated()
                    .and()
                    /**/.csrf().disable();
        }
    }

}