const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle="red";

//and draws a circle at that position
function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
}

//then, call that function a few times
//to draw some circles
circle(100,100,10);
circle(200,200,20);
circle(300,300,30);