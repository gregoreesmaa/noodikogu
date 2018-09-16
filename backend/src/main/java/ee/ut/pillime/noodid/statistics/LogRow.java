package ee.ut.pillime.noodid.statistics;

import lombok.Data;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import nl.basjes.parse.core.Field;
import nl.basjes.parse.core.Parser;
import nl.basjes.parse.core.exceptions.DissectionFailure;
import nl.basjes.parse.core.exceptions.InvalidDissectorException;
import nl.basjes.parse.core.exceptions.MissingDissectorsException;
import nl.basjes.parse.httpdlog.HttpdLoglineParser;
import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;

import java.time.LocalDateTime;

import static java.time.LocalDateTime.parse;
import static java.time.format.DateTimeFormatter.ofPattern;
import static java.util.Locale.US;

@Data
@Log4j2
public class LogRow {

    public static final String FORMAT = "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\"";
    public static final Parser<LogRow> PARSER = new HttpdLoglineParser<>(LogRow.class, LogRow.FORMAT);

    @Setter(onMethod_ = {@Field("HTTP.URI:request.firstline.uri")})
    private String uri;

    @Setter(onMethod_ = {@Field("IP:connection.client.host")})
    private String IP;

    private UserAgent userAgent;

    private LocalDateTime time;


    @Field("TIME.STAMP:request.receive.time")
    public void setTime(String timestamp) {
        this.time = parse(timestamp, ofPattern("dd/MMM/yyyy:HH:mm:ss Z", US));
    }

    @Field("HTTP.USERAGENT:request.user-agent")
    public void setUserAgent(String unParsedUserAgent) {
        UserAgentAnalyzer uaa;
        uaa = UserAgentAnalyzer
                .newBuilder()
                .withField("DeviceBrand")
                .withField("DeviceName")
                .withField("AgentName")
                .build();

        this.userAgent = uaa.parse(unParsedUserAgent);
    }

    public static LogRow from(String row) {
        try {
            return LogRow.PARSER.parse(row);
        } catch (InvalidDissectorException | DissectionFailure | MissingDissectorsException e) {
            log.error("Failed to parse log row", e);
            return null;
        }
    }
}
