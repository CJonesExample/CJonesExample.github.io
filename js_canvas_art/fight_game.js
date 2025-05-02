const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.textBaseline = "middle";
ctx.textAlign = "center";

let score = 0;
let gameState = 'cards';
let level = 0;
let countdown = 3;
let framesToCount = 50;
//this is an object
//we access values in an object like  this:
//player.x 
const allCards = {
    you: [
        {name: 'ball'},
        {name: 'haveStick'}
    ],
    them: [
        {name: 'bounce'},
        {name: 'move'}
    ],
    rules: [
        {name: 'run'},
        {name: 'keep away'}
    ]
};

const keys = {};

const gameRules = {
    handSize: {you:1,them:1,rules:1}
};

const miniGameRules = {
    you: []
    ,them: []
    ,rules: []
};

const geometry = {
    width: canvas.width,
    height: canvas.height,
    cardAreaTop : canvas.height*0.8,
    third: Math.floor(canvas.width / 3),
    cardPadding: 10
}

const deck = {
    you: [
        {id: 0, location:'deck'}
    ],
    them: [
        {id: 0, location:'deck'}
    ],
    rules: [
        {id: 0, location:'deck'}
    ]
};

const hand = {
    you: [],
    them: [],
    rules: []
};

const you = {
    x:200,
    y:200,
    type:'',
    size:20,
    speed:2,
    angle:0
};

const them = {
    x:200,
    y:300,
    type:'',
    size:50,
    xSpeed:2,
    ySpeed:2
};

class clickableCard{
    constructor(x,y,text,whichDeck){
        this.x = x;
        this.y = y;
        this.text = text;
        this.selected = false;
        this.whichDeck = whichDeck;
    }

    draw(){
        ctx.strokeStyle = 'black';
        if(this.selected){
            ctx.strokeStyle='yellow';
        }
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.rect(this.x, this.y, 30, 40);
        ctx.stroke();
        ctx.font = '10pt Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.text,this.x+15,this.y+20);
    }

    isClicked(mouseX,mouseY){
        return (
            mouseX >= this.x &&
            mouseX <= this.x + 30 &&
            mouseY >= this.y &&
            mouseY <= this.y + 40
          );
    }
}

let clickableCards = [];

function drawCardFromDeck(whichDeck){
    const cardsInDeck = deck[whichDeck].filter(card => card.location === 'deck');
    
    if(cardsInDeck.length > 0){
        cardToDraw = cardsInDeck[Math.floor(Math.random()*cardsInDeck.length)];
        cardToDraw.location = 'hand';
        hand[whichDeck].push(cardToDraw);
        cardToDraw['selected'] = 'false';
        return true;
    }
    return false;
}

function fight(){

}

function refillHand(){
    while(hand.you.length < gameRules.handSize.you){
        drawCardFromDeck('you');
    }

    while(hand.them.length < gameRules.handSize.them){
        drawCardFromDeck('them');
    }

    while(hand.rules.length < gameRules.handSize.rules){
        drawCardFromDeck('rules');
    }

    clickableCards = [];
    createCardObjects();
}

function createCardObjects(){
    [['you',0],['them',geometry.third],['rules',geometry.third*2]].forEach(([whichDeck,startX]) => {
        //hand
        const numCardsInHand = hand[whichDeck].length;
        let x = startX;
        hand[whichDeck].forEach((c)=>{
            clickableCards.push(new clickableCard(x+geometry.cardPadding
                ,geometry.cardAreaTop + geometry.cardPadding
                ,allCards[whichDeck][c.id].name,whichDeck));
            x += 10;
        });
    });
}

function drawCards(){ //"draw" means display on the screen. 
                        //for "draw cards to hand" see refillHand

    clickableCards.forEach((c) => c.draw());
    [['you',0],['them',geometry.third],['rules',geometry.third*2]].forEach(([whichDeck,startX]) => {
        //label and deck
        const numCardsInDeck = deck[whichDeck].filter(card => card.location === 'deck').length;
        ctx.font = "15pt Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(whichDeck + `(${numCardsInDeck} in deck)`,startX+geometry.third/2,geometry.cardAreaTop+75);
    });
}

function drawFrame(){
    ctx.fillStyle = 'LightSkyBlue';
    ctx.fillRect(0,0,geometry.width,geometry.height);
    ctx.strokeStyle = 'black';
    ctx.moveTo(0,geometry.cardAreaTop);
    ctx.lineTo(geometry.width,geometry.cardAreaTop);
    ctx.stroke();
    ctx.setLineDash([5,10]);
    ctx.moveTo(geometry.third,geometry.cardAreaTop);
    ctx.lineTo(geometry.third,geometry.height);
    ctx.stroke();
    ctx.moveTo(geometry.third*2,geometry.cardAreaTop);
    ctx.lineTo(geometry.third*2,geometry.height);
    ctx.stroke();
}

function checkCollision(){

}

function drawStage(){
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.ellipse(geometry.width/2, geometry.cardAreaTop -100, geometry.width/2*0.9,80
        ,0,0,2*Math.PI
    );
    ctx.fill();
}

