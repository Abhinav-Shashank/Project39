var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle; 
var obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image;
var foodGroup, obstaclesGroup;
var survivaltime,ground,groundImg,background1,backgroundImg,score ;

function preload(){
  
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
    
  obstacle1Image = loadImage("obstacle.png");
  obstacle2Image = loadImage("Hints_Mine_result.png");
  obstacle3Image = loadImage("High_External_Stone_Wall_icon.png");
  obstacle4Image = loadImage("resize.png");
  
  backgroundImg = loadImage("maxresdefault.jpg");
}

function setup() {
  createCanvas(600, 300);
  
  //creating the background
  background1= createSprite(600, 200,20,20);
  background1.addImage("background",backgroundImg);
  background1.scale=1;
  //background1.x = background1.width /2;
  
  //creating the monkey
  monkey = createSprite(80,180,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  //creating the ground
  ground = createSprite(300,280,600,40);
  ground.shapeColor=("green");
  
  //creating the groups
  obstaclesGroup=createGroup();
  foodGroup=createGroup();
  
  //declaring survival time and score as 0 in gameState 'PLAY'
  survivaltime=0;
  score = 0;
  
  monkey.setCollider("circle",0,0,300);
  //monkey.debug=true;
  
}

function draw() { 
  
  if (gameState === PLAY){
    
    //incrementing the survival time
    survivaltime = survivaltime + Math.round(getFrameRate()/60);
  
    //scoring
    if (foodGroup.isTouching(monkey)){
      score = score+2;
    }
    
    //increasing the size of the monkey
    switch (score){
      case 14:monkey.scale=0.12;
             break;
      case 26:monkey.scale=0.14;
             break;
      case 38:monkey.scale=0.16;
             break;
      case 50:monkey.scale=0.18;
             break;
      case 62:monkey.scale=0.2;
             break;
      case 76:monkey.scale=0.22;
             break;
      case 90:monkey.scale=0.24;
             break;
       default : break;
    }
             
    //console.log(monkey.y);
  
    //giving control to monkey
    if (keyDown("space") && monkey.y >= 188){
      monkey.velocityY = -13 ;
    }
  
    //adding gravity
    monkey.velocityY=monkey.velocityY + 0.68;
    
    //giving background velocity
    background1.velocityX = -(4 + 3*survivaltime/100);
    
    //resetting the ground
    if (background1.x < 0){
      background1.x = background1.width/2;
    }

    //setting camera position
    //camera.position.x = monkey.position.x+220;
    camera.position.y = monkey.position.y-80;

  
    //stopping moonkey from falling down
    monkey.collide(ground);
  
    //calling the obstacles function
    spawnObstacles();
  
    //calling the banana function
    spawnBananas();
    
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    }
    
    //changing gameState to END when the monkey is touching the obstacles or reaches a ceartain score
    if(survivaltime === 5000){
      //resetting the size of the monkey
      monkey.scale=0.1;
      
      gameState = END;

    }
    if (obstaclesGroup.isTouching(monkey)){
      
      //resetting the size of the monkey
      monkey.scale=0.1;
      
      gameState = END;
    }
 }    
   else if (gameState === END) {
     
      monkey.x=80;
      monkey.y=230;
      
      //setting monkey's velocity to 0 in gameState END
      monkey.velocityY=0;

      //changing background's velocity to 0
      background1.velocityX=0;
      
      //giving velocity to the bananas as 0
      foodGroup.setVelocityEach(0,0);
      foodGroup.setLifetimeEach(-1);
      
      
      //giving velocity to obstacle as 0
      obstaclesGroup.setVelocityEach(0,0);
      obstaclesGroup.setLifetimeEach(-1);

  }
  
  drawSprites();
  
  //displaying the survival time
  fill("yellow");
  textSize(14);
  text("Survival Time: "+ survivaltime, 200,30);
  
  //displaying the score
  fill("yellow");
  textSize(14);
  text("Score :"+ score,350,30);
  
}

function spawnBananas(){
  
  //spawning bananas after every 80 frames
  if (World.frameCount % 80 === 0 ){
    var banana=createSprite(600,30,20,20);
    
    //giving banana random y position
    banana.y=Math.round(random(120,200));
    //adding imiage to banana and giving it velocity
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -6;
    
    //giving banana lifetime
    banana.lifetime=300;
    
    //add each obstacle to the group   
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  
  //spawning obstacles after every 300 frames
  if(World.frameCount % 300 === 0){
    var obstacle = createSprite(600,240,10,40);
    obstacle.velocityX = -(6 + survivaltime/200);
    
    //spawning random obstacles
    var rand = Math.round(random(1,4));
    if (rand == 1) {
      obstacle.addImage(obstacle1Image);    
      obstacle.scale=0.2 ;
     } else if (rand == 2) {       
      obstacle.addImage(obstacle2Image);
      obstacle.scale=0.3;
    } else if (rand == 3) {        
      obstacle.addImage(obstacle3Image);
      obstacle.scale=0.35;
    } else if (rand == 4) {
      obstacle.addImage(obstacle4Image);
      obstacle.scale=0.3;
    }
    
    //giving obstacles lifetime
    obstacle.lifetime=300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}




