const form = document.querySelector("#menuForm");
const hint = document.querySelector("#formHint");

const recipient = "cassandra.scheuenstuhl@campus.hamburger-fh.de";

function selectedDietOptins() {
    const checkedBoxes = document.querySelectorAll('input[name="diet"]:checked');
    return Array.from(checkedBoxes).map((box) => box.value);
}

function selectedMenu() {
    const checkedMenu = document.querySelector('input[name="menuChoice"]:checked');
    return checkedMenu ? checkedMenu.value : "";
}

function buildMailBody(formData) {
    const dietOptions = selectedDietOptions();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

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

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        hint.textContent = "Bitte füllen Sie Vorname, Nachname aus und wählen Sie ein Menü aus.";
        form.reportValidity();
        return;
    }


    const formData = new FormData(form);
    const subject = "Rückmeldung zum Mittagsmenü";
    const body = buildMailBody(formData);
    const mailLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    hint.textContent = "Ihr Standard-Mailprogramm wird geöffnet. Bitte prüfen Sie Ihre Eingaben und senden Sie die E-Mail dort ab.";
    window.location.href = mailLink;
});
