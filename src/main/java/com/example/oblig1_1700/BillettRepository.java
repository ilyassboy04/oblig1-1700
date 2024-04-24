package com.example.oblig1_1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate Billettdb;

    public void billettLagring(Billett innBillett) {
        String sql = "INSERT INTO Billetter(film,antall,fornavn,etternavn,telefonnummer,epost) VALUES(?,?,?,?,?, ?)";
        Billettdb.update(sql, innBillett.getFilm(),innBillett.getAntall(),innBillett.getFornavn(),innBillett.getEtternavn(),
                innBillett.getTelefonnummer(),innBillett.getEpost());

    }
    public List<Billett> hentBillett(){
        String sql = "SELECT * FROM Billetter ORDER BY etternavn ASC";
        return Billettdb.query(sql, new BeanPropertyRowMapper(Billett.class));
    }
    public void slettBilletter(){
        String sql = "DELETE FROM Billetter";
        Billettdb.update(sql);
    }

}
