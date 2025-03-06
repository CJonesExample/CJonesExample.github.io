
const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    //Give me a nice background
    ctx.fillStyle = '#0099cc';
    ctx.fillRect(0,0,400,400);

    //hair
    ctx.fillStyle='black';
    ctx.beginPath();
    ctx.ellipse(170,70,90,60,0,0,2*Math.PI);
    ctx.fill();
    
    //head
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(170,120,90,100,0,0,2*Math.PI);
    ctx.fill();

    //bangs
    ctx.fillStyle='black';
    ctx.beginPath();
    ctx.ellipse(170,-5,60,50,0,Math.PI/6,5*Math.PI/6);
    ctx.fill();

    //left eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(130,100,30,20,0,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

    //left iris
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(130,100,10,0,2*Math.PI);
    ctx.fill();

    //right eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(210,100,30,18,0,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

    //right iris
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(210,100,10,0,2*Math.PI);
    ctx.fill();

    //left eyebrow
    ctx.strokeStyle = "black";
    ctx.lineWidth=8;
    ctx.beginPath();
    ctx.ellipse(130,100,40,30,0,7*Math.PI/6,11*Math.PI/6);
    ctx.stroke();

    //right eyebrow
    ctx.strokeStyle = "black";
    ctx.lineWidth=8;
    ctx.beginPath();
    ctx.ellipse(210,100,40,30,0,7*Math.PI/6,11*Math.PI/6);
    ctx.stroke();

    //left ear
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(80,120,20,40,0,0,2*Math.PI);
    ctx.fill();

    //right ear
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(260,120,20,40,0,0,2*Math.PI);
    ctx.fill();



    //mouth
    ctx.strokeStyle='red';
    ctx.beginPath();
    ctx.ellipse(170,160,50,30,0,1*Math.PI/8,7*Math.PI/8);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(170,180,50,10,0,9*Math.PI/8,15*Math.PI/8);
    ctx.stroke();

    //nose
    ctx.strokeStyle="black"
    ctx.lineWidth=2
    ctx.beginPath();
    ctx.moveTo(170,100);
    ctx.lineTo(180,155);
    ctx.lineTo(160,155)
    ctx.stroke();

    //neck
    ctx.fillStyle='#DFB19C';
    ctx.fillRect(130,200,80,400);

    //shirt: top half of an ellipse and a rect
    ctx.fillStyle='red';
    ctx.beginPath();
    ctx.ellipse(170,300,150,50,0,Math.PI,2*Math.PI);
    ctx.fill();
    ctx.fillRect(20,300,300,400);



    //right hand
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(360,140,25,30,Math.PI/6,0,2*Math.PI);
    ctx.fill();

    //right arm
    ctx.fillStyle='red'
    ctx.beginPath();
    ctx.moveTo(300,290);
    ctx.lineTo(370,230);
    ctx.lineTo(390,290);
    ctx.lineTo(300,400);
    ctx.fill();

    //right forearm
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.moveTo(390,290);
    ctx.lineTo(335,150);
    ctx.lineTo(385,150);
    ctx.lineTo(420,270)
    ctx.fill();

    //right thumb
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(340,140,40,10,3*Math.PI/16,0,2*Math.PI);
    ctx.fill();

    //right index
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(340,120,40,10,Math.PI/2-(Math.PI/8),0,2*Math.PI);
    ctx.fill();

    //right index
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(350,120,40,10,Math.PI/2,0,2*Math.PI);
    ctx.fill();

    //right index
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(365,120,40,10,Math.PI/2,0,2*Math.PI);
    ctx.fill();

    //right index
    ctx.fillStyle='#DFB19C';
    ctx.beginPath();
    ctx.ellipse(375,120,40,10,Math.PI/2+(Math.PI/8),0,2*Math.PI);
    ctx.fill();





    //vignette crop
    ctx.globalCompositeOperation='destination-in';
    ctx.beginPath();
    ctx.arc(200,200,200,0,2*Math.PI);
    ctx.fill();