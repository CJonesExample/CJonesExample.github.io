const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 50;
//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function animate() {
    drawRect(x,50);

    // TODO: Add some code here 
    //  that will change the rectangle's position
    x = x + 1

    if(x > 350){
        x = 0
    }


    requestAnimationFrame(animate);
}

//call our function
animate();