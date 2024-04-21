const char = document.getElementById("character");
const curse = document.getElementById("curse");
const score = document.getElementById("score");

function jump() {
    char.classList.add("jump-animation");
    setTimeout(() => char.classList.remove("jump-animation"), 500);
}

document.addEventListener("keypress", (event) => {
    if (!char.classList.contains("jump-animation")) {
        jump();
    }
});

setInterval(() => {
    const charTop = parseInt(
        window.getComputedStyle(char).getPropertyValue("top")
    );
    const curseLeft = parseInt(
        window.getComputedStyle(curse).getPropertyValue("left")
    );
    score.innerText++;

    if (curseLeft < 0) {
        curse.style.display = "none";
    } else {
        curse.style.display = "";
    }

    if (curseLeft < 50 && curseLeft > 0 && charTop > 150) {
        alert("You got a score of: " + score.innerText + "\n\nPlay again?");
        location.reload();
    }
});
