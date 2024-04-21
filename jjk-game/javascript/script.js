// Array to store scores
let scores = [];

const char = document.getElementById("character");
const curse = document.getElementById("curse");
const curseTwo = document.getElementById("curseTwo");
const scoreDisplay = document.getElementById("score");

function jump() {
    char.classList.add("jump-animation");
    char.style.backgroundImage = "url('../assets/char-jump.gif')";
    setTimeout(() => {
        char.classList.remove("jump-animation");
        char.style.backgroundImage = "url('../assets/itador.gif')";
    }, 500);
}

function handleKeyPress(event) {
    if (!char.classList.contains("jump-animation")) {
        jump();
    }
}

function checkCollision() {
    const charTop = parseInt(
        window.getComputedStyle(char).getPropertyValue("top")
    );
    const curseLeft = parseInt(
        window.getComputedStyle(curse).getPropertyValue("left")
    );

    const curseLeftTwo = parseInt(
        window.getComputedStyle(curseTwo).getPropertyValue("left")
    );

    scoreDisplay.innerText++;

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

    if (
        (curseLeft < 50 && curseLeft > 0 && charTop > 150) ||
        (curseLeftTwo > 0 && curseLeftTwo < 50 && charTop < 150)
    ) {
        endGame();
    }
}

function endGame() {
    const currentScore = parseInt(scoreDisplay.innerText);
    scores.push(currentScore); // Add the current score to the scores array
    scores.sort((a, b) => b - a); // Sort scores in descending order
    scores = scores.slice(0, 6); // Keep only the top 6 scores

    // Reset projectile positions and animations
    curse.style.left = "550px";
    curse.classList.remove("curse"); // Remove existing animation class
    void curse.offsetWidth; // Trigger reflow to restart animation
    curse.classList.add("curse"); // Add animation class back

    curseTwo.style.left = "800px";
    curseTwo.classList.remove("second"); // Remove existing animation class
    void curseTwo.offsetWidth; // Trigger reflow to restart animation
    curseTwo.classList.add("second"); // Add animation class back

    // Display the top scores
    const topScoresDiv = document.getElementById("topScores");
    topScoresDiv.innerHTML = "<h2>Top Scores</h2>";
    scores.forEach((score, index) => {
        topScoresDiv.innerHTML += `<p>${index + 1}. ${score}</p>`;
    });

    alert("You got a score of: " + currentScore + "\n\nPlay again?");
    // Reset score display to zero
    scoreDisplay.innerText = "0";
    // Prevent default behavior of the event that triggers the page reload
    event.preventDefault();
}

document.addEventListener("keypress", function (event) {
    handleKeyPress(event);
});

setInterval(checkCollision);
