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

var cLight = 0;
var lightHouse = [10,15,20,25,30,35,40,45,50,80,90,100];
var fastPulse = [10,30,60,80,100];
var gradual = [10,80,30,100,30,60,40,20,50,30,60,70];
var brightFlash = [80,80,80,100,80,80,80,80,80,100,80,80];
var inReverse = false;

function light(array) {
    print("light")
    if (cLight < array.length-1 && !inReverse) {
        cLight = cLight +1;
        mLit = array[cLight]    
    } else {
        inReverse = true
        cLight = cLight -1;
        mLit = array[cLight]
        if (cLight == 0) {
            inReverse = false;
        }
    }
}
var interval;
function keyPressed() { //this is called when a key is pressed
  if (key == 'A') {
    mLit = 0;
    clearInterval(interval)
    interval = setInterval(light,100,lightHouse)
  } else if (key == 'S') {
    clearInterval(interval)
    interval = setInterval(light,100,fastPulse)
  } else if (key == 'D') {
    clearInterval(interval)
    interval = setInterval(light,100,gradual)
  } else if (key == 'F') {
    clearInterval(interval)
    interval = setInterval(light,100,brightFlash)
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

function reverse2(arr) {
    var result = [],
       ii = arr.length;
   for (var i = ii - 1;i !== 0;i--) {
       result.push(arr[i]);
   }
   return result;
}

function draw() {
  //calcVolToSat();
  //keysToHue();
  
  // vol = mic.getLevel();
  // mSat = map(vol, 0, 1, 50, 100);
  
  background(mHue, mSat, mLit);
  //background(mHue, mSat, mLit);
}