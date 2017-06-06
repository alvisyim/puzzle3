var page = 4;
var upID;
var downID;
var leftID;
var rightID;
var lock = false;

var paperX = 106;
var paperY = 268;
var paperSizeX = 15;
var paperSizeY = 20;
var handPaperY = 600;
var stateOfPaper = 1;

var inPaperLocation = false;
var inLockerLocation = false;

var lockers = [[]];
var puzzleResult = false;
var puzzleResultCounter = 0;

var stateOfMapL = 1;
var handMapLY = 600;


var mapRX = 745;
var mapRY = 360;
var mapRSizeX = 10;
var mapRSizeY = 20;
var handMapRY = 600;
var stateOfMapR = 1;

var freeToGo = false;
var freeToClick = false;

var b =0;
var handMapLX = 0;
var handMapRX = 400;
var handMapLSizeY = 600;
var handMapRSizeY = 600;

var startAnimation = false;
var passcode = "";
var numID
var passcodeCount = 0;
var finishGame = "nope, not yet";

function preload () {
  bg01 = loadImage("https://dl.dropboxusercontent.com/s/h8agmlzfcfbse00/bg01.PNG?");
  bg02 = loadImage("https://dl.dropboxusercontent.com/s/ovxrhqpmzm961si/bg02.png");
  up = loadImage("https://dl.dropboxusercontent.com/s/nahae8egan2seux/up.png");
  down = loadImage("https://dl.dropboxusercontent.com/s/m5ukbloh426k66f/down.png");
  left = loadImage("https://dl.dropboxusercontent.com/s/6k19qdmedmrfujc/left.png");
  right = loadImage("https://dl.dropboxusercontent.com/s/7y0xym3zxtpz3h0/right.png");
  bgm = loadSound("https://dl.dropboxusercontent.com/s/envcrhqqxmbnbsf/Aokigahara%20Puzzle%203.m4a");
  handPaper = loadImage ("https://dl.dropboxusercontent.com/s/e4gvj7w2p44qiaz/handPaper.png");
  paper = loadImage("https://dl.dropboxusercontent.com/s/uktwivvfxhyqt8r/paper.png");
  lockerO = loadImage("https://dl.dropboxusercontent.com/s/9vwrm4kqtfwwqkv/lockerO.png");
  lockerC = loadImage("https://dl.dropboxusercontent.com/s/r28qg55jgyohszw/lockerC.png");
  resetButton = loadImage("https://dl.dropboxusercontent.com/s/3y16g8jcd87lzc2/resetButton.png");
  bg04 = loadImage("https://dl.dropboxusercontent.com/s/46b48vph3l709xm/bg04.PNG");
  mapL = loadImage("https://dl.dropboxusercontent.com/s/7xzbsbs5vxwrey0/mapL.png");
  handMapL = loadImage("https://dl.dropboxusercontent.com/s/ol6xhfo7akcwonf/handMapL.png");
  mapR = loadImage("https://dl.dropboxusercontent.com/s/pcufri1vqso4t07/mapR.png");
  handMapR = loadImage("https://dl.dropboxusercontent.com/s/buibx04r52vrsw3/handMapR.png");
  bb = loadImage("https://dl.dropboxusercontent.com/s/6lgv0gi5ehawnhz/bb.jpg");
}

function setup () {
  createCanvas(800, 600);
  textAlign(CENTER);

  sliderVol = createSlider(0, 1, 0.5, 0.01);//0.0 for no music, o.5 for yes
  sliderVol.style('width', '800px');


  for (var j = 0; j < 11; j++) {
    lockers.push([]);
  }

  for (var i = 0; i < 11; i++) {
    lockers[i].push([]);
  }

  for (var r = 0; r < 11; r++) {
    for (var c = 0; c < 11; c++) {
      lockers[r][c] = 0;
    }
  }

}

function draw () {
  ID();
  bgm.setVolume(sliderVol.value());
  if (bgm.isPlaying() == false) {
    bgm.play();
  }
  if (page == 1) {
    page01();
  } else if (page == 2) {
    page02();
  } else if (page == 3) {
    page03();
  } else if (page == 4) {
    page04();
  } else if (page == 5) {
    finalPage();
  }

  if(page<1){
    page=1;
  }
  if(page>5){
    page=5;
  }
  if(b>255){
    b=255;
  }
  //test();
}

