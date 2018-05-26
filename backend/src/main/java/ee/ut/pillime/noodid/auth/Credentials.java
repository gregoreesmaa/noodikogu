package ee.ut.pillime.noodid.auth;

import lombok.Data;

@Data
public class Credentials {
    private String username;
    private String password;

    public String getPassword(String salt) {
        return org.apache.commons.codec.digest.DigestUtils.sha512Hex(password + '.' + salt);
    }
}
