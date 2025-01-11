
const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");
document.addEventListener('keydown', controls);
let characterPosition = 0

function controls(e) {
    if (e.code === 'Space') {
        jump();
        console.log('waddup');
    }
}

function jump() {
    if(!character.classList == "jump"){return}
    character.classList.add("jump");
    setTimeout(function(){
        character.classList.remove("jump");
    }, 700);
}

setInterval(() => {
    score.innerText++;
  }, 50);