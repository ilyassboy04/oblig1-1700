
let valideringsTeller = 0; //hver gang den passerer en validering så skal den oppdaters, slik passer man på at vi ikke lagrer en array med feil eller tom informasjon

function validerInput(id, regex, errorMessageId, errorMessage) {
    let input = document.getElementById(id);
    let feilMelding = document.getElementById(errorMessageId);

    if (!regex.test(input.value)) {
        feilMelding.textContent = errorMessage;
        feilMelding.style.display = "inline-block"; // viser error
    } else {
        feilMelding.textContent = "";
        feilMelding.style.display = "none"; // skjuler error
        valideringsTeller++;
    }
}

function alleBilletter() {
    valideringsTeller = 0; // resetter når vi oppretter/ lagrer en billett

    // Regexene som vi bruker for inputboksene
    let antallBilletterRegex = /^[1-9]\d*$/; //heltall mellom 1-9
    let fornavnRegex = /^[a-zA-ZæøåÆØÅ\s]+$/; //standard for alfabet, inkl mellomrom og norske alfabet
    let etternavnRegex = /^[a-zA-ZæøåÆØÅ\s]+$/;
    let telefonNummerRegex = /^(\+47)?\d{8}$/; //telefonnummer, minst 8 sifre
    let epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //epostformat

    // validering
    validerInput("antallBilletter", antallBilletterRegex, "antallBilletterError", "Antall må være et positivt heltall.");
    validerInput("fornavn", fornavnRegex, "fornavnError", "Fornavn kan kun inneholde bokstaver og mellomrom.");
    validerInput("etternavn", etternavnRegex, "etternavnError", "Etternavn kan kun inneholde bokstaver og mellomrom.");
    validerInput("telefonNummer", telefonNummerRegex, "telefonNummerError", "Telefonnummer må være 8 siffer.");
    validerInput("epost", epostRegex, "epostError", "E-post må være i riktig format.");

    let filmInput = document.getElementById("filmArkiv").value;
    let antallInput = document.getElementById("antallBilletter").value;
    let fornavnInput = document.getElementById("fornavn").value;
    let etternavnInput = document.getElementById("etternavn").value;
    let telefonnrInput = document.getElementById("telefonNummer").value;
    let epostInput = document.getElementById("epost").value;

    if (valideringsTeller === 5) {

        const billett = {
            film : filmInput,
            antall : antallInput,
            fornavn : fornavnInput,
            etternavn : etternavnInput,
            telefonnummer: telefonnrInput,
            epost : epostInput
        }
        //lagrer verdiene og henter dem med tilbake formatert i tabeller
        $.post("/lagre", billett, function (){
            $.get("hentBillett", function (billetter){
                formaterData(billetter);

            })
        })

        //tømmer input fields etter at vi har lagret verdiene
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonNummer").val("");
        $("#epost").val("");



    }


}
//formater inputen i tabeller
function formaterData(billetter){
    ut="<table class='table table-striped'>" +
        "<tr><th>Film</th> <th>Antall</th> <th>Fornavn</th> <th>Etternavn</th> <th>Telefonnr</th> <th>E-post</th>" +
        "<th></th> <th></th> </tr>";
    for(const billett of billetter){
        ut+= "<tr><td>" + billett.film + "</td><td>" + billett.antall +"</td><td>"
            + billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" + billett.telefonnummer
            + "</td><td>" + billett.epost + "</td><td>"+  '<button class="btn btn-primary">Endre</button>'+ "</td><td>"
            + '<button class ="btn btn-danger" onclick="slettEnkeltBillett('+billett.id+')">Slett</button>'+ "</td>";


    }
    ut += "</table>"
    $("#billettene").html(ut);
}

function slettEnkeltBillett(id){
    const url = "/slettEnkeltBillett?id=" + id;

    $.get(url, function (){
        $.get("hentBillett", function (billetter) {
            formaterData(billetter);
        })
    });
}


function slettBilletter() {
    $.get("/slettBilletter", function (){
        $.get("hentBillett", function (billetter){
            formaterData(billetter);
        })
    });
}

