var ghost, ghostImg;
var tower, towerImg;
var cash, cashImg;
var diamonds, diamondsImg;
var gameOver, gameOverImg;
var restart, restartImg;
var door, doorImg;
var climber, climberImg;
var climbersGroup;
var gameState = PLAY;
var cashGroup,diamondsGroup;
 var score = 0;
 var PLAY=1;
 var END=0;
 var gameState=1;

function preload(){
ghostImg = loadImage("ghost-jumping.png","ghost-standing.png");
towerImg = loadImage("tower.png");
cashImg = loadImage("cash.png");
doorImg = loadImage("door.png");
diamondsImg = loadImage("diamonds.png")
climberImg = loadImage("climber.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

function setup() {
createCanvas(600, windowHeight);

tower = createSprite(300, 300);
tower.addImage("tower",towerImg);
tower.velocityY = 5;

ghost = createSprite(300,300,30,30) ;
ghost.addImage("ghost",ghostImg);
ghost.scale = 0.5;

doorsGroup = new Group();
climbersGroup = new Group();
cashGroup = new Group();
diamondsGroup = new Group();

gameOver = createSprite(300, windowHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.9;

restart = createSprite(300, windowHeight/2+50);
restart.addImage(restartImg);
restart.scale = 0.6;



}

function draw() {
 background(500);

  textSize(20);
  fill(255);
  text("Score: "+ score,150,30);

  spawnDoors();
  createCash();
  createDiamonds();
 reset();

 if (gameState === PLAY) {

diamondsGroup.visible = true;
cashGroup.visible = true;

    gameOver.visible = false;
   restart.visible = false;
    
    if(keyDown("left")){
    ghost.x = ghost.x - 3;
    }

    if(keyDown("right")){
     ghost.x = ghost.x + 3;
    }

    if(keyDown("up")){
      ghost.velocityY = -3;
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   

      if (tower.y > 600) {
        tower.y = 300
      } 

    


      

      if (cashGroup.isTouching(ghost)) {
        cashGroup.destroyEach();
        score = score + 100;       
      }
      if (diamondsGroup.isTouching(ghost)) {
        diamondsGroup.destroyEach();
       score = score + 100;
      }
      if (climbersGroup.isTouching(ghost)) {
        gameState = END
       
        
      }  

}
  if (gameState == END){

  gameOver.visible = true;
  restart.visible = true;

  tower.velocityY = 0;
  ghost.velocityY = 0;
  doorsGroup.setVelocityXEach(0);        
  doorsGroup.setLifetimeEach(0);
  climbersGroup.setVelocityXEach(0);        
  climbersGroup.setLifetimeEach(0);
  
 diamondsGroup.setVelocityXEach(-1);        
 diamondsGroup.setLifetimeEach(-1);
 cashGroup.setVelocityXEach(-1);        
 cashGroup.setLifetimeEach(-1);
  }


  if(mousePressedOver(restart)) {
    reset();
  }
    drawSprites();

}

function spawnDoors()
 {
  
  if (frameCount % 300 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
   

    door.x = Math.round(random(120,400));
    climber.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
  

    door.lifetime = 800;
    climber.lifetime = 800;


    climbersGroup.add(climber);
    doorsGroup.add(door);    

    ghost.depth = door.depth;
    ghost.depth = door.depth + 1;

  }
}

function createCash() {
    if (World.frameCount % 120 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashGroup.add(cash);
    }
  }
  
  function createDiamonds() {
    if (World.frameCount % 100 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsGroup.add(diamonds);
  }
  }
 

  function reset() {
    gameState = PLAY

    gameOver.visible = false;
    restart.visible = false;

  tower.destroyEach();
  ghost.destroyEach();
  cashGroup.destroyEach();
  diamondsGroup.destroyEach();
  
  }