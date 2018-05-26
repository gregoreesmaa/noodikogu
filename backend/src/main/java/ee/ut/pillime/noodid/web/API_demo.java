package ee.ut.pillime.noodid.web;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
public class API_demo {

    private final API API;

    @GetMapping("/")
    private String hello() {
        return "Teretere!";
    }
/*
    @GetMapping("/user/{username}")
    private String helloUser(@PathVariable String username) {
        return "Tere " + username + "! Sinu isikukood on " + API.getPersonalCode(username);
    }

    @GetMapping("/kaalikas")
    private Object getKaalikas() {
        return Map.of(
                "nimi", "Kristjan Pänr",
                "isikukood", API.getPersonalCode("kristjan"),
                "autod", Arrays.asList("126KMC", "888FIX")
        );
    }*/
}
