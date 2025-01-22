const gameArea = document.getElementById("game-area");
const character = document.getElementById("character");
const score = document.getElementById("score");
let result = document.getElementById("result");
const start = document.getElementById("start");
const endGame = document.getElementById("end-game");
const title = document.getElementById("game-title");
document.addEventListener('keydown', controls);
let characterPosition = 0;
const music = document.getElementById('music');
let startNumber = 0;
const startButton = document.getElementById('start-button')
const jumpButton = document.getElementById('jump-button')
const replayButton = document.getElementById('replay-button')

function controls(e) {
    if (e.code === 'Space') {
        start.classList.add('hide');
        character.classList.remove('walk');
        jump();
        startNumber++;
    }

    if (startNumber === 1) {
        createObstacles();
        setInterval(() => {
            score.innerText++;
        }, 50);
    }
}

startButton.addEventListener("click", () => {
        start.classList.add('hide');
        character.classList.remove('walk');
        jump();
        startNumber++;

    if (startNumber === 1) {
        createObstacles();
        setInterval(() => {
            score.innerText++;
        }, 50);
    }
});

replayButton.addEventListener("click", () => {
    location.reload();
});

jumpButton.addEventListener("click", () => {
    start.classList.add('hide');
    character.classList.remove('walk');
    jump();
});



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
    let randomNumber = Math.random() * 5000;
    do {
        randomNumber = Math.random() * 5000;
    }
    while (randomNumber < 1500)
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
            let screenwidth = window.innerWidth;
            let screensize = getScreenSize();
            let percentage = Math.floor((obstacleRight * 100) / screenwidth);
            console.log(percentage);
            if (screensize === 'xl' && percentage > 90 && percentage < 95 && characterTop >= 160) {
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            } else if (screensize === 'lg' && percentage > 86 && percentage < 91 && characterTop >= 160){
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            } else if (screensize === 'md' && percentage > 84 && percentage < 89 && characterTop >= 160){
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            } else if (screensize === 'sm' && percentage > 80 && percentage < 84 && characterTop >= 160){
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            }
        }, 0.5);

        setTimeout(createObstacles, randomNumber)
        if (obstacleCreation.style.right == '500px') {
            gameArea.appendChild(obstacleCreation);
        }

        setInterval (() => {
            if (obstacleRight > 3000) {
                // obstacleCreation.parentNode.removeChild(obstacleCreation);
                gameArea.removeChild(obstacleCreation);
            }
        }, 1000)
    }
}

function getScreenSize() {
    
    const width = window.innerWidth;

    if (width < 576) {
        return 'xs'; 
    } else if (width >= 576 && width < 768) {
        return 'sm'; 
    } else if (width >= 768 && width < 992) {
        return 'md'; 
    } else if (width >= 992 && width < 1200) {
        return 'lg'; 
    } else {
        return 'xl';
    }
}

function toggleSound() {
    let sound = document.getElementById('speaker').src;
    if (sound.indexOf('mute.png')!=-1) {
        document.getElementById('speaker').src  = 'assets/images/sound.png';
        music.play()
    }
     else {
       document.getElementById('speaker').src = 'assets/images/mute.png';
       music.pause()
   }
}
