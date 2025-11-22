/*
 most of this code is adapted from:
  https://people.ece.cornell.edu/land/courses/ece4760/labs/s2021/Boids/Boids.html
*/

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const config = {
    avoid_factor: 0.1
    ,matching_factor: 0.1
    ,centering_factor: 0.002
    ,protected_range: 10
    ,visual_range: 30
    ,turn_factor: 0.3
    ,margin: 60
    ,min_speed: 3
    ,max_speed: 5
    ,num_boids:20
}

const boids = [];


function addBoid(){
    boid =  {
        x: Math.random()*200+100
        ,y: Math.random()*200 + 100
        ,vx: Math.random()*20 - 10
        ,vy: Math.random()*20 - 10
    };
    boids.push(boid);
}

function drawBoids(){
    boids.forEach((b) =>{
        let rotateAngle = Math.atan2(b.vy,b.vx)
        ctx.translate(b.x,b.y);
        ctx.rotate(rotateAngle);
        ctx.beginPath();
        
        ctx.moveTo(0,0);
        ctx.lineTo(-25,8);
        ctx.lineTo(-25,-8);
        ctx.fill();
        
        ctx.rotate(-rotateAngle);
        ctx.translate(-b.x,-b.y);

    })
}

function updateBoids(){
    boids.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        //b.vx += Math.random()*2 - 1
        //b.vy += Math.random()*2 - 1
        //handle margins
        if(b.x > 400-config.margin){
            //print(" moving this bird because off right margin")
            b.vx = b.vx - config.turn_factor
        }
        else if( b.x < 0+config.margin){
            //print(" moving this bird because off right margin")
            b.vx = b.vx + config.turn_factor
        }
        else if( b.y < 0+config.margin){
            //print(" moving this bird because off top margin")
            b.vy = b.vy + config.turn_factor
        }
        else if( b.y > 400-config.margin){
            //print(" moving this bird because off bottom margin")
            b.vy = b.vy - config.turn_factor
        }


    })
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoids();
    updateBoids();
    requestAnimationFrame(animate);
}

//setup
for(let i = 0; i < config.num_boids; i++){
    addBoid();
}

animate();




