var page = 1;
var upID;
var downID;
var lock = false;
var paperX = 106;
var paperY = 268;
var paperSizeX = 15;
var paperSizeY = 20;
var stateOfPaper = 1;
var handPaperY = 600;
var inPaperLocation = false;

function preload () {
  bg01 = loadImage("https://dl.dropboxusercontent.com/s/h8agmlzfcfbse00/bg01.PNG?");
  bg02 = loadImage("https://dl.dropboxusercontent.com/s/ovxrhqpmzm961si/bg02.png");
  up = loadImage("https://dl.dropboxusercontent.com/s/nahae8egan2seux/up.png");
  down = loadImage("https://dl.dropboxusercontent.com/s/m5ukbloh426k66f/down.png");
  left = loadImage("https://dl.dropboxusercontent.com/s/6k19qdmedmrfujc/left.png");
  right = loadImage("https://dl.dropboxusercontent.com/s/7y0xym3zxtpz3h0/right.png");
  bgm = loadSound("https://dl.dropboxusercontent.com/s/envcrhqqxmbnbsf/Aokigahara%20Puzzle%203.m4a");
  handPaper = loadImage ("https://dl.dropboxusercontent.com/s/fo5v4hg3eqjrhp2/handPaper.png");
  paper = loadImage("https://dl.dropboxusercontent.com/s/uktwivvfxhyqt8r/paper.png");
}

function setup () {
  createCanvas(800, 600);
  textAlign(CENTER);

  sliderVol = createSlider(0, 1, 0.0, 0.01);
  sliderVol.style('width', '800px');
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

//////////////////////
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
////////////////////////
  image(up, (width/2)-40, 0, 80, 80);
  //image(left,0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  image(down,(width/2)-40, 520, 80, 80);
}


function page03 () {
  background(180);
  nav ();

  if (downID < 40 && (stateOfPaper != 5 )) {
    ellipse(width/2,560,80,80);
    cursor(HAND);
  } else if (inPaperLocation == true) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

//////////////////////
  //image(up, (width/2)-40, 0, 80, 80);
  //image(left, 0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  image(down,(width/2)-40, 520, 80, 80);
}
function ID () {
  upID = sqrt(((mouseX-(width/2))*(mouseX-(width/2))) + ((mouseY-40)*(mouseY-40)));
  downID = sqrt(((mouseX-(width/2))*(mouseX-(width/2))) + ((mouseY-560)*(mouseY-560)));

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
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    image(handPaper,0,handPaperY, width, height);
    lock = false;
  }

  if (handPaperY == 0) {
    stateOfPaper = 5;
    image(paper,paperX,paperY, paperSizeX,paperSizeY);
    image(handPaper,0,handPaperY, width, height);
    lock = false;
  }

}


function mousePressed () {
  if (mouseIsPressed == true && upID < 40 && lock == false && (stateOfPaper != 5 )) {
    page = page + 1;
    //lock = true;
  }

  if (mouseIsPressed == true && downID < 40 && lock == false && (stateOfPaper != 5 )) {
    page = page - 1;
    //lock = true;
  }

  if (inPaperLocation == true && mouseIsPressed == true  && lock == false &&(page == 2 || stateOfPaper > 1)){
    stateOfPaper = stateOfPaper+1;
    //lock = true;
  }
}

function mouseReleased () {
  if (mouseIsReleased == true) {
    lock = false;
  }
}

function test () {
  fill(225,0,0);
  textSize(11);
  text("("+int(mouseX)+","+int(mouseY)+")", 40,20);
  text(int(stateOfPaper),40,40);
  text(lock,40,60);
}
