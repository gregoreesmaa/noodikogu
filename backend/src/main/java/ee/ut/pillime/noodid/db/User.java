package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Collection;

@Data
@Entity
@Table(name = "kasutajad", schema = "public")
public class User implements UserDetails {
    @Id
    private int id;
    private String kasutajanimi;
    private String parool;
    private String salt;
    private int tase;
    @OneToOne
    @JsonIgnoreProperties({"kasutaja"})
    private Pillimees pillimees;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return getParool();
    }

    @Override
    public String getUsername() {
        return getKasutajanimi();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
