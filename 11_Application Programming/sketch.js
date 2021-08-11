


let serial;                             // variable to hold an instance of the serialport library
let latestData = "waiting for data";                             // for incoming serial data

function setup() {
  createCanvas(700, 700);
//serial constructor
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  
  
  serial.open('/dev/tty.usbmodem101');       
  //serial port to use, change to the one you use
  
  serial.on('data', gotData);
//what to do when we get the data
  
  
}



function gotData() {
  let currentString = serial.readLine(); // store the data in a variable
  trim(currentString); //get rid of white space
  if (!currentString) return; //if nothing than ignore
  console.log(currentString);
  latestData = currentString;
}

function draw() {
  background(135, 206, 235);
  //ground
  noStroke();
  fill(0, 128, 0);
  rect(0, 370, width, height/2);
  
  fill(0, 0, 0);
  text(latestData, 10, 10); //print data to the sketch
  
  let xpos = map(latestData, 0, 1023, 50, 650);
  let ypos = map(latestData, 0, 1023, 370, 650);
  let opa = map(latestData, 0, 1023, 0, 255); 
  //robot
  fill(240,240, 120, opa);
  ellipse(xpos, ypos, 30, 30);
  
  fill(0, 255, 255, opa);
  rect(xpos-15, ypos, 30, 30);
  
  //wheel
  fill(0, 0, 0, opa);
  ellipse(xpos, ypos+30, 15, 15);
  fill(255, 255, 255, opa);
  ellipse(xpos, ypos+30, 8, 8);
  
 
}