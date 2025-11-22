const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//make a nice snowy background
ctx.fillStyle="blue";
ctx.fillRect(0,0,400,400);

ctx.fillStyle="white";
ctx.fillRect(0,300,400,100);

function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
}

//a snowman is just a bunch of circles
function snowman(x,y){
    circle(x,y,25);
    circle(x,y+50,40);
    circle(x,y+110,55);
}

//then, call that function a few times
//to draw some circles
snowman(80,170);
snowman(200,170);
snowman(320,170);