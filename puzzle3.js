var page = 1;
var upID;
var downID;
var lock = false;

function preload () {
  bg01 = loadImage("https://dl.dropboxusercontent.com/s/5dhspqhfpn42d2f/bg01.jpeg");
  bg02 = loadImage("https://dl.dropboxusercontent.com/s/ovxrhqpmzm961si/bg02.png");
  up = loadImage("https://dl.dropboxusercontent.com/s/nahae8egan2seux/up.png");
  down = loadImage("https://dl.dropboxusercontent.com/s/m5ukbloh426k66f/down.png");
  left = loadImage("https://dl.dropboxusercontent.com/s/6k19qdmedmrfujc/left.png");
  right = loadImage("https://dl.dropboxusercontent.com/s/7y0xym3zxtpz3h0/right.png");
  bgm = loadSound("https://dl.dropboxusercontent.com/s/envcrhqqxmbnbsf/Aokigahara%20Puzzle%203.m4a");
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
  }

  if (upID < 40) {
    ellipse(width/2,40,80,80);
    if (mouseIsPressed == true){
      page = page + 1;
    }
  } else if (downID < 40) {
    ellipse(width/2,560,80,80);
    if (mouseIsPressed == true){
      page = page - 1;
    }
  }


  test();
}

function page01 () {
  image(bg01, 0, 0, 800, 600);
  if (upID < 40) {
      ellipse(width/2,40,80,80);
  }
  image(up, (width/2)-40, 0, 80, 80);
  //image(left, 0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  //image(down,(width/2)-40, 520, 80, 80);
}

function page02 () {
  image(bg02, 0, 0, 800, 600);

  //image(up, (width/2)-40, 0, 80, 80);
  //image(left,0, (height/2)-40, 80, 80);
  //image(right, 720, (height/2)-40, 80, 80);
  image(down,(width/2)-40, 520, 80, 80);
}

function ID () {
  upID = sqrt(((mouseX-(width/2))*(mouseX-(width/2))) + ((mouseY-40)*(mouseY-40)));
  downID = sqrt(((mouseX-(width/2))*(mouseX-(width/2))) + ((mouseY-560)*(mouseY-560)));
}

function mousePressed () {
  if (mouseIsPressed == true && upID < 40) {
    page = page + 1;
    lock = true;
  }

  if (mouseIsPressed == true && downID < 40) {
    page = page - 1;
    lock = true;
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
  text(int(upID),40,40);
  text(lock,40,60);
}
