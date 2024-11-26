showGrid(50); 
setSpeed(5); //small number is fast

width(5);
color("brown");

//some helper functions to draw simple shapes
function square(l){

    for(let i=0; i<4; i++){
        forward(l);
        right(90);
    }
}

function circle(r) {
    const step = (2 * Math.PI * r) / 90;  
    // Calculate distance per step
    for (let i = 0; i < 90; i++) {  
        forward(step);       
        right(4);
    }                                                                       
}

function arc(r,degrees){
    const step = (2 * Math.PI * r) / 90;  
    // Calculate distance per step
    for (let i = 0; i < degrees/4; i++) {  
        forward(step);       
        right(4);
    }                                                                       
}

function feather(r){
    arc(r,90);
    right(90);
    arc(r,90);
    right(90);
}

//here's some starter code for a turkey
//large outer feathers
color("brown");
feather(75);
left(15);
feather(75);
left(15);
feather(75);
left(15);
feather(75);
left(15);

feather(75);
left(15);
feather(75);
left(15);
feather(75);
left(15);
feather(75);
left(15);

goto(0,0);
angle(0);

//small inner feathers
color("orange");
left(10);
feather(50);
left(28);
feather(50);
left(28);

feather(50);
left(28);
feather(50);
left(28);