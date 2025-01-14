const gameArea = document.getElementById("game-area");
const character = document.getElementById("character");
const score = document.getElementById("score");
let result = document.getElementById("result");
const start = document.getElementById("start");
const endGame = document.getElementById("end-game");
const title = document.getElementById("game-title");
document.addEventListener('keydown', controls);
let characterPosition = 0;

function controls(e) {
    if (e.code === 'Space') {
        start.classList.add('hide');
        character.classList.remove('walk');
        jump();
    }
}

function jump() {
    if (!character.classList == "jump") {
        return;
    }
    character.classList.add("jump");
    setTimeout(() => {
        character.classList.remove("jump");
        character.classList.add('walk');
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
        setInterval(() => {
            obstacleRight += 1;
            obstacleCreation.style.right = obstacleRight + 'px';
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let screenwidth = window.screen.width;
            let percentage = Math.floor((obstacleRight * 100) / screenwidth);
            // console.log(percentage);
            if (percentage > 94 && percentage < 99 && characterTop >= 200) {
                // alert("Game Over. score: " + score.innerText);
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
            }
        }, 0.5);

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