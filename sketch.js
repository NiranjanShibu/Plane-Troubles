var bg;
var plane, planeRIMG, planeLIMG;
var plane2;
var bottomBlock, topBlock, leftBlock, rightBlock;
var gameState = 0;
var time = 1500;
var enemyGroup, planeGroup;
var disastersAverted = 0;
var disastersCaused = 0;
var planetoEnd = false;
var plane2toEnd = false;
var birdIMG;

function preload() {
  
  bg = loadImage("nightBG.jpg");
  planeRIMG = loadImage("planeR.png");
  planeLIMG = loadImage("planeL.png");
  birdIMG = loadImage("bird.png");

}

function setup() {
  createCanvas(850, 560);

  enemyGroup = new Group();
  planeGroup = new Group();

  plane = createSprite(80, 300, 60, 50);
  plane.addImage(planeRIMG);
  plane.scale = 0.09;
  planeGroup.add(plane);

  plane2 = createSprite(770, 300, 60, 50);
  plane2.addImage(planeLIMG);
  plane2.scale = 0.08;
  planeGroup.add(plane2);

  topBlock = createSprite(425, -1, 870, 20);
  bottomBlock = createSprite(425, 565, 870, 20);
  leftBlock = createSprite(-1, 310, 20, 640);
  rightBlock = createSprite(851, 310, 20, 640);

  topBlock.visible = false;
  bottomBlock.visible = false;
  leftBlock.visible = false;
  rightBlock.visible = false;

  StartNewRound();
}

function draw() {
  background(bg);

  if(gameState === 0){
    time = time - Math.round(getFrameRate()/60);
  }

  textSize(20);
  fill("white");
  text("Disasters Averted: "+disastersAverted, 110, 30);
  text("Disasters Caused: "+disastersCaused, 330, 30);
  text("Time Left: "+time, 550, 30);
  textSize(14);
  text("Get as many planes to their respective destinations (the other side of the screen) before time runs out. Avoid hitting birds or planes.", 16, 55);

  if(time === 0){
    gameState = 1;
    planeGroup.destroyEach();

    textFont("impact");
    textSize(45);
    text("TIME'S UP!", 400, 270);
    textSize(30);
    text("Disasters Averted: " + disastersAverted, 370, 305);
    text("Disasters Caused: " + disastersCaused, 370, 340);
    textSize(13);
    text("Press 'R' to restart!", 441, 360);
    enemyGroup.destroyEach();
  }

  if(keyDown("r") && gameState == 1){
    location.reload();
  }

  if(keyDown("right") || keyDown("d")){
    plane.x = plane.x + 5.7;
    plane.addImage(planeRIMG);
    plane2.x = plane2.x - 5.7;
    plane2.addImage(planeLIMG);
  }
  if(keyDown("left") || keyDown("a")){
    plane.x = plane.x - 5.7;
    plane.addImage(planeLIMG);
    plane2.x = plane2.x + 5.7;
    plane2.addImage(planeRIMG);
  }

  if(keyDown("up") || keyDown("w")){
    plane.y = plane.y - 5.7;
    plane2.y = plane2.y + 5.7;
  }

  if(keyDown("down") || keyDown("s")){
    plane.y = plane.y + 5.7;
    plane2.y = plane2.y - 5.7;
  }

  if(plane.isTouching(topBlock)){
    plane.y = plane.y+10;
  }
  if(plane2.isTouching(topBlock)){
    plane2.y = plane2.y+10;
  }

  if(plane.isTouching(bottomBlock)){
    plane.y = plane.y-10;
  }
  if(plane2.isTouching(bottomBlock)){
    plane2.y = plane2.y-10;
  }

  if(plane.isTouching(leftBlock)){
    plane.x = plane.x+10;
  }
  if(plane2.isTouching(leftBlock)){
    plane.x = plane.x+10;
    plane2toEnd = true;
  }

  if(plane.isTouching(rightBlock)){
    plane2.x = plane2.x-10;
    planetoEnd = true;
  }
  if(plane2.isTouching(rightBlock)){
    plane2.x = plane2.x-10;
  }

  if(plane.isTouching(plane2)){
    disastersCaused += 1;
    StartNewRound();
  }

  if(enemyGroup.isTouching(plane) || enemyGroup.isTouching(plane2)){
    disastersCaused += 1;
    StartNewRound();
  }

  if(plane2toEnd === true && planetoEnd === true){
    disastersAverted += 1;
    StartNewRound();
  }

  drawSprites();

}

  function spawnObstacles(times){
    for (let i = 0; i < times; i++) {
      var obstacle = createSprite(200, 200, 20, 20);
      obstacle.scale = 0.08;
      obstacle.addImage(birdIMG);
      obstacle.x = Math.round(random(170, 683));
      obstacle.y = Math.round(random(35, 535));
      enemyGroup.add(obstacle);  
    }
  }  

  function StartNewRound(){
    plane.x = 80;
    plane.y = 300;
    plane2.x = 770;
    plane2.y = 300;

    plane2toEnd = false;
    planetoEnd = false;

    enemyGroup.destroyEach();

    spawnObstacles(6);
  }