var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var gameState;
var PLAY = 12678268;
var END = 18727289;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(windowWidth/2, windowHeight/2);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(mouseX, windowHeight/1, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  
  gameState = PLAY;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
  end = createSprite(windowWidth/2, windowHeight/2, 1, 1);
  end.addAnimation("end", endImg);
  end.visible = false;
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  boy.y = windowHeight/1.1;
  edges = createEdgeSprites();
  boy.collide(edges);

  boy.scale = windowWidth/4000;
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, windowWidth/(8/3), windowHeight/(40/3));
  if (gameState === PLAY) {
    //code to reset the background
    if (path.y > windowHeight) {
      path.y = height / 2;
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += Math.round(random(1, 10));
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += Math.round(random(100, 200));
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += Math.round(random(1, 6000));
      
    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        jwelleryG.destroyEach();
        cashG.destroyEach();
        diamondsG.destroyEach();
        gameState = END
      }
    }
  } else if (gameState === END) {
    path.velocityY=0;
    boy.destroy();
    swordGroup.setVelocityYEach(0);
    cashG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    swordGroup.setLifetimeEach(-1);
    cashG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    end.visible=true;
  }

  
}





    

function createCash() {
  if (World.frameCount % 30 == 0) {
    var cash = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = windowWidth/133.33333;    
    cash.lifetime = 150;
    cashG.add(cash);
    cashG.setScaleEach(windowWidth/2000);
  }
}

function createDiamonds() {
  if (World.frameCount % 90 == 0) {
    var diamonds = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = windowWidth/133.33333;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
    diamondsG.setScaleEach(windowWidth/1000);
  }
}

function createJwellery() {
  if (World.frameCount % 60 == 0) {
    var jwellery = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = windowWidth/133.33333;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
    jwelleryG.setScaleEach(windowWidth/2000);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = windowWidth/133.33333;
    sword.lifetime = 150;
    swordGroup.add(sword);
    swordGroup.setScaleEach(windowWidth/2000);
  }
}