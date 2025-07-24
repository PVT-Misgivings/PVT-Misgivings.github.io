const canvas = document.querySelector(`canvas`);
const tooltip = document.getElementById('tooltip');
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-14;
let v;
let jumping = 0;
let midJumping = 0;
let baseJumping = 0;
let left = 0;
let right = 0;
moving = 0;
const testArrow = document.getElementById(`arrow`);
let groundLevel = 525;
let accordianDistance = 20;



canvas.addEventListener('mousemove', function(e) {
    var x = e.pageX - canvas.offsetLeft-5;
    var y = e.pageY - canvas.offsetTop-5;
    var str = `X: ${x}, Y: ${y}`;
    //console.log(str);
    tooltip.textContent = str;
    tooltip.style.display = 'block';
    tooltip.style.top = `${y+10}px`;
    tooltip.style.left = `${x+10}px`;
});


canvas.addEventListener('mousedown', function(e) {
    console.log(`X: ${e.pageX - canvas.offsetLeft - 5}, Y: ${e.pageY - canvas.offsetTop - 5}`);
});


canvas.addEventListener('mouseout', function() {
    tooltip.style.display = 'none';
});

let ctx = canvas.getContext(`2d`);
//////////////////////////////////////////////////////////

//ground-upper
ctx.fillStyle = `slategray`
ctx.fillRect(0, 425, canvas.width, 100)
//ground-lower
ctx.fillStyle = `firebrick`
ctx.fillRect(0, 525, canvas.width, canvas.height-525)
//sky
ctx.fillStyle = `rgb(128, 52, 52)`
ctx.fillRect(0, 0, canvas.width, 425)

//jumping
function jump() {
    var mctop = parseInt(window.getComputedStyle(MCtop).getPropertyValue("top"));
    var mcmid = parseInt(window.getComputedStyle(MCmid).getPropertyValue("top"));
    var mcbase = parseInt(window.getComputedStyle(MCbase).getPropertyValue("top"));
    var mctopX = parseInt(window.getComputedStyle(MCtop).getPropertyValue("left"));
    var mcmidX = parseInt(window.getComputedStyle(MCmid).getPropertyValue("left"));
    var mcbaseX = parseInt(window.getComputedStyle(MCbase).getPropertyValue("left"));
    var mcWidth = parseInt(window.getComputedStyle(MCbase).getPropertyValue("width"));
    var mcHeight = parseInt(window.getComputedStyle(MCbase).getPropertyValue("height"));

    // left and right border checkers
    if(mctopX <= 0) {
        moving = 0;
        MCtop.style.left = `1px`;
        MCmid.style.left = `1px`;
        MCbase.style.left = `1px`;
    } else if(mctopX >= canvas.width - mcWidth) {
        moving = 0;
        MCtop.style.left = canvas.width - mcWidth - 1 + `px`;
        MCmid.style.left = canvas.width - mcWidth - 1 + `px`;
        MCbase.style.left = canvas.width - mcWidth - 1 + `px`;
    }

    //actual jumping
    if (jumping == 1) {
        //lowering the `v` value by one
        v = v-1;
        //moving mctop `up` by v

        // what MCtop.style.top needs to be
        var newPos = mctop - v;
        if (newPos > groundLevel - mcHeight*3) {
            // setting newPos to where the top corner of the top of magma cube needs to be
            newPos = groundLevel - mcHeight*3;
            v = 0;
            jumping = 0;
            left = 0;
            right = 0;
        }
        // setting MCtop.style.top to newPos (ground level if it needs to be, or else setting it to mctop - v)
        MCtop.style.top = newPos + "px";
        

        setTimeout(jump, 200);
        // if were moving left or right
        if(left == 1 && moving == 1) {
            MCtop.style.left = mctopX - 3 + "px";
            MCmid.style.left = mcmidX - 3 + "px";
            MCbase.style.left = mcbaseX - 3 + "px";
        } else if(right == 1 && moving == 1) {
            MCtop.style.left = mctopX + 3 + "px";
            MCmid.style.left = mcmidX + 3 + "px";
            MCbase.style.left = mcbaseX + 3 + "px";
        }
    }

    //ISSUES 

    //pulling the middle of the cube along after the top 
    if (mcmid > accordianDistance + mcHeight + mctop) {
        console.log(`pull!`)
        midJumping = 1;
    } else if (mcmid < mctop + mcHeight) {
        console.log(`squishing!`)
        midJumping = 0;
        MCmid.style.top = mctop + mcHeight + `px`;
    }
    if (midJumping == 1) {
        console.log(`extend!`)
        MCmid.style.top = mctop + accordianDistance + mcHeight + `px`;
    }

    //pulling the base of the cube along after the middle
    // if (mcbase - mcmid > accordianDistance + mcHeight) {
    //     baseJumping = 1;
    //     moving = 1;
    // } else if (mcbase > groundLevel) {
    //     baseJumping = 0;
    //     MCbase.style.top = groundLevel - mcHeight + `px`;
    //     moving = 0;
    // }
    // if (baseJumping == 1) {
    //     MCbase.style.top = mcmid + accordianDistance + mcHeight + `px`;
    // }
}

