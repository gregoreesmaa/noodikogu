package ee.ut.pillime.noodid.notification;

import ee.ut.pillime.noodid.db.Pillimees;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class NotificationService {

    private final JavaMailSender emailSender;

    public void sendRegistrationInfo(Pillimees player) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(player.getKontaktinfo());
            message.setSubject("Olete lisatud Noodikogu süsteemi");
            message.setText("Olete lisatud Noodikogu süsteemi. Endale kasutaja loomiseks külasta URLi: https://noodid.ninata.ga/");
            emailSender.send(message);
        } catch (MailException e) {
            log.error("Failed to send email", e);
        }
    }
}
