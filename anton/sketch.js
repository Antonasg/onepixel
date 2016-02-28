var mHue = 50; //hue
var mSat = 50; //saturation
var mLit = 80; //lightness

var numColors = 4;
var colorVals = new Array(10, 50, 200, 275);
var colorKeys = new Array('C', 'G', 'Z', 'O');
var colorPressed = new Array(false, false, false, false);

function setup() {
  createCanvas(600, 480);
  
  colorMode(HSB);
  
   // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function calcVolToSat(){
  var vol = mic.getLevel();
  mSat = map(vol, 0, 1, 50, 100);
}

function keysToHue(){
  var sum =0;
  var avg =0;
  var cnt =0;
  for(var i = 0; i < numColors; i++){
    if(colorPressed[i]){
      sum += colorVals[i];
      cnt++;
    }
  }
  
  avg = sum/cnt;
  mHue = avg;
}
function keyPressed() { //this is called when a key is pressed
  if (key == 'A') {
    print("THIS FUNCITON"+key);  
      mLit = 10;
      //background(mHue, mSat, mLit);
      //draw();
  } 
  for(var i = 0; i < numColors; i++){
    print("key "+key);
    if(key === colorKeys[i]){
      print("check");
      colorPressed[i] = true;
    }
  }
}
function keyReleased() { //this is called when a key is released 
  for(var i = 0; i < numColors; i++){
    if(key === colorKeys[i]){
      colorPressed[i] = false;
    }
  }
  
  return false; // prevent any default browser behavior
}

function draw() {
  calcVolToSat();
  keysToHue();
  
  // vol = mic.getLevel();
  // mSat = map(vol, 0, 1, 50, 100);
  
  background(mHue, mSat, mLit);
  //background(mHue, mSat, mLit);
}