//UP
document.addEventListener("keydown", event => {
    if (event.key==="ArrowUp" && jumping == 0) {
        jumping = 1;
        v = 25;
        jump();
    }
})

//LEFT
document.addEventListener("keydown", event => {
    if (event.key==="ArrowLeft" && jumping == 0) {
        jumping = 1;
        left = 1;
        v = 25;
        jump();
    }
})

//RIGHT
document.addEventListener("keydown", event => {
    if (event.key==="ArrowRight" && jumping == 0) {
        jumping = 1;
        right = 1;
        v = 25;
        jump();
    }
})


//Shooting
function shoot(arrY, arrX, targetY, targetX) {
    const Speed = 4;
    const TickDuration = 10;
//move arrow a little bit toward magma cube
    var angle = Math.atan2(arrY-targetY , targetX-arrX);

    arrow.style.transform = `rotate(${-angle + Math.PI}rad)`;


    function moveArrow() {
        if (arrX > 0 && arrX < canvas.width-55 && arrY < 520 && arrY > 0) {
            arrX += Speed * Math.cos(angle);
            arrY += Speed * -Math.sin(angle);           
            arrow.style.left = arrX + `px`;
            arrow.style.top = arrY + `px`;

            setTimeout(moveArrow, TickDuration);
        } else {
            
        }
    }
    
    moveArrow();
}

document.addEventListener("keydown", event => {
    if (event.key==="s") {
        const mcHeight = parseInt(window.getComputedStyle(MCbase).getPropertyValue("height"));
        const mcTop = parseInt(window.getComputedStyle(MCtop).getPropertyValue("top"));
        var arrY = parseInt(window.getComputedStyle(arrow).getPropertyValue("top"));
        var arrX = parseInt(window.getComputedStyle(arrow).getPropertyValue("left"));
        var targetY = ((mcTop + mcHeight) + mcTop)/2
        var targetX = parseInt(window.getComputedStyle(MCmid).getPropertyValue("left")) + 150;

            shoot(arrY, arrX, targetY, targetX);
    }
})





// document.addEventListener("keydown", event => {
//     if (event.key==="ArrowDown") {
//         var mctop = parseInt(window.getComputedStyle(MCtop).getPropertyValue("top"));
//         const mcHeight = parseInt(window.getComputedStyle(MCbase).getPropertyValue("height"));
//         MCmid.style.top = mctop + mcHeight + `px`;
//     }
// })





//basalt pillars
function pillar(base) {
    ctx.fillStyle = `darkgrey`
    if (base > 425 && base <= 458) {
        ctx.fillRect(canvas.width-45, base, 15, -52)
        ctx.fillRect(canvas.width-30, base, 15, -120)
        ctx.fillRect(canvas.width-15, base, 15, -76)
    } else if (base > 458 && base <= 491) {
        ctx.fillRect(canvas.width-75, base, 25, -104)
        ctx.fillRect(canvas.width-50, base, 25, -240)
        ctx.fillRect(canvas.width-25, base, 25, -152)
    } else if (base > 491 && base <= 525) {
        ctx.fillRect(canvas.width-108, base, 36, -156)
        ctx.fillRect(canvas.width-72, base, 36, -360)
        ctx.fillRect(canvas.width-36, base, 36, -228)
    }
}

//function slidePilLeft() {
    var pillSep = Math.random() * 40;
    var backrgoundLevel = Math.random()*100 + 425
    var pillarX = canvas.width - 5;
    //if (pillarX < canvas.width - pillSep) {
        pillar(backrgoundLevel)
    //}


    pillarX--;
//}

/*
//*525*

//big
pillar(500, 300);
pillar(498, 800);
//pillar(520, 1320);

//*491*

//medium
pillar(460, 140);
pillar(470, 600);
pillar(485, 1000);
pillar(460, 1490);


//*458*

//small
pillar(426, 480);
pillar(430, 1200);

//*425*
*/