function drawPrompt(){
    if(gameState === 'cards' || gameState === 'ready'){
        ctx.font = "30pt Arial";
        ctx.fillStyle = 'black';
        ctx.fillText('Welcome! Select one card from each category',geometry.width/2,50);
        if (gameState === 'ready'){
            ctx.rect(geometry.width/4,100,geometry.width/2,50);
            ctx.stroke();
            ctx.fillText("START",geometry.width/2,125);
        }
    }
    else if(gameState === 'countdown'){
        ctx.font = "30pt Arial";
        ctx.fillStyle = 'black';
        ctx.fillText('Ok - Get Ready!',geometry.width/2,50);
        ctx.fillText(countdown,geometry.width/2,100);

    }
    else if(gameState == 'lost'){
        ctx.font = "30pt Arial";
        ctx.fillStyle = 'red';
        ctx.fillText('GAME OVER',geometry.width/2,50);
    }
}

function checkGameState(){
    if(gameState === 'cards' && clickableCards.filter((c)=>c.selected).length === 3){
        gameState = 'ready';
        setupGame();
    }
    if (gameState === 'ready' && clickableCards.filter((c)=>c.selected).length != 3){
        gameState = 'cards';
    }
    if (gameState === 'countdown'){
        framesToCount--;
        if (framesToCount <= 0){
            countdown--;
            framesToCount = 60;
            if (countdown <= 0){
                setupGame();
                gameState = 'running';
            }
        }
    }
}

function setupGame(){
    ['you','them','rules'].forEach((whichDeck) => {
        miniGameRules[whichDeck]=
            clickableCards
                .filter((c)=>{ return c.whichDeck === whichDeck && c.selected == true})
                .map((c) => c.text);
    });

    //now process what the rules mean
    if(miniGameRules.you.includes("ball")){
        you.type = 'ball';
    }
    if(miniGameRules.them.includes('bounce')){
        them.type = 'box';
    }
}


function updateYou(){
    if(keys['ArrowDown'] && you.y < geometry.cardAreaTop){
        you.y += you.speed;
    }
    if(keys['ArrowUp'] && you.y > 0){
        you.y -= you.speed;
    }
    if(keys['ArrowLeft'] && you.x > 0){
        you.x -= you.speed;
    }
    if(keys['ArrowRight'] && you.y < geometry.width){
        you.x += you.speed;
    }
}

function updateThem(){
    them.x += them.xSpeed;
    them.y += them.ySpeed;
    if(them.x < 0 || them.x > geometry.width){
        them.xSpeed *= -1.2;
    }
    if(them.y < 0 || them.y > geometry.cardAreaTop){
        them.ySpeed *= -1.2;
    }
}

function drawYou(){
    if(you.type == 'ball'){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(
            you.x,
            you.y,
            you.size,
            0,
            2*Math.PI
        )
        ctx.fill();
    }
}

function drawThem(){
    if(them.type == 'box'){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.fillRect(them.x,them.y,them.size,them.size);
        ctx.fill();
    }
}

function checkCollision(){

    //this is the AABB method
    
    //first, I'm going to make some helper variables
    let player_min_x = you.x - you.size;
    let player_max_x = you.x + you.size;
    let player_min_y = you.y - you.size;
    let player_max_y = you.y + you.size;

    let box_min_x = them.x;
    let box_max_x = them.x + them.size;
    let box_min_y = them.y;
    let box_max_y = them.y + them.size;

    if(box_max_y > player_min_y
        && box_min_y < player_max_y
        && box_max_x > player_min_x
        && box_min_x < player_max_x){
        gameState = 'lost';
    }
    
}

function updateGame(){
    updateYou();
    updateThem();
    if(miniGameRules.rules.includes('run')){
        checkCollision();
    }
}

function drawGame(){
    drawYou();
    drawThem();
}

function animate() {
    checkGameState();
    ctx.clearRect(0,0,geometry.width, geometry.height);
    drawFrame();
    drawCards();
    drawStage();
    drawPrompt();

    if(gameState === 'countdown' || gameState === 'lost'){
        drawGame();
    }

    if(gameState == 'running'){
        updateGame();
        drawGame();
    }

    //this schedules the next call of this function for 1/60
    //of a second from now
    requestAnimationFrame(animate);
}

//call our animate function the first time
//after this first run, requestAnimationFrame() will
//take over
refillHand();
animate();

document.addEventListener('click',(e)=>{
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    //console.log(`${mouseX} , ${mouseY}`);
    //we can only click on cards
    if(gameState === 'cards' || gameState === 'ready'){
        clickableCards.forEach((c) =>
        {
            if(c.isClicked(mouseX,mouseY)){
                //console.log(c.text + " clicked")
                c.selected = !c.selected;
            }
        });
    }
    if(gameState === 'ready'){
        if( mouseX >= geometry.width/4 &&
            mouseX <= 3*geometry.width/4 &&
            mouseY >= 100 &&
            mouseY <= 150){
                gameState = 'countdown';
            }
    }
})

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    //console.log(e.key + " up");
    keys[e.key] = false;
});