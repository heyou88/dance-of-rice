let hole1;
let hole2;

let ricecorns = [];
var num = 60;
function setup() {
  //createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  hole1 = new Hole(width/2, height/2, 320, 0);
    hole2 = new Hole(width/2, height/2, 340, 180); 
}
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  background(0); 
 hole1.update();
  hole1.display();
  hole2.update();
  hole2.display();
  for(let i = 0; i < ricecorns.length; i++){
    ricecorns[i].update();
    ricecorns[i].display();
  }
  if(ricecorns.length > 1000){
  //for(let i = 0; i < ricecorns.length - 5; i++){
//ricecorns.shift();
    ricecorns = []
}
  print(ricecorns.length);
}
class Hole{
  constructor(cX, cY, radius, startingAngle){
    this.centerX = cX;
    this.centerY = cY+20;
    this.r = radius;
    this.angle = startingAngle;
    this.x = this.centerX + cos(radians(this.angle)) * this.r;
    this.y = this.centerY + sin(radians(this.angle)) * this.r;
    this.speed = 3;
  }
  update(){
    this.angle += this.speed;
    this.x = this.centerX + cos(radians(this.angle)) * this.r;
     this.y = this.centerY + sin(radians(this.angle)) * this.r;
    
     //produce rice sometimes:
    if(random()<0.08){
      ricecorns.push( new Rice(this.x, this.y, this.angle) )
      
    }
  }
  display(){
    push();
    translate(this.x, this.y);
    noStroke();
    fill(0)
    circle(0, 0, 10)
    pop();
  }
}
class Rice{
  constructor(cx, cy, a){
    this.startingX = cx;
    this.startingY = cy;
    this.x = this.startingX;
    this.y = this.startingY;
    this.fallingRadius = 0; // they fall away from the hole
    this.radiusFallingSpeed = random(-5,5); // how fast to fly awway from the hole;
    this.angle = a;
    //this.size = 48;
    this.startingHeight = 100;
    this.height = this.startingHeight; // falling height
    this.downwardsSpeed = 1; // could do more accuarte gravity here 
    this.Degree = random(0,360);
  }
  update(){
    if(this.height > 0){
      if(this.height<this.downwardsSpeed){
        this.height = 0;
      }else{
        this.height -= this.downwardsSpeed;
      }
      this.downwardsSpeed *= 1.01; // could do more accuarte gravity here 
      this.x = this.startingX + cos(radians(this.angle)) * this.fallingRadius;
      this.y = this.startingY + sin(radians(this.angle)) * this.fallingRadius;
      this.fallingRadius += this.radiusFallingSpeed;
      this.radiusFallingSpeed*=0.95; // this should decrease, eventually they only fall down, not sideways anymore  
    }
    //this.size = map(this.height, this.startingHeight, 0, 10, 5)
    //this.size = 10
  }
  display(){
    push();
    translate(this.x, this.y)
    //noStroke();
    stroke(10)
    fill(255)
    rotate( this.Degree);
   ellipse(0, 0, 25,7)
    pop();
  } 
}
