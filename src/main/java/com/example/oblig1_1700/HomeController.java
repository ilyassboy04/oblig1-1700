package com.example.oblig1_1700;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController

public class HomeController {
    List<Billett> list = new ArrayList<>();

    @PostMapping("/lagre")
    public void billettLagring(Billett innBillett){
        list.add(innBillett);
    }

    @GetMapping("/hentBillett")
    public List<Billett> hentBillett(){
        return list;
    }

    @GetMapping("/slettBilletter")
    public void slettBilletter(){list.clear();}

}
