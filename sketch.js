var trex ,trex_running, trexMorto;
var chao,chaoIMG;
var chaoInv;
var cloudImg;
var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var grupoCacto, grupoNuvem;
var jogar=1;
var encerrar=0;
var estadoDoJogo=jogar;
var reStart, gameOver;
var reStarImg, gameOverImg;
var score=0;
var puloSom, checkPointSom, morteSom;
var tempo=0;



function preload(){
  trex_running=loadAnimation("trex1.png","trex2.png","trex3.png");
  trexMorto=loadAnimation("trex_collided.png");

  chaoIMG=loadImage("ground2.png"); 

  cloudImg=loadImage("cloud.png");

  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle6.png");
  cactus3=loadImage("obstacle5.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle3.png");
  cactus6=loadImage("obstacle2.png");

  reStartImg=loadImage("restart.png");

  gameOverImg=loadImage("gameOver.png");

  puloSom=loadSound("jump.mp3");
  morteSom=loadSound("die.mp3");
  checkPointSom=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  chaoInv=createSprite(width/2,height-600,width,125);
  chaoInv.visible=false;
  chao=createSprite(300,280,600,25);
  chao.addImage(chaoIMG);
  
  trex=createSprite(50,height-700,20,20);
  trex.setCollider("circle",0,0,30);
  //trex.debug=true;
  trex.addAnimation("trexrun",trex_running);
  trex.addAnimation("trexDie", trexMorto);
  trex.scale=0.4;
  
  gameOver=createSprite(280,140,10,10);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale=0.6
  gameOver.visible=false;

  reStart=createSprite(280,190,20,20);
  reStart.addImage("reStart",reStartImg); 
  reStart.scale=0.4;
  reStart.visible=false;

  grupoNuvem=createGroup();
  grupoCacto=createGroup();
}

function draw(){
  background("black")

  if(tempo > 0 && tempo %2==0){
    background("grey");

    grupoNuvem.destroyEach();
  }
  
  text("Pontuação: "+ score,450,60);
  text("TIME: "+ tempo,200,60);
  
  if(chao.x<0){
    chao.x=chao.width/2;
  }

  if(estadoDoJogo==jogar){    
    chao.velocityX= -(2+2* score/200);

    score = score + Math.round(frameRate()/60);
    tempo = Math.round(score/300);

    if(score > 0 && score %200==0){
      checkPointSom.play();
    }

    if((touches.length > 0 || keyDown ("space"))&& trex.y>=254){
      trex.velocityY=-13; 

      puloSom.play();

      touches = [];
    } 

    trex.velocityY=trex.velocityY+0.8;

    if(grupoCacto.isTouching(trex)){
    estadoDoJogo=encerrar;

    morteSom.play();
    }

    trex.changeAnimation("trexrun",trex_running);
  }

  else if(estadoDoJogo==encerrar){
    chao.velocityX=0;

    trex.velocityY=0;
    trex.changeAnimation("trexDie", trexMorto);

    grupoCacto.setVelocityXEach(0);
    grupoNuvem.setVelocityXEach(0);

    gameOver.visible=true;
    reStart.visible=true;

    if(mousePressedOver(reStart)){
      reset();    
    }
  }

  //console.log(trex.y)
  
  spawClouds();
  spawCactus();
  drawSprites();

  trex.collide(chaoInv);
}

  function spawClouds(){
    if(frameCount % Math.round(random(80,100))==0){
      var cloud=createSprite(600,60,50,20);
      cloud.velocityX= -(3+2* score/200);
      cloud.addImage(cloudImg);
      cloud.y=Math.round(random(10,150))

      grupoNuvem.add(cloud);    
  }

}

  function spawCactus(){
    if(frameCount % 150 ==0){
    var cactus=createSprite(630,260,30,30);
    cactus.velocityX= -(3+2* score/200);
    cactus.scale=0.5;
    grupoCacto.add(cactus);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: cactus.addImage(cactus1);
        break;


      case 2: cactus.addImage(cactus2);
        break;


      case 3: cactus.addImage(cactus3);
        break;


      case 4: cactus.addImage(cactus4);
        break;


      case 5: cactus.addImage(cactus5);
        break;

      case 6: cactus.addImage(cactus6);
        break;

      default: break;
      
    }
  }
}

function reset(){
  estadoDoJogo=jogar;

  gameOver.visible=false;
  reStart.visible=false; 

  grupoCacto.destroyEach();
  grupoNuvem.destroyEach();

  trex.changeAnimation("trexrun",trex_running);

  score=0;
}