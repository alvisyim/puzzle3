var part = 1;
var mapAX = 0;
var mapBX = 500;
var mapLocation = 1;

function preload () {
  bg01 = loadImage("https://dl.dropboxusercontent.com/s/5dhspqhfpn42d2f/bg01.jpeg");
  bgm = loadSound("https://dl.dropboxusercontent.com/s/envcrhqqxmbnbsf/Aokigahara%20Puzzle%203.m4a");
}

function setup () {
  createCanvas(800, 600);
  textAlign(CENTER);
  
  sliderVol = createSlider(0, 1, 0.0, 0.01);
  sliderVol.style('width', '800px');
}

function draw () {
  background(200);
  bgm.setVolume(sliderVol.value());
  if (bgm.isPlaying() == false) {
    bgm.play();
  }
  
  image(bg01, 0, 0, 800, 600);
  //tint(255, 128);
  
  
  fill(255);
  test();
}

function test () {
  fill(225);
  textSize(11);
}