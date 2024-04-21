// Array om scores op te slaan
let scores = [];

// Haal de DOM-elementen op
const char = document.getElementById("character");
const curse = document.getElementById("curse");
const curseTwo = document.getElementById("curseTwo");
const scoreDisplay = document.getElementById("score");

// Functie om het personage te laten springen
function jump() {
    char.classList.add("jump-animation"); // Voegt een klasse toe voor springanimatie
    char.style.backgroundImage = "url('../assets/char-jump.gif')"; // Verandert de achtergrondafbeelding van het personage naar een springende versie
    setTimeout(() => {
        char.classList.remove("jump-animation"); // Verwijdert de klasse na een bepaalde tijd om de animatie te stoppen
        char.style.backgroundImage = "url('../assets/itador.gif')"; // Keert terug naar de standaard achtergrondafbeelding van het personage
    }, 500); // Wacht 0.5 seconden voordat de animatie stopt
}

// Functie om te reageren op toetsaanslagen
function handleKeyPress(event) {
    if (!char.classList.contains("jump-animation")) {
        // Controleert of het personage niet al aan het springen is
        jump(); // Roep de jump-functie aan als het personage niet al aan het springen is
    }
}

// Functie om botsingen te controleren
function checkCollision() {
    const charTop = parseInt(
        window.getComputedStyle(char).getPropertyValue("top")
    ); // Haal de bovenkantpositie van het personage op
    const curseLeft = parseInt(
        window.getComputedStyle(curse).getPropertyValue("left")
    ); // Haal de linkerkantpositie van het eerste obstakel op
    const curseLeftTwo = parseInt(
        window.getComputedStyle(curseTwo).getPropertyValue("left")
    ); // Haal de linkerkantpositie van het tweede obstakel op

    scoreDisplay.innerText++; // Verhoog de score met 1

    // Controleer of de obstakels de linkerkant van het scherm hebben bereikt en laat ze verdwijnen
    if (curseLeft < 0) {
        curse.style.display = "none";
    } else {
        curse.style.display = "";
    }

    if (curseLeftTwo < 0) {
        curseTwo.style.display = "none";
    } else {
        curseTwo.style.display = "";
    }

    // Controleer op botsingen tussen het personage en de obstakels
    if (
        (curseLeft < 50 && curseLeft > 0 && charTop > 150) || // Botsing met het eerste obstakel
        (curseLeftTwo > 0 && curseLeftTwo < 50 && charTop < 150) // Botsing met het tweede obstakel
    ) {
        endGame(); // Roep de endGame-functie aan als er een botsing is
    }
}

// Functie om het spel te beëindigen
function endGame() {
    const currentScore = parseInt(scoreDisplay.innerText); // Haal de huidige score op
    scores.push(currentScore); // Voeg de huidige score toe aan de scores-array
    scores.sort((a, b) => b - a); // Sorteer de scores in dalende volgorde
    scores = scores.slice(0, 6); // Behoud alleen de top 6 scores

    // Reset de posities en animaties van de obstakels
    curse.style.left = "550px";
    curse.classList.remove("curse"); // Verwijder de bestaande animatieklasse
    void curse.offsetWidth; // Forceer een reflow om de animatie opnieuw te starten
    curse.classList.add("curse"); // Voeg de animatieklasse opnieuw toe

    curseTwo.style.left = "800px";
    curseTwo.classList.remove("second"); // Verwijder de bestaande animatieklasse
    void curseTwo.offsetWidth; // Forceer een reflow om de animatie opnieuw te starten
    curseTwo.classList.add("second"); // Voeg de animatieklasse opnieuw toe

    // Toon de top scores
    const topScoresDiv = document.getElementById("topScores");
    topScoresDiv.innerHTML = "";
    scores.forEach((score, index) => {
        topScoresDiv.innerHTML += `<p>${index + 1}. ${score}</p>`;
    });

    // Toon een bericht met de behaalde score en vraag om opnieuw te spelen
    alert(
        "Je hebt een score behaald van: " + currentScore + "\n\nSpeel opnieuw?"
    );
    // Reset de scoreweergave naar nul
    scoreDisplay.innerText = "0";
    // Voorkom het standaardgedrag van het gebeurtenis dat de pagina opnieuw laadt
    event.preventDefault();
}

// Luister naar toetsaanslagen om het personage te laten springen
document.addEventListener("keypress", function (event) {
    handleKeyPress(event);
});

// Controleer periodiek op botsingen
setInterval(checkCollision);
