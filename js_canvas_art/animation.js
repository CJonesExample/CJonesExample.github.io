const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy =1; 
let score = 0;
let gameRunning = true;
//we'll represent the player as an object
//to access these variables
//we use dot notation: player.x
const player = {
    //variables use key:value pair syntax
    x:200,
    y:200,
    color:'green',
    speed:3
}

//here's an object that will keep track
//of which keys are pressed.
//we'll start it empty, and every time we press a key
//we'll add to this object
//to add a new key to an object, we use this syntax:
//keys['ArrowUp'] = true
const keys = {};

function drawPlayer(){
    //to access a variable from the player object
    //we use this syntax:
    //player.x
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y,
        20,
        0,
        2*Math.PI
    )
    ctx.fill();
}

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function moveRect(){
    // TODO: Add some code here 
    //  that will change the rectangle's position
    x = x + dx;
    y = y + dy;

    //if the box goes off the right side of the screen
    //reset it to the inital position
    if(x > 350){
        dx = dx * -1;
    }
    if(x < 0){
        dx = dx * -1;
    }

    if(y > 350){
        dy = dy * -1;
    }
    if(y < 0){
        dy = dy * -1;
    }
}

function movePlayer(){
    if(keys['ArrowDown'] && player.y < 400){
        //move the player down
        player.y += player.speed;
    }
    //now you write the other three
    //arrow keys
    if(keys['ArrowUp'] && player.y > 0){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft']){
        player.x -= player.speed;
    }
    if(keys['ArrowRight']){
        player.x += player.speed;
    }
    if(player.x > 400){
        player.x = 0;
    }
    if(player.x < 0){
        player.x = 400;
    }
}

function drawScore(){
    ctx.font = "10px Arial";
    ctx.fillText(score, 10,10);
}

function animate() {
    if(gameRunning){
        drawRect(x,y);
        moveRect();
        drawPlayer();
        movePlayer();
        score++;
        if(score >= 200){
            gameRunning = false;
        }
        drawScore(); 
    }
    requestAnimationFrame(animate);
}

/*
    Handle Keyboard
    To handle an event, we need two things:
        - event handler - does things because of the event
        - event listener - notices when an event happens
            , and calls the handler
*/
function handleKeyPress(e){
    //console.log(e.key);
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('keyup', (e) => {
    //console.log(e.key + " up");
    keys[e.key] = false;
});

//call our function
animate();