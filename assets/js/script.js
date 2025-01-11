
const gameArea = document.getElementById("game-area");
const character = document.getElementById("character");
// const obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");
document.addEventListener('keydown', controls);
let characterPosition = 0

function controls(e) {
    if (e.code === 'Space') {
        jump();
    }
}

function jump() {
    if(!character.classList == "jump"){return}
    character.classList.add("jump");
    setTimeout(function(){
        character.classList.remove("jump");
    }, 700);
}

function createObstacles () {
    let randomNumber = Math.random() * 6000;
    const obstacleCreation = document.createElement('div');
    obstacleCreation.classList.add('obstacle');
    gameArea.appendChild(obstacleCreation);
    let obstacleRight = -76

    obstacleMover()

    function obstacleMover() {    
        setInterval(function(){
            obstacleRight += 1
            obstacleCreation.style.right = obstacleRight + 'px'
        }, 0.5)

        setTimeout(createObstacles, randomNumber)
        if (obstacleCreation.style.right == '500px')  {
            gameArea.appendChild(obstacleCreation);
        }
    }
}

createObstacles ()

setInterval(() => {
    score.innerText++;
  }, 50);