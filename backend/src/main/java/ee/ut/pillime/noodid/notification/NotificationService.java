package ee.ut.pillime.noodid.notification;

import ee.ut.pillime.noodid.db.Pillimees;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Log4j2
public class NotificationService {

    private final JavaMailSender emailSender;

    @Value("${regJwtSecret}")
    private String regJwtSecret;

    public void sendRegistrationInfo(Pillimees player) {
        try {
            String jwt = Jwts.builder()
                    .setSubject(player.getKontaktinfo())
                    .setIssuedAt(Date.from(Instant.now()))
                    .claim("pillimeheId", player.getId())
                    .signWith(Keys.hmacShaKeyFor(regJwtSecret.getBytes()),
                            SignatureAlgorithm.HS256)
                    .compact();
            String jwtUrl = "https://noodid.ninata.ga/registreeru/" + jwt;
            log.info("Sent registration url to player: {}", jwtUrl);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("Noodikogu <noreply@noodid.ninata.ga>");
            message.setTo(player.getKontaktinfo());
            message.setSubject("Olete lisatud Noodikogu süsteemi");

            message.setText("Olete lisatud Noodikogu süsteemi. Endale kasutaja loomiseks külasta URLi: " + jwtUrl);
            emailSender.send(message);
        } catch (MailException e) {
            log.error("Failed to send email", e);
        }
    }
}
