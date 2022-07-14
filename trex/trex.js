
var trex ,trex_running;
var chao,chaoIMG;
function preload(){
  trex_running=loadAnimation("trex1.png","trex2.png","trex3.png");
  chaoIMG=loadImage("ground2.png"); 
}

function setup(){
  createCanvas(600,300)
  
  //create a trex sprite
 chao=createSprite(300,290,600,25);
 chao.addImage(chaoIMG);
 trex=createSprite(50,240,20,20);
 trex.addAnimation("trexrun",trex_running);
 trex.scale=1;
 chao.velocityX=-3;
}

function draw(){
  background("white")
  if(keyDown("space")){
     trex.velocityY=-10; 
  }
  trex.velocityY=trex.velocityY+0.8;
  if(chao.x<0)
    chao.x=chao.width/2;

  drawSprites();
  trex.collide(chao);
}
