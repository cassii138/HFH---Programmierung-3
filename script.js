const form = document.querySelector("#menuForm");
const hint = document.querySelector("#formHint");

const recipient = "cassandra.scheuenstuhl@campus.hamburger-fh.de";

//Ausgewählte Unverträglichkeiten ermittelt//
function selectedDietOptions() {
    const checkedBoxes = document.querySelectorAll('input[name="diet"]:checked');
    return Array.from(checkedBoxes).map((box) => box.value);
}

//Ausgewähltes Menü//
function selectedMenu() {
    const checkedMenu = document.querySelector('input[name="menuChoice"]:checked');
    return checkedMenu ? checkedMenu.value : "";
}


function buildMailBody(formData) {
    const dietOptions = selectedDietOptions();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    //Inhalt der E-Mail//
    return [
        "Hallo,",
        "",
        "hiermit möchte ich meine Rückmeldung zum gemeinsamen Mittagsessen abgeben.",
        "",
        "Meine Angaben:",
        "",
        `Vorname: ${firstName}`,
        `Nachname: ${lastName}`,
        "",
        "Gewünschtes Menü:",
        selectedMenu(),
        "",
        "Ernährungsbesonderheiten / Unverträglichkeiten:",
        dietOptions.length
            ? dietOptions.join(", ")
            : "Keine ausgewählt",
        "",
        "Weitere Angaben zu Unverträglichkeiten:",
        formData.get("dietNotes") || "Keine Angabe",
        "",
        "Allgemeine Informationen oder Anmerkungen:",
        formData.get("generalMessage") || "Keine Angabe",
        "",
        "Viele Grüße",
        `${firstName} ${lastName}`
    ].join("\n");
}

//Absenden des Formulars//
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Formular wird überprüft auf Vollständigkeit//
    if (!form.checkValidity()) {
        hint.textContent = "Bitte füllen Sie Vorname, Nachname aus und wählen Sie ein Menü aus.";
        form.reportValidity();
        return;
    }

    //Formulardaten werden ausgelesen//
    const formData = new FormData(form);

    //E-Mail Erstellung//
    const subject = "Rückmeldung zum Mittagsmenü";
    const body = buildMailBody(formData);
    const mailLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    //Hinweis auf der Website//
    hint.textContent = "Ihr Standard-Mailprogramm wird geöffnet. Bitte prüfen Sie Ihre Eingaben und senden Sie die E-Mail dort ab.";

    //E-Mail Programm wird geöffnet//
    window.location.href = mailLink;
});
