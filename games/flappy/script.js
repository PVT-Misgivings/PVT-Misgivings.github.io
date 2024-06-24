// Type your Javascript code

//function gameLoop(){
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

//making the pipes and openings
hole.addEventListener("animationiteration", ()=>{
    var random = -(Math.random()*300 + 150)

    hole.style.top = random + "px";
    counter++;
});


//jumping
function jump(){
    jumping = 1;
    let jumpCount = 0

    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        if((jumpCount < 15) && (characterTop > 6)){
            character.style.top = (characterTop - 5) + "px";
        }

        if(jumpCount > 20){
            clearInterval(jumpInterval);
            jumping = 0;
        }
        jumpCount++;
    }, 10)
}


//Game Loop
var intFunction = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    if(jumping == 0){
        character.style.top = (characterTop + 3) + "px";
    }

    //dying
    if(characterTop > 480){
        block.style.animationPlayState = "paused";
        hole.style.animationPlayState = "paused";
        
        setTimeout(()=>{
            let answer = confirm(`Game over! Your score is: ${counter}, play again?`);
            counter = 0;
            if( answer === false){
                clearInterval(intFunction);
            } else {
                character.style.top = "100px";
                block.classList.remove("moving");
                hole.classList.remove("moving");

                setTimeout(()=>{
                    block.classList.add("moving");
                    hole.classList.add("moving");
                    block.style.animationPlayState = "running";
                    hole.style.animationPlayState = "running";
                },1);
            }
        },1);
    }

}, 10)