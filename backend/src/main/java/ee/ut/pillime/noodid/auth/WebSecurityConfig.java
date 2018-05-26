package ee.ut.pillime.noodid.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
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