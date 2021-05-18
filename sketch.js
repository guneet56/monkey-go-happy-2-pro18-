
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var ground
var background;


function preload(){
  backImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png"
  ,"Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png"
  ,"Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}



function setup() {
  createCanvas(600,300);
  
 background = createSprite(600, 300);
 background.addImage("image", backImage);
 background.velocityX = -4;
 background.x = background.width/2;

 monkey = createSprite(90,250,400,20);
monkey.addAnimation("running",monkey_running);
 monkey.scale = 0.1;
  
  ground = createSprite(300,290,550,5);
  ground.velocityX = -4;

 ground.x = ground.width/2;
  console.log(ground.x);
  ground.visible= false;

  bananaGroup= new Group ();
  obstacleGroup= new Group ();
}


function draw() {
//making monkey collide with other sprites
  monkey.collide (ground);
 // monkey.collide (bananaGroup);
 // monkey.collide (obstacleGroup);

//making background repeat
 if (background.x < 100){
  background.x = background.width/2;
 }

 //making ground repeat
if (ground.x<0){
 ground.x = ground.width/2;
}
  
//making monkey jump
 if (keyDown("space")){
   monkey.velocityY=-9;
 }

 //adding score
 if (bananaGroup.isTouching(monkey)){
score = score+2;
bananaGroup.destroyEach();
 }

 switch (score){
   case 10: monkey.scale = 0.12;
            break;
   case 20: monkey.scale= 0.16;
            break;
   case 30: monkey.scale= 0.18;
            break;
   case 40: monkey.scale= 0.2;
            break;
   default: break;
 }
  
 if (obstacleGroup.isTouching(monkey)){
  monkey.scale = 0.02;
 // bananaGroup.destroyEach();
 }
 //adding gravity to monkey
  monkey.velocityY = monkey.velocityY+0.5;
  
  //stroke("black");
  //textSize(20);
  //fill("black");
  //survivalTime = Math.ceil(frameCount/frameRate());
 // text("Suvival time: " + survivalTime, 150,50);

  food();

  obstacles();
  drawSprites();

  stroke("black");
  textSize(20);
  fill("black");
  text("score: " + score, 100,50);

  
}
function food() {
   if (frameCount%80===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.y = Math.round(random(80, 150));
    banana.scale= 0.1  ;
    banana.velocityX= -3;
    
    //adding lifetime to bananas
      banana.lifetime= 150;
      bananaGroup.add(banana) ;
   }
}

function obstacles() {
      if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,260);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
}
}    



