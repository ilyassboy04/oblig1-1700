let bilettsArray = [];
let valideringsTeller = 0; //hver gang den passerer en validering så skal den oppdaters, slik passer man på at vi ikke lagrer en array med feil eller tom informasjon

function updateBilletterDisplay() {
    let billetterDiv = document.getElementById("billettene");
    billetterDiv.innerHTML = ""; // "rengjør området" før det blir plastra på ny info senere

    bilettsArray.forEach(function(bilett) {
        let bilettInfo = document.createElement("p");
        bilettInfo.textContent = bilett.join(", ");
        billetterDiv.appendChild(bilettInfo);
    });
}

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
    let fornavnRegex = /^[a-zA-ZæøåÆØÅ\s]*$/; //standard for alfabet, inkl mellomrom og norske alfabet
    let etternavnRegex = /^[a-zA-ZæøåÆØÅ\s]*$/;
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
        let bilett = [filmInput, antallInput, fornavnInput, etternavnInput, telefonnrInput, epostInput];
        bilettsArray.push(bilett); //passert alle valideringene, da kan vi legge det inn i arrayen

        updateBilletterDisplay();
    }
}


function slettBilletter() {
    document.getElementById("billettene").innerHTML = "";
    bilettsArray.length = 0; //tømmer listen ved å sette lengden av alle elementer lik null
}
