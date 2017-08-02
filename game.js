var bg, sc;
var y = 0;
var gb;
var person;
var boy;
var rc;
var logo;
var jumps = 0;
var obs1, obs2, obs3, obs4, obs5, obs6, obs7;
var score = 0;
var recentColl = false;
var recentCollB = false;
var money = 0.00;
var plasticBottle;
var monospace;
var lost = false;
var lives = 5;
var heart;
var eheart;
var offset;
var win;
var won = false;
var collected = {};
var ww = windowWidth;
var wh = windowHeight;


function preload() {
  logo = loadImage("logo.png");
  bg = loadImage("city-background.jpg");

  instructions = loadImage("instructions.png");
  plasticBottle = loadImage("waterbottle.png");
  sc = loadImage("original_45x65.png");
  boy = loadImage("boy_45x65.png")

  rc = loadImage("Recycling_Plant.png")
  plasticBottle = loadImage("waterbottle.png");
  lose = loadImage("losescreen.png");
  obs1 = loadImage("cat-call1.png");
  obs2 = loadImage("cat-call2.png");
  obs3 = loadImage("cat-call3.png");
  obs4 = loadImage("cat-call4.png");
  obs5 = loadImage("cat-call5.png");
  obs6 = loadImage("cat-call6.png")
  obs7 = loadImage("cat-call7.png")
  eheart= loadImage("EmptyHeart23.png")
  heart = loadImage("heart23.png")
  win = loadImage("winscreen.png")
}

function keyPressed() {
  if ((key === " ") && (jumps<2) && (person.pos.y > 260)){
      doJump();
  }
}

function mousePressed() {
    if(won || lost) {
      won = false;
      lost = false;
      lives = 5;
      score = 0;
      money = 0;
      person.pos.x = 0;
    } else {
      doJump();
    }
}

function doJump() {
    if((jumps<2) && (person.pos.y > 260)) {
        jumps+=1;
        var jump = createVector(0, -4);
        person.applyForce(jump);
    }
}

function setup() {
  ww = windowWidth - 1;
  wh = windowHeight - 1;
  offset =0;
  createCanvas(ww, wh);
   person = new Person();

}

function draw() {
  clear();
  if(millis()<=3000) {
    image(logo,0,0,ww,wh)
  }
  else if (millis()<=10000) {
    image(instructions,0,0,ww,wh);
  }
  else if (lives == 0) {
    lost = true;
    image(lose,0,0,ww,wh);
  }
  else if (won == true) {
    image(win,0,0,ww,wh);
  }
  else {
    rectMode(CORNER);
    drawBackground(offset-=2);
    if (offset<=-width){
        offset=0;
    }

    console.log(won);

    dis_money();

    disBottle();
    showLives();

    translate(-person.pos.x+50, 0);
    showBottles();
    checkWin();
    image(boy, 6160, height-60);


    var gravity = createVector(0, 0.1);
    person.applyForce(gravity);

    if (person.pos.y == wh) {
      jumps =0;

    }

    person.update();
    person.edges();
    person.display(sc);
    display_obstacles();


  }
}

function showLives() {
  if (lives < 1 ) {
    image(eheart, 0,0,30,30)
  } else {
    image(heart, 0,0,30,30)
  }
  if (lives < 2 ) {
    image(eheart, 29,0,30,30)
  } else {
    image(heart, 29,0,30,30)
  }
  if (lives < 3 ) {
    image(eheart, 58,0,30,30)
  } else {
    image(heart, 58,0,30,30)
  }
  if (lives < 4 ) {
    image(eheart, 88,0,30,30)
  } else {
    image(heart, 88,0,30,30)
  }
  if (lives < 5 ) {
    image(eheart, 118,0,30,30)
  } else {
    image(heart, 118,0,30,30)
  }

}

function clear(){
    background ("white");
}

function drawBackground(offset){
    image(bg, offset, 0, ww, wh);
    image(bg, offset+width, 0, ww, wh);
}

function dis_money() {
    fill(20, 119, 180);
    textSize(26);
    textAlign(RIGHT);
    textStyle(NORMAL);
    textFont("Monospace");
    // text(strMoney(), 50, 8, 637, 30);
    text("$" + strMoney(), 50, 8, ww - 170, 30);
    // textStyle(BOLD);
    // textAlign(CENTER);
    // textSize(30);
    // text("$", 280, 4.5, ww - 150, 250);
}

function showRecyclingCenter() {

}

function checkWin() {
  for(var i = 0 ; i < 3 ; i++) {
    image(rc, 6200*(i+1), wh-rc.height/4, rc.width/4, rc.height/4);
    if (collideRectRect(person.pos.x+12, person.pos.y-65, 30, 65, 6200*(i+1), height/2, rc.width/4, rc.height/4)){
      lives = 5;
      // won = true;
    }
    if(person.pos.x > 18600) {
      won = true;
    }
  }

}

function disBottle() {
  fill(20, 119, 180);
  textSize(26);
  textAlign(RIGHT);
  textStyle(NORMAL);
  textFont("Monospace");
  text(scoreFrac(), 10, 8, 570, 30);
}

function display_obstacles() {
  var obstacles = [obs1, obs2, obs3, obs4, obs5, obs6, obs7];
  var multiplier = 1;
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 7; j++){
      image(obstacles[j], 400*(multiplier), height-50);
      if (collideRectRect(400*multiplier, (height-50), obstacles[j].width, obstacles[j].height,person.pos.x+12, person.pos.y-65, 30, 65)) {
        if (recentColl == false){
          recentColl = true;
          console.log(recentColl)
          lives--;
          window.setTimeout(function(){recentColl = false; }, 1000);
        }

      }
      multiplier++;
    }
  }
}

function showBottles() {
  var index = 0;
  while(index < 20) {
    if (collideRectRect(person.pos.x+12, person.pos.y-65, 30, 65, 700*(index+2),height/2,plasticBottle.width/2,plasticBottle.height/2) ){
      if (recentCollB == false){
        recentCollB = true;
        console.log(recentColl)
        score++;
        money = money+0.05;
        window.setTimeout(function(){recentCollB = false; }, 1000);
        collected [index]=true;
      }
    }
    if (!collected[index]) {
      image(plasticBottle, 700*(index+2),height/2,plasticBottle.width/2,plasticBottle.height/2);
    }

    index++;
  }

}

function scoreFrac() {
  return score.toString() + "/50";
}

function strMoney() {
  return money.toFixed(2);
}
