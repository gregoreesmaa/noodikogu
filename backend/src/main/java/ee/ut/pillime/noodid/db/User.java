package ee.ut.pillime.noodid.db;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private String parool;
    @JsonIgnore
    private String salt;
    private int tase;
    @OneToOne
    @JsonIgnoreProperties({"kasutaja"})
    private Pillimees pillimees;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return getParool();
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return getKasutajanimi();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
