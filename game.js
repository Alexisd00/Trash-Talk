var bg, sc;
var y = 0;
var gb;
var person;
var rc;

var logo;
var jumps = 0;

var score = 0;
var recentColl = false;
var money = 0.00;
var plasticBottle;
var monospace;


function preload() {
  logo = loadImage("logo.png");
  bg = loadImage("city-background.jpg");
  sc = loadImage("girl.png");
  rc = loadImage("Recycling_Plant.png")
  plasticBottle = loadImage("waterbottle.png");



}

function keyPressed() {
  if ((key === " ") && (jumps<2) && (person.pos.y > 260)){
      jumps+=1;
        var jump = createVector(0, -4);
        person.applyForce(jump);


  }
    console.log(jumps);
}

function setup() {
  offset =0;
  createCanvas(839, 350);
  person = new Person();

}

function draw() {
  clear();
  if(millis()<=4000) {
    image(logo,0,0,845,350);
  } else {


    drawBackground(offset-=2);
    if (offset<=-width){
        offset=0;
    }
    if (millis()>100000){
      image(rc, 400, height/2, rc.width/4, rc.height/4);
    }
    dis_money();
    bottleCount();
    disBottle();
    //bottle_score();
    makeBottle();
    translate(-person.pos.x+50, 0);
    var gravity = createVector(0, 0.1);
    person.applyForce(gravity);
    if (person.pos.y == 350) {
      jumps =0;
    }

    person.update();
    person.edges();
    person.display(sc);

    fill(255, 0, 100);
    rect(400, height-50, 50, 50);
    rect(800, height-50, 50, 50);
    rect(1200, height-50, 50, 50);
  }
}

function clear(){
    background ("white");
}
function recycling(){

}

function drawBackground(offset){
    image(bg, offset, -140);
    image(bg, offset+width, -140);
}

function dis_money() {
    fill(20, 119, 180);
    textSize(26);
    textAlign(RIGHT);
    textStyle(NORMAL);
    textFont("Monospace");
    text(strMoney(), 50, 8, 637, 30);
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(30);
    text("$", 280, 4.5, 650, 250);
}

function bottleCount() {
  console.log(score);
  if (collideRectRect(400, (height-50), 50, 50,person.pos.x, person.pos.y, 42, 132)) {
    if (recentColl == false){
      recentColl = true;
      console.log(recentColl)
      score++;
      money = money+0.05;
      window.setTimeout(function(){recentColl = false; }, 1000);
    }
  }
}

function moneyCount() {
  console.log(score);
  if (collideRectRect(400, (height-50), 50, 50,person.pos.x, person.pos.y, 42, 132)) {
    if (recentColl == false){
      recentColl = true;
      console.log(recentColl)
      money++;
      window.setTimeout(function(){recentColl = false; }, 1000);
    }
  }
}

function makeBottle() {
   image(plasticBottle, 480, 0, 18, 58);
}

function disBottle() {
  fill(20, 119, 180);
  textSize(26);
  textAlign(RIGHT);
  textStyle(NORMAL);
  textFont("Monospace");
  text(scoreFrac(), 10, 8, 570, 30);
}

function scoreFrac() {
  return score.toString() + "/50";
}

function strMoney() {
  return money.toString();
}
