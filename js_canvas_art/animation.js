const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy =1; 

//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function animate() {
    drawRect(x,y);

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
    requestAnimationFrame(animate);
}

//call our function
animate();

