/*
* Global Variables and Event Listeners
*/
const gameArea = document.getElementById("game-area");
const character = document.getElementById("character");
const score = document.getElementById("score");
const start = document.getElementById("start");
const endGame = document.getElementById("end-game");
const music = document.getElementById('music');
const startButton = document.getElementById('start-button');
const jumpButton = document.getElementById('jump-button');
const replayButton = document.getElementById('replay-button');
const result = document.getElementById("result");
let startNumber = 0;
document.addEventListener('keydown', controls);

/*
* Function listening to Space being clicked
*/
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

/*
* Function listening to "Start" being clicked
*/
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

/*
* Function listening to "Try Again!" being clicked
*/ 
replayButton.addEventListener("click", () => {
    location.reload();
});


/*
* Function listening to "Jump" being clicked
*/
jumpButton.addEventListener("click", () => {
    start.classList.add('hide');
    character.classList.remove('walk');
    jump();
});

/*
* Function that engages the correct animation patterns for "jumping" and "walking"
*/
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

/*
 * Function that creates Obstacles once the game starts
 * Within this function we have 2 other main function
 * First sub function: A function that moves the obstacles from right to left
 * Second sub function: A collision algorithm that detects the screen size and adjusts collision
 * area according to inner screen width
 */
function createObstacles() {
    let randomNumber = Math.random() * 5000;
    do {
        randomNumber = Math.random() * 5000;
    }
    while (randomNumber < 1500);
    const obstacleCreation = document.createElement('div');
    obstacleCreation.classList.add('obstacle');
    gameArea.appendChild(obstacleCreation);
    let obstacleRight = parseInt(window.getComputedStyle(obstacleCreation).getPropertyValue("right"));

    // Start obstacle move function after child is appended
    obstacleMover();

    function obstacleMover() {
        // Sets interval to continuously move obstacles and regularly check for collision
        setInterval(() => {
            obstacleRight += 1;
            obstacleCreation.style.right = obstacleRight + 'px';
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let screenwidth = window.innerWidth;
            let screensize = getScreenSize();
            let percentage = Math.floor((obstacleRight * 100) / screenwidth);
            // Checks collision for xl screen sizes
            if (screensize === 'xl' && percentage >= 91 && percentage <= 95 && characterTop >= 155) {
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            } // Checks collision for lg screen sizes
            else if (screensize === 'lg' && percentage >= 90 && percentage <= 95 && characterTop >= 155) {
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            } // Checks collision for md screen sizes 
            else if (screensize === 'md' && percentage >= 85 && percentage <= 89 && characterTop >= 155) {
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            } // Checks collision for sm screen sizes
            else if (screensize === 'sm' && percentage >= 82 && percentage < 88 && characterTop >= 155) {
                endGame.classList.add('end');
                document.getElementById("result").style.fontSize = "xx-large";
                result.innerText = score.innerText;
                gameArea.removeChild(gameArea.lastChild);
            }
        }, 0.5);

        // Creates more obstacles randomly once main function is engaged
        setTimeout(createObstacles, randomNumber);
        if (obstacleCreation.style.right == '500px') {
            gameArea.appendChild(obstacleCreation);
        }

        // Removes obstacles once off screen at 3000px
        const obstacleRemover = setInterval(() => {
            if (obstacleRight > 3000) {
                gameArea.removeChild(obstacleCreation);
                removeChild = true;
                // Add clearing interval to prevent console errors from repeated attempt at removing obstacle
                if (removeChild === true) {
                    clearInterval(obstacleRemover);
                }
            }
        }, 1000);
    }
}

/*
* Checks inner width of screen size and returns breakpoing string for collision algorithm 
*/
function getScreenSize() {

    const width = window.innerWidth;

    if (width >= 576 && width < 768) {
        return 'sm';
    } else if (width >= 768 && width < 992) {
        return 'md';
    } else if (width >= 992 && width < 1200) {
        return 'lg';
    } else {
        return 'xl';
    }
}

/*
* Function that enables toggling game music on or off as onclick
*/
function toggleSound() {
    let sound = document.getElementById('speaker').src;
    if (sound.indexOf('mute.png') != -1) {
        document.getElementById('speaker').src = 'assets/images/sound.png';
        music.play();
    } else {
        document.getElementById('speaker').src = 'assets/images/mute.png';
        music.pause();
    }
}