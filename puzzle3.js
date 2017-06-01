var page = 1;
var upID;
var downID;
var leftID;
var rightID;
var lock = false;
var paperX = 106;
var paperY = 268;
var paperSizeX = 15;
var paperSizeY = 20;
var stateOfPaper = 1;
var handPaperY = 600;
var inPaperLocation = false;
var inLockerLocation = false;
var lockers = [[]];
var puzzleResult = false;
var puzzleResultCounter = 0;
var b =0;

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
}

function setup () {
  createCanvas(800, 600);
  textAlign(CENTER);

  sliderVol = createSlider(0, 1, 0.0, 0.01);//0 for no music
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
      //tint(255, 128);
    } else if (page == 2) {
      page02();
    } else if (page == 3) {
      page03();
    } else if (page == 4){
      page04();
    }

    if(page<1){
      page=1;
    }
    if(page>4){
      page=4;
    }
  test();
}

function page01 () {
  image(bg01, 0, 0, 800, 600);
  nav ();

  if (upID < 40 && (stateOfPaper != 5 )) {
    ellipse(width/2,40,80,80);
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

  if (downID < 40 && (stateOfPaper != 5 )) {
    ellipse(width/2,560,80,80);
    cursor(HAND);
  } else if (upID < 40 && (stateOfPaper != 5 )) {
    ellipse(width/2,40,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
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
        lockers[r][c] = 1;
        lock = true;
        puzzleResultCounter++;
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

  if (downID < 40 && (stateOfPaper != 5 )) {
    ellipse(width/2,560,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else if(rightID < 40  && (stateOfPaper != 5 )) {
    ellipse(760,height/2,80,80);
    cursor(HAND);
  } else if (leftID < 40  && (stateOfPaper != 5 )){
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

  if (leftID < 40 && (stateOfPaper != 5 )) {
    ellipse(40,height/2,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
  //image(up, (width/2)-40, 0, 80, 80);
  image(left, 0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  //image(down,(width/2)-40, 520, 80, 80);
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


}

function nav () {
  noStroke();
  fill(150);
  rect(0, 500, 300, 100, 3);
  fill(100);
  rect(10, 510, 80, 80);
  rect(110, 510, 80, 80);
  rect(210, 510, 80, 80);

  if(stateOfPaper == 1) {
  }else if(stateOfPaper == 2) {
    lock = true;
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
    lock = true;
    image(handPaper,0,handPaperY, width, height);
    handPaperY = handPaperY - 20;
    if (handPaperY < 0) {
      handPaperY = 0;
    }
  }else if(stateOfPaper == 6) {
    lock = true;
    image(handPaper,0,handPaperY, width, height);
    handPaperY = handPaperY + 20;
    if (handPaperY > 600) {
      handPaperY = 600;
    }
  }
  if (paperX == 220 && paperY == 520 && paperSizeX == 60 && paperSizeY == 60 && handPaperY == 600) {
    stateOfPaper = 3;
    lock = false;
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
  }

  if (handPaperY == 0) {
    stateOfPaper = 5;
    lock = false;
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    image(handPaper,0,handPaperY, width, height);
  }
}

function mousePressed () {
  if (upID < 40 && lock == false && stateOfPaper != 5 && page != 3) {
    lock = true;
    page = page + 1;
  }

  if (downID < 40 && lock == false && (stateOfPaper != 5 )) {
    lock = true;
    page = page - 1;
  }

  if (inPaperLocation == true && lock == false && (page == 2 || stateOfPaper > 1)) {
    stateOfPaper = stateOfPaper + 1;
    //lock = true;
  }

  if (rightID < 40){
    if (puzzleResult == true && puzzleResultCounter == 10 && page == 3 && lock == false) {
      page = page +1;
      lock = true;
    } else {
      alert("Sorry, your answer is wrong");
    }
  }

  if (leftID < 40 && lock == false && (stateOfPaper != 5 ) && page == 4) {
    lock = true;
    page = page - 1;
  }


  if(leftID < 40 && lock == false && page == 3 && (stateOfPaper != 5) ) {
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
  rect(0,0,100,200);
  fill(225,0,0);
  textSize(11);
  text("("+int(mouseX)+","+int(mouseY)+")", 40,20);
  text("lock "+lock,40,40);
}