function page01 () {
  image(bg01, 0, 0, 800, 600);
  nav ();

  if (upID < 40 && freeToGo == true) {
    ellipse(width/2,40,80,80);
    cursor(HAND);
  } else if (inMapRLocation == true) {
    cursor(HAND);
  } else if (inMapLLocation == true) {
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  image(up, (width/2)-40, 0, 80, 80);
  //image(left, 0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  //image(down,(width/2)-40, 520, 80, 80);
}

function page02 () {
  image(bg02, 0, 0, 800, 600);
  nav ();

  if (downID < 40 && freeToGo == true) {
    ellipse(width/2,560,80,80);
    cursor(HAND);
  } else if (upID < 40 && freeToGo == true) {
    ellipse(width/2,40,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else if (inMapRLocation == true) {
    cursor(HAND);
  } else if (inMapLLocation == true) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  image(paper,paperX,paperY,paperSizeX,paperSizeY);
  image(up, (width/2)-40, 0, 80, 80);
  //image(left,0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  image(down,(width/2)-40, 520, 80, 80);
}

function page03 () {
  background(180);

  // creates lockers
  for (var r = 10; r > 0; r=r-1) {
    for (var c = 9; c > -1; c=c-1) {
      if (lockers[r][c] == 1) {
        image(lockerO,(r*50)+100,c*50,70,50);
      } else {
        image(lockerC,(r*50)+100,c*50,50,50);
        textSize(11);
        fill(0);
        noStroke();
        text(r+(10*c),(r*50)+105,25+(50*c),50,50);
      }
    }
  }
    // mouse over locker
  for (var r = 1; r < 11; r++) {
    for (var c = 0; c < 11; c++) {
      if (mouseIsPressed == true && mouseX > (r*50)+100 && mouseX < (r*50)+100+50 && mouseY > c*50 && mouseY < c*50+50 && lock == false) {
        lock = true;
        if(lockers[r][c] == 0){
          lockers[r][c] = 1;
          puzzleResultCounter++;
        } else {

        }
      }
    }
  }
  // evaluate locker
  for (var r = 1; r < 11; r++) {
    for (var c = 0; c < 11; c++) {
      if (lockers[1][0] == 1 && lockers[4][0] == 1 && lockers[9][0] == 1 && lockers[6][1] == 1 && lockers[5][2] == 1 && lockers[6][3] == 1 && lockers[9][4] == 1 && lockers[4][6] == 1 && lockers[1][8] == 1 && lockers[10][9] == 1) {
        puzzleResult = true;
      } else {
        puzzleResult = false;
      }
    }
  }



  //end of array
  image(resetButton,0,(height/2)-40,80,80);
  nav ();

  if (downID < 40 && freeToGo == true) {
    ellipse(width/2,560,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else if(rightID < 40 && freeToGo == true) {
    ellipse(760,height/2,80,80);
    cursor(HAND);
  } else if (leftID < 40 && freeToGo == true){
    cursor(HAND);
  } else if (inMapRLocation == true) {
    cursor(HAND);
  } else if (inMapLLocation == true) {
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  //image(up, (width/2)-40, 0, 80, 80);
  //image(left, 0, (height/2)-40, 80, 80);
  image(right, 720, (height/2)-40, 80, 80);
  image(down,(width/2)-40, 520, 80, 80);
}

function page04 () {
  image(bg04, 0, 0, 800, 600);
  nav ();

  if (leftID < 40 && freeToGo == true) {
    ellipse(40,height/2,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else if (inMapRLocation == true) {
    cursor(HAND);
  } else if (inMapLLocation == true) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  image(mapR,mapRX,mapRY,mapRSizeX,mapRSizeY);
  //image(up, (width/2)-40, 0, 80, 80);
  image(left, 0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  //image(down,(width/2)-40, 520, 80, 80);

  if (stateOfMapR == 5 && stateOfMapL == 3 && lock == false) {
    startAnimation = true;
    lock = true;
  }
  if(startAnimation == true){
    b = b + 10;
    tint(225,b);
    image(bb,0,0,width,height);
    noTint();
    image(handMapL, handMapLX,0,400, handMapLSizeY);
    image(handMapR, handMapRX,0,400, handMapRSizeY);
      handMapLX = handMapLX + 2;
      handMapRX = handMapRX - 2;
      handMapLSizeY = handMapLSizeY - 2;
      handMapRSizeY = handMapRSizeY - 2;
      if(handMapLSizeY < 450){
      handMapLSizeY = 450;
    }
    if (handMapRSizeY < 450){
      handMapRSizeY = 450;
    }
    if(handMapLX > 40){
      handMapLX = 40;
    }
    if (handMapRX <360){
      handMapRX = 360;
    }
  }
    if(handMapRX == 360 && handMapLX == 40 && handMapRSizeY == 450 && handMapLSizeY == 450){
    lock = false;
    page = 5;
  }
}

function ID () {
  upID = sqrt(((mouseX-(width/2))*(mouseX-(width/2))) + ((mouseY-40)*(mouseY-40)));
  downID = sqrt(((mouseX-(width/2))*(mouseX-(width/2))) + ((mouseY-560)*(mouseY-560)));
  rightID = sqrt(((mouseX-760)*(mouseX-760)) + ((mouseY-(height/2))*(mouseY-(height/2))));
  leftID = sqrt(((mouseX-40)*(mouseX-40)) + ((mouseY-(height/2))*(mouseY-(height/2))));

  if (mouseX>paperX && mouseX<paperX+paperSizeX && mouseY>paperY && mouseY<paperY+paperSizeY) {
    inPaperLocation = true;
  } else {
    inPaperLocation = false;
  }

  if (mouseX > 20 && mouseX < 80 && mouseY > 520 && mouseY < 580) {
    inMapLLocation = true;
  } else {
    inMapLLocation = false;
  }

  if (mouseX>mapRX && mouseX<mapRX+mapRSizeX && mouseY>mapRY && mouseY<mapRY+mapRSizeY) {
    inMapRLocation = true;
  } else {
    inMapRLocation = false;
  }

  if(stateOfMapL != 3 && stateOfPaper != 5 && stateOfMapR != 5) {
    freeToGo = true;
  } else {
    freeToGo = false;
  }
}

function nav () {
  noStroke();
  fill(150);
  rect(0, 500, 300, 100, 3);
  fill(100);
  rect(10, 510, 80, 80);
  rect(110, 510, 80, 80);
  rect(210, 510, 80, 80);
  image(mapL, 20, 520, 60, 60);

//mapL
{
  if(stateOfMapL == 1){
  } else if(stateOfMapL == 2) {
    image(handMapL,0,handMapLY, 400, height);
    handMapLY = handMapLY - 20;
    if (handMapLY < 0) {
      handMapLY = 0;
    }
  } else if(stateOfMapL == 4) {
    image(handMapL,0,handMapLY, 400, height);
    handMapLY = handMapLY + 20;
    if (handMapLY > 600) {
      handMapLY = 600;
    }
  }

  if(handMapLY == 600){
    stateOfMapL = 1;
    //lock = false;///////////////////////////////////////////////////////
  }
  if(handMapLY == 0){
    stateOfMapL = 3;
    //lock = false;/////////////////////////////////////////////////////
    image(handMapL,0,handMapLY, 400, height);
  }}

//paper
{
  if(stateOfPaper == 1) {
  }else if(stateOfPaper == 2) {
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    paperX = paperX + 10;
    paperY = paperY + 10;
    paperSizeX = paperSizeX + 5;
    paperSizeY = paperSizeY + 5;
    if (paperX > 220) {
      paperX = 220;
    }
    if(paperY > 520) {
      paperY = 520;
    }
    if (paperSizeX > 60) {
      paperSizeX = 60;
    }
    if(paperSizeY > 60) {
      paperSizeY = 60;
    }
  }else if(stateOfPaper == 4) {
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    image(handPaper,0,handPaperY, width, height);
    handPaperY = handPaperY - 20;
    if (handPaperY < 0) {
      handPaperY = 0;
    }
  }else if(stateOfPaper == 6) {
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    image(handPaper,0,handPaperY, width, height);
    handPaperY = handPaperY + 20;
    if (handPaperY > 600) {
      handPaperY = 600;
    }
  }
  if (paperX == 220 && paperY == 520 && paperSizeX == 60 && paperSizeY == 60 && handPaperY == 600) {
    stateOfPaper = 3;
    //lock = false;/////////////////////////////////////////////////////////////////////////////////////////////////one i get to state3, i nned to false lock
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
  }

  if (handPaperY == 0) {
    stateOfPaper = 5;
    //lock = false;/////////////////////////////////////////////////////////////////////////////////////////////////one i get to state3, i nned to false lock
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    image(handPaper,0,handPaperY, width, height);
  }}

//mapR
{
  if(stateOfMapR == 1) {
  }else if(stateOfMapR == 2) {
  image(mapR,mapRX,mapRY, mapRSizeX,mapRSizeY);
    mapRX = mapRX - 10;
    mapRY = mapRY + 10;
    mapRSizeX = mapRSizeX + 5;
    mapRSizeY = mapRSizeY + 5;
    if (mapRX < 120) {
      mapRX = 120;
    }
    if(mapRY > 520) {
      mapRY = 520;
    }
    if (mapRSizeX > 60) {
      mapRSizeX = 60;
    }
    if(mapRSizeY > 60) {
      mapRSizeY = 60;
    }
  }else if(stateOfMapR == 4) {
  image(mapR,mapRX,mapRY, mapRSizeX,mapRSizeY);
    image(handMapR,400,handMapRY, 400, height);
    handMapRY = handMapRY - 20;
    if (handMapRY < 0) {
      handMapRY = 0;
    }
  }else if(stateOfMapR == 6) {
  image(mapR,mapRX,mapRY, mapRSizeX,mapRSizeY);
    image(handMapR,400,handMapRY, 400, height);
    handMapRY = handMapRY + 20;
    if (handMapRY > 600) {
      handMapRY = 600;
    }
  }
  if (mapRX == 120 && mapRY == 520 && mapRSizeX == 60 && mapRSizeY == 60 && handMapRY == 600) {
    stateOfMapR = 3;
    //lock = false;/////////////////////////////////////////////////////////////////////////////////////////////////one i get to state3, i nned to false lock
    image(mapR,mapRX,mapRY, mapRSizeX,mapRSizeY);
  }

  if (handMapRY == 0) {
    stateOfMapR = 5;
    //lock = false;/////////////////////////////////////////////////////////////////////////////////////////////////one i get to state3, i nned to false lock
    image(mapR,mapRX,mapRY, mapRSizeX,mapRSizeY);
    image(handMapR,400,handMapRY, 400, height);
  }}

}

function finalPage () {
  background(0);
  image(handMapL, handMapLX,0,400, handMapLSizeY);
  image(handMapR, handMapRX,0,400, handMapRSizeY);

  for(var d = 0; d < 10; d++) {
    fill(255);
    ellipse(40+(80*d),550,70,70);
    fill(0);
    textSize(40);
    text(d,40+(80*d),560);


    numID = sqrt((mouseX-(40+(80*d)))*(mouseX-(40+(80*d)))+(mouseY-550)*(mouseY-550));

    if(numID < 35){
      cursor(HAND);/////////////////////////////////////////////////////////////////////////////////////////////not working
      if(mouseIsPressed == true && lock == false && passcodeCount < 3){/////////////////////////////////////////0 is not working
        lock = true;
        fill(255);
        passcode = passcode + d;
        passcodeCount = passcodeCount + 1;
      }
    } else if (mouseX >500 && mouseX < 560 && mouseY > 440 && mouseY < 500) {
      cursor(HAND);
      if (mouseIsPressed == true && lock == false){
        lock = true;
        passcode = "";
        passcodeCount = 0;
      }
    } else {
      cursor(ARROW);
    }
  }

  fill(255);
  stroke(120);
  strokeWeight(10);
  rect(250,440,250,60);
  rect(500,440,60,60);
  noStroke(5);
  fill(0);
  textSize(60);
  text(passcode,375,490);
  textSize(40);
  text("C",530,485);

  if(passcodeCount == 3){
    if(passcode == "141"){
      var ee = confirm("Congrats, you have the right answer.")
      if (ee == true || ee == false){
        finishGame == "Hell Yeah it is";
      }
    }
  }
}

function mousePressed () {
  if (upID < 40 && lock == false && freeToGo == true && page != 3 && page != 4) {
    lock = true;
    page = page + 1;
  }

  if (downID < 40 && lock == false && freeToGo == true && page != 4) {
    lock = true;
    page = page - 1;
  }

  if (inPaperLocation == true && lock == false && (page == 2 || stateOfPaper > 1) && (stateOfMapL == 1) && (stateOfMapR == 1 || stateOfMapR ==3)) {
    stateOfPaper = stateOfPaper + 1;
    lock = true;
  }

  if (inMapRLocation == true && lock == false && (page == 4 || stateOfMapR > 1) && (stateOfMapL ==1 || stateOfMapL ==3) && (stateOfPaper == 1 || stateOfPaper == 3)) {
    stateOfMapR = stateOfMapR + 1;
    lock = true;
  }

  if (inMapLLocation == true && lock == false && ( stateOfMapR == 1 || stateOfMapR == 3)  && (stateOfPaper == 1 || stateOfPaper == 3)) {
    stateOfMapL = stateOfMapL + 1;
    lock = true;
  }

  if (rightID < 40 && freeToGo == true){
    if (puzzleResult == true && puzzleResultCounter == 10 && page == 3 && lock == false) {
      page = page +1;
      lock = true;
    } else {
      alert("Sorry, your answer is wrong");
    }
  }

  if (leftID < 40 && lock == false && freeToGo == true && page == 4) {
    lock = true;
    page = page - 1;
  }


  if(leftID < 40 && lock == false && page == 3 && freeToGo == true) {
    for (var r = 1; r < 11; r++) {
      for (var c = 0; c < 10; c++) {
        lockers[r][c] = 0;
        puzzleResultCounter = 0;
        puzzleResult = false;
      }
    }
    lock = true;
  }
}

function mouseReleased () {
  if (lock) {
    lock = false;
  }
}

function test () {
  fill(255);
  rect(0,0,100,100);
  fill(225,0,0);
  textSize(7);
  text("("+int(mouseX)+","+int(mouseY)+")", 50, 10);
  text("lock "+lock, 50, 20);
  text("inMapLLocation "+inMapLLocation, 50, 30);
  text("page"+page,50,40);
}


// when everything finishes, (finishGame == "Hell Yeah it is")
