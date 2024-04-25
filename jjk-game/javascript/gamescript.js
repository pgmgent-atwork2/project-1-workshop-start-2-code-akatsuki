// Array om scores op te slaan
let scores = JSON.parse(localStorage.getItem('scores')) || [];

// Variabele om de interval ID op te slaan
let gameInterval;

// Haal de DOM-elementen op
const char = document.getElementById("character");
const curse = document.getElementById("curse");
const curseTwo = document.getElementById("curseTwo");
const scoreDisplay = document.getElementById("score");
const topScoresDiv = document.getElementById("topScores");

// Functie om het personage te laten springen
function jump() {
    char.classList.add("jump-animation");
    char.style.backgroundImage = "url('./assets/char-jump.gif')";
    setTimeout(() => {
        char.classList.remove("jump-animation");
        char.style.backgroundImage = "url('./assets/itador.gif')";
    }, 500);
}

// Functie om te reageren op toetsaanslagen
function handleKeyPress(event) {
    if (!char.classList.contains("jump-animation")) {
        // Controleert of het personage niet al aan het springen is
        jump(); // Roep de jump-functie aan als het personage niet al aan het springen is
    }
}
topScoresDiv.innerHTML = "";
scores.forEach((score, index) => {
    topScoresDiv.innerHTML += `<p>${index + 1}. ${score}</p>`;
});
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
    localStorage.setItem('scores', JSON.stringify(scores));
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
    topScoresDiv.innerHTML = "";
    scores.forEach((score, index) => {
        topScoresDiv.innerHTML += `<p>${index + 1}. ${score}</p>`;
    });

    // Toon een bericht met de behaalde score en vraag om opnieuw te spelen
    showEndMessage(currentScore);

    // Stop het spel
    clearInterval(gameInterval);
}

// Functie om het bericht weer te geven wanneer het spel eindigt
function showEndMessage() {
    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "block";
}

// Functie om het spel te resetten
function resetGame() {
    // Verberg het bericht
    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "none";

    // Reset de score
    scoreDisplay.innerText = "0";

    // Start het spel opnieuw
    gameInterval = setInterval(checkCollision, 100); // 100 milliseconds interval
}

// Functie om opnieuw te starten
function handleRestart() {
    resetGame();
}

// Voeg event listener toe voor de "Play Again" knop
const playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", handleRestart);

// Voeg event listener toe voor toetsaanslagen om het personage te laten springen
document.addEventListener("keypress", function (event) {
    handleKeyPress(event);
});

// Start het spel
resetGame();
