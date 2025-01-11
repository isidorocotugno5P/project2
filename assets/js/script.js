
const gameArea = document.getElementById("game-area");
const character = document.getElementById("character");
const score = document.getElementById("score");
document.addEventListener('keydown', controls);
let characterPosition = 0

function controls(e) {
    if (e.code === 'Space') {
        jump();
    }
}

function jump() {
    if (!character.classList == "jump") { return }
    character.classList.add("jump");
    setTimeout(function () {
        character.classList.remove("jump");
    }, 700);
}

function createObstacles() {
    let randomNumber = Math.random() * 6000;
    const obstacleCreation = document.createElement('div');
    obstacleCreation.classList.add('obstacle');
    gameArea.appendChild(obstacleCreation);
    let obstacleRight = parseInt(window.getComputedStyle(obstacleCreation).getPropertyValue("right"));

    obstacleMover()

    function obstacleMover() {
        setInterval(function () {
            obstacleRight += 1
            obstacleCreation.style.right = obstacleRight + 'px'
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let screenwidth = window.screen.width
            let percentage = Math.floor((obstacleRight*100)/screenwidth)
            console.log(percentage)
            if (percentage > 94 && percentage < 99 && characterTop >= 240) {
            alert("Game Over. score: " + score.innerText);
            }
        }, 0.5)

        setTimeout(createObstacles, randomNumber)
        if (obstacleCreation.style.right == '500px') {
            gameArea.appendChild(obstacleCreation);
        }
    }
}

createObstacles()

setInterval(() => {
    score.innerText++;
}, 50);