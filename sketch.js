/*
Art 101 - 1.5 Classes - Example
Spring 2021 - Thompto
*/

//Create variable for UFOs
let myUfo;
let myUfo2;
let myUfo3;
let myUfo4;

//Create array for stars
let myStar = [];

//Create varible for key trigger
let keyTrig = 0;


/*
In setup(), we will create the desired instances of my UFO and Star classes.
In total, we will create 4 instances of the UFO class and 400 of the Star class.
*/

function setup() {
  
//Setup environment 
  createCanvas(400, 400);
  frameRate(60);
  noCursor();
  background(0);
  angleMode(DEGREES);
  
//Create all UFOs
  
  //Red UFO
  myUfo = new Ufo(color(255, 0, 0), width*(0.5), height*(0.5), 1);
  //Green UFO
  myUfo2 = new Ufo(color(0, 255, 0), width*(0.1), height*(0.25), -3);
  //Blue UFO
  myUfo3 = new Ufo(color(0, 0, 255), width*(0.7), height*(0.9), 1);
  //Grey UFO
  myUfo4 = new Ufo(color(125, 125 ,125), width*(0.15),height*(0.85), 1);
  
//Create all stars
  for (let i = 0; i < 400; i++) {
    myStar[i] = new star(random(0,width),random(0, height), random(0,3), random(-0.5,0.5), random(-0.5,0.5));
  }
} //end of setup()


/*
In the draw() function, we will be calling my display and movement functions
for each class. This are display(), move(), follower(), ramble(), and ramble2() 
for the UFOs and display() and shoot() for the stars. 
*/

function draw() {
//Refresh screen (required for smooth animation)
  background(0);
  
//Display all stars
  for (let i = 0; i < 400; i++) {
    myStar[i].display();
  }
  
//Display all UFOs

//Red UFO
  myUfo.display();
//Green UFO
  myUfo2.display();
//Blue UFO
  myUfo3.display();
//Grey UFO
  myUfo4.display();

//Movement of all UFOs
  myUfo.move();
  myUfo2.move();
  myUfo4.follower();
  myUfo3.ramble();

//Add ramble to the red UFO if a key is pressed.
  if (keyTrig === 1) {
    myUfo.ramble2();
  }
  
//Make every 10th star move
  for (let i = 0; i < 400; i++) {
    if(i % 10 == 0) {
      myStar[i].shoot();
    }
  }
} // end of draw()


//Trigger for turning the ramble function on and off by pressing "a".
function keyPressed() {
  if (key === 'a') {
    if (keyTrig === 0) {
      keyTrig = 1;
    } else {
      keyTrig = 0;
    }
  }
}


/*
Code for the UFO class.
Contains the constructor and all functions.
*/

class Ufo {
  
/*
The constructor function inside of a class creates the instance of the object
itself. You can think of it as a setup() function for the Ufo class only. It is 
where you will convert the passed in paramters into local varibles. 
*/
  
//Function to setup UFO class.
  constructor(c, xpos, ypos, xspeed) {
    this.c = c;
    this.xpos = xpos;
    this.ypos = ypos;
    this.xspeed = xspeed;
  }

/*  
After the constructor you can create your object level functions. In other words,
the functions you want to create the are specific to your object. 
*/

//Function to draw our UFO
  display() {
    noStroke();
    fill(this.c);
    ellipse(this.xpos, this.ypos-5, 20, 20)
    ellipse(this.xpos, this.ypos, 40, 15);
    fill(255, 227, 84);
    stroke(0);
    strokeWeight(0.5);
    ellipse(this.xpos, this.ypos-6.5, 5, 5);
    noFill();
    arc(this.xpos, this.ypos-4.5, 22, 11, -10, 190);
  }

//Function to the UFO left and right based on the xspeed parameter.
  move() {
    this.xpos = this.xpos + this.xspeed;
    //Reverse speed when UFO reaches the edge of the screen
    if (this.xpos > width+10 || this.xpos < -10) {
      this.xspeed = this.xspeed*-1;
    } 
  }
  
//Function to make the UFO ramble around the screen.
  ramble() {
    this.xpos = this.xpos + random(-1, 1)*this.xspeed;
    this.ypos = this.ypos + random(-1, 1)*this.xspeed;
    //Ensure UFO doesn't go off screen
    this.xpos = constrain(this.xpos, 0, width);
    this.ypos = constrain(this.ypos, 0, height);
  }
  
//Alternative ramble function impacting only the y dimension.
  ramble2() {
    this.ypos = this.ypos + random(-1, 1)*this.xspeed;
    this.ypos = constrain(this.ypos, 0, height);
  }
  
//Function to make the UFO follow the mouse position.
  follower() {
    this.xpos = mouseX;
    this.ypos = mouseY;
  }
} // end of UFO class 


/*
Code for the star class.
Contains the constructor and all functions.
*/

class star {
  
/*
You will notice here that I use some of the same variable and function names.
I am able to do this for variables because each instance of a class generates 
a new set of variables for that instance. I am able to do that with functions
because when I call an instance of a class, it references only the functions
defined within that class. 

In other words, display() means something different for a UFO than it does for
a star.
*/
  
//Function to setup star class.
  constructor(xpos, ypos, size, xspeed, yspeed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.size = size;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }
  
//Function to display a star.
  display() {
    noStroke();
    fill(255);
    ellipse(this.xpos, this.ypos, this.size)
  }
  
//Function to move a star.
  shoot() {
    this.xpos = this.xpos + this.xspeed;
    this.ypos = this.ypos + this.yspeed;
    //Reverse direction once star is off screen.
    if (this.xpos > width+20 || this.xpos < -20) {
      this.xspeed = this.xspeed*-1
    } 
    if (this.ypos > height+20 || this.xpos < -20) {
      this.yspeed = this.yspeed*-1;
    }
  }
} // end of star class