package com.example.oblig1_1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController

public class HomeController {
    @Autowired
    private BillettRepository repository;


    @PostMapping("/lagre")
    public void billettLagring(Billett innBillett){
        repository.billettLagring(innBillett);
    }

    @GetMapping("/hentBillett")
    public List<Billett> hentBillett(){
        return repository.hentBillett();
    }

    @GetMapping("/slettBilletter")
    public void slettBilletter(){
        repository.slettBilletter();

    }

    @GetMapping("/slettEnkeltBillett")
    public void slettEnkeltBillett(){
        repository.slettEnkeltBillett();
    }

}
