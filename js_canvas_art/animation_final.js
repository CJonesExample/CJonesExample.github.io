const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy =1; 
let score = 0;
let gameRunning = true;

//this is an object
//we access values in an object like  this:
//player.x 
const player = {
    //key:value pair
    x : 200,
    y : 200,
    color: 'green',
    speed: 3
};

const listOfballs = [
    {x:0,y:200,speed:5},
    {x:100, y:500,speed:2}
]

function addNewBall(){
    listOfballs.push({
        x:Math.random()
        , y:Math.random()
        , speed: Math.random()
    })
}

function moveAllBalls(){
    listOfballs.forEach((b) => (b.x += b.speed; b.y+=5))
}

//this is also an object. We'll add the keys later.
//we access values from this kind of object
//like this:
//  keys['ArrowUp']
//Every time a key is pressed or released, we'll update this object
//if a key is currently being pressed, that key will be set to True.
//When the key is released, it will be set to False.
const keys = {};

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    //ctx.fill();
}

function drawPlayer(){
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x, //accessing the variable called x inside the player object
        player.y,
        20,
        0,
        2*Math.PI
    );
    ctx.fill();
}

//This function moves the player based on the
//values inside the `keys` object. We check each of
//ArrowUp, ArrowDown, etc, and move the player accordingly
function movePlayer(){
    //note this if statement is kind of interesting. keys['ArrowDown']
    //is already a true/false value(boolean), so we don't need a comparison
    //this is equivalent to saying
    //if(keys['ArrowDown']==true)
    if(keys['ArrowDown']){
        player.y += player.speed;
    }
    if(keys['ArrowUp']){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft'] && 
    player.x > 50){
        player.x -= player.speed;
    }
    if(keys['ArrowRight'] && player.x < 350){
        player.x += player.speed;
    }
    //TODO: what  happens if the player
    //goes off the edge of the screen??
    if(player.y < 0){
        player.y = 400;
    }
    if (player.y > 400){
        player.y = 0;
    }
}

function drawScore(){
    ctx.font = "10px Arial";
    ctx.fillText(score, 10,10);
}

function moveBox(){
        // This code handles the position of the bouncing box.
        x = x + dx;
        y = y + dy;

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

function checkCollision(){
    //this is the AABB method
    
    //first, I'm going to make some helper variables
    let player_min_x = player.x - 20;
    let player_max_x = player.x + 20;
    let player_min_y = player.y - 20;
    let player_max_y = player.y + 20;

    let box_min_x = x;
    let box_max_x = x + 50;
    let box_min_y = y;
    let box_max_y = y + 50;

    if(box_max_y > player_min_y
        && box_min_y < player_max_y
        && box_max_x > player_min_x
        && box_min_x < player_max_x){
        gameRunning = false;
    }
}

function animate() {
    //`gameRunning` tracks the game state. 
    //when it becomes false, game over
    //so we'll only update score, move shapes, etc
    //as long as gameRunning is true
    if(gameRunning){
        score++;
        drawRect(x,y);
        drawScore();
        movePlayer();
        drawPlayer();
        moveBox();
        checkCollision();
    }
    //this schedules the next call of this function for 1/60
    //of a second from now
    requestAnimationFrame(animate);
}

//This is the "event listner" that we'll attach to the DOM
//it automatically receives an input, e, which is the event
//and includes properties like which key was pressed 
function handleKeyPress(e){
    //as an early test to see which key was pressed, we wrote this:
    //console.log(e.key); 
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);

//This is a shorthand way to define and use a function
// at the same time. We call this
//an "arrow function"
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

//call our animate function the first time
//after this first run, requestAnimationFrame() will
//take over
animate();
