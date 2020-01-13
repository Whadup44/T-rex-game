var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds_image, cloud_group;
var obstacle1_image, obstacle2_image, obstacle3_image, obstacle4_image, obstacle5_image, obstacle6_image, obstacle_group;
var score = 0, count = 0;
var PLAY = 1, END = 0, gamestate = PLAY, gameOver, restart, gameOver_image, restart_image;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  clouds_image = loadImage("cloud.png");

  obstacle1_image = loadImage("obstacle1.png");
  obstacle2_image = loadImage("obstacle2.png");
  obstacle3_image = loadImage("obstacle3.png");
  obstacle4_image = loadImage("obstacle4.png");
  obstacle5_image = loadImage("obstacle5.png");
  obstacle6_image = loadImage("obstacle6.png");
  
  restart_image = loadImage("restart.png");
  gameOver_image = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -2 - (score/100)*3;
  
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloud_group = new Group();

  obstacle_group = new Group();

  gameOver = createSprite(200,100);
  restart = createSprite(200,140);
gameOver.addImage(gameOver_image);
gameOver.scale = 0.5;
restart.addImage(restart_image);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

}

function draw() {
  background(0);
text("SCORE:"+score, 500, 50);
  if(gamestate === PLAY){
  
   
  if (keyDown("space")) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  count = count + 1;
  if (count % 5 === 0){
  score = score + 1;
  }
   
   
    
  spawnClouds();
  spawnObstacles();
    
    if (obstacle_group.isTouching(trex)){
    gamestate = END;
    }
    
    
  } else if(gamestate === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
    reset();
    }
    
  }
  trex.collide(invisibleGround);

  
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(clouds_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 220;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloud_group.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -2 -(score/100)*3;
    
    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1_image);
        break;
      case 2:
        obstacle.addImage(obstacle2_image);
        break;
      case 3:
        obstacle.addImage(obstacle3_image);
        break;
      case 4:
        obstacle.addImage(obstacle4_image);
        break;
      case 5:
        obstacle.addImage(obstacle5_image);
        break;
      case 6:
        obstacle.addImage(obstacle6_image);
        break;
      default:
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 370;
    
    obstacle_group.add(obstacle);
    
  }
}
function reset(){
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  count = 0;
  score =0;
  
}