//1. Create a ball and make it move.


var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var counter = 0
var currentBlocks = [];

//moving the charater

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 2 + "px";
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380) {
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event => {
    if (event.key==="ArrowLeft" || event.key==='ArrowRight') {
        if (interval) {
            clearInterval(interval);
            interval = undefined;
        }
        if (event.key==="ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key==="ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
})

document.addEventListener("keyup", event => {
    if(event.key!==" "){
        clearInterval(interval);
        interval = undefined;
    }
});

//jumping
function jump(){
    character.classList.add("animate")
    setTimeout(function(){
        character.classList.remove("animate")
    }, 500)
}

document.addEventListener("keypress", event => {
    //if (interval === undefined) {
        if (event.key===" ") {
            jump();
        }
    //}
});

//2. Create platforms

//Game loop
var blocks = setInterval(function(){
    var blockLast = document.getElementById("block" + (counter-1));
    var holeLast = document.getElementById("hole" + (counter-1));

    if(counter > 0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

//3. Generate more platforms

    if(blockLastTop < 400 || counter ===0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";

        var random = Math.floor(Math.random()*360)
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
}, 1)



//4. Make the platforms move up


//5. Make the ball fall down unless its on a platform


//6. Know when the game is over

//3108in video