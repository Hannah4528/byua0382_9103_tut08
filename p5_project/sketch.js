let mediumCircles = [];
const numMedumCircles = 100;
const circleRadius = 90;

const spacing = 220; 

let circleBorders = [];
let circleBorders2 = [];
const numBorders = 100; 

let bigCircles = [];
const numBigCircles  = 100;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);

  initialMediumCircles();
  initializeBorders();
  initializeCirclePattern();
}

function draw() {
  background(207, 82, 35);

  // Calculate the scaling
  let minDimension = min(windowWidth, windowHeight);
  let scale = minDimension / 600; 

  //colourful chain
  for (const border of circleBorders) {
    border.display(scale);
  }

  for (const border2 of circleBorders2) {
    border2.display(scale);
  }

  //big circle
  for (const bigCircle of bigCircles) {
    bigCircle.draw(scale);
  }

  //medium-sized circle with pink arc
  for (const mediumCircle of mediumCircles){
    mediumCircle.display(scale);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// -----------------------------medium-sized circle with pink arc--------------------------------
function initialMediumCircles() {
  mediumCircles = [];
  let x = 60;
  let y = 50;
  let yOffset = 0; //make it lean

  for (let i = 0; i < numMedumCircles; i++) {
    // If the next circle would exceed the width of the canvas, 
    // it moves to the next row.
    if (x - 8*circleRadius > width) {
      x = 60;
      y += spacing;
      yOffset = 0; // Reset yOffset for new row
    }

    let mediumCircle = new MediumCircle(x,y-yOffset,circleRadius,random(360));

    mediumCircles.push(mediumCircle);
    x += spacing;
    yOffset += 30; // Increase yOffset for next circle
  }
}

// This class implements the medium-sized circles 
// that appear in the middle of each large circle
class MediumCircle {
  constructor(x, y, radius, angle) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.colours = this.generateColours();
  }

  // Generate an array of colours
  generateColours() {
    let colours = [];
    for (let i = 0; i < 10; i++) {
      colours.push(color(random(360), 60, 100));
    }
    return colours;
  }

  //Here the code is optimised with the help of chatgpt
  //Multiply the scaling wherever the position and size properties are concerned.
  display(scale) {
    let scaledX = this.x * scale;
    let scaledY = this.y * scale;
    let scaledRadius = this.radius * scale;

    // Circle
    push();
    translate(scaledX, scaledY);
    rotate(this.angle);

      push();
      noFill();
      strokeWeight(10* scale);

      for (let i = 0; i < 10; i++) {
        stroke(this.colours[i]);
        circle(0, 0, scaledRadius - i * 10);
      }

      // Small black circle
      strokeWeight(4* scale);
      stroke(20);
      circle(0, 0, scaledRadius/ 3);

      // Light green circle in the middle
      fill(91, 21, 90);
      noStroke();
      circle(0, 0, scaledRadius/ 7);

      pop();

    // Pink Arc
    noFill();
    strokeWeight(4* scale);
    stroke(342, 48, 89);
    arc(76* scale, -2, scaledRadius * 1.7, scaledRadius * 2, 178, 272);

    strokeWeight(2);
    stroke(3, 71, 77);
    arc(78* scale, 0, scaledRadius * 1.7, scaledRadius * 2, 180, 270);

    pop();
  }
}


//------------------------------------colourful chain-----------------------------------------
function initializeBorders() {
  circleBorders = [];
  circleBorders2 = [];

  let x = 60;
  let y = 50;
  let yOffset = 0;

  for (let i = 0; i < numBorders; i++) {

    if (x - 4*circleRadius> width) {
      x = 60;
      y += spacing;
      yOffset = 0; 
    }
    
    // Creating coloured dot borders
    let border = new CircleBorder(x, y - yOffset, 70, 40, 40); // spacing set to 40 to widen the gap
    circleBorders.push(border);

    // Create a black dot border
    let border2 = new CircleBorder2(x, y - yOffset, 65, 12, 40); // Offset the position of the black dot by 10
    circleBorders2.push(border2);

    x += spacing;
    yOffset += 30; 
  }
}



class CircleBorder {
  constructor(x, y, bigRadius, numDots, spacing) {
    this.x = x;
    this.y = y;
    this.bigRadius = bigRadius;
    this.numDots = numDots; // Number of coloured dots
    this.spacing = spacing;
    this.dots = this.generateDots();
  }

  generateDots() {
    let dots = [];
    let angleStep = 360 / this.numDots;

    for (let i = 0; i < this.numDots; i++) {
      let angle = i * angleStep;
      let dotX = this.x + cos(angle) * (this.bigRadius + this.spacing);
      let dotY = this.y + sin(angle) * (this.bigRadius + this.spacing);
      let dotRadius = 7; // Fixed radius
      let dotStrokeWeight = 2; // Fixed border width
      dots.push({ x: dotX, y: dotY, radius: dotRadius, strokeWeight: dotStrokeWeight, color: color(random(255), random(255), random(255)) });
    }

    return dots;
  }

  display(scale) {
    for (const dot of this.dots) {
      this.drawDot(dot.x* scale, dot.y* scale, dot.radius* scale, dot.strokeWeight* scale, dot.color);
    }
  }

  drawDot(x, y, radius, strokeWeightValue, color) {
    stroke(22, 79, 92); // Border colour is orange
    strokeWeight(strokeWeightValue); // Fixed border width
    fill(color); // Random colour fill
    ellipse(x, y, radius * 2);
  }
}

class CircleBorder2 {
  constructor(x, y, bigRadius, numDots, offset) {
    this.x = x;
    this.y = y;
    this.bigRadius = bigRadius;
    this.numDots = numDots; // Number of black dots
    this.offset = offset;
    this.dots = this.generateDots();
  }

  generateDots() {
    let dots = [];
    let angleStep = 360 / this.numDots;

    for (let i = 0; i < this.numDots; i++) {
      let angle = i * angleStep + angleStep / 2; // angular offset
      let dotX = this.x + cos(angle) * (this.bigRadius + this.offset);
      let dotY = this.y + sin(angle) * (this.bigRadius + this.offset);
      let dotRadius = 10; 
      let dotStrokeWeight = 2; 
      dots.push({ x: dotX, y: dotY, radius: dotRadius, strokeWeight: dotStrokeWeight });
    }

    return dots;
  }

  display(scale) {
    for (const dot of this.dots) {
      this.drawDot(dot.x* scale, dot.y* scale, dot.radius* scale, dot.strokeWeight* scale);
    }
  }

  drawDot(x, y, radius, strokeWeightValue) {
    stroke(22, 79, 92); 
    strokeWeight(3* scale); 
    fill(0); 
    ellipse(x, y, radius * 2.3);
    
    fill(255);
    stroke(0,0,0);
    ellipse(x, y, radius*1.4);
  }
}

//----------------------------------big circle---------------------------------
function initializeCirclePattern() {
  bigCircles = [];
  let x = 60;
  let y = 50;

  let smallCircleDiameter = 6;
  let rings = 10;
  

  let yOffset = 0;
  
  for (let i = 0; i < numBigCircles; i++) {

    if (x - 8*circleRadius> width) {
    x = 60;
    y += spacing;
    yOffset = 0;
    }

    let bigCircleColor = getRandomColor();
    let smallCircleColor = getRandomColor();

    let bigCircle = new CirclePattern(x, y-yOffset, smallCircleDiameter, rings, bigCircleColor, smallCircleColor);

    bigCircles.push(bigCircle);
    x += spacing;
    yOffset += 30; 
  }
  
}

class CirclePattern {
  constructor(x, y, smallCircleDiameter, rings, bigCircleColor, smallCircleColor) {
    this.x = x;
    this.y = y;
    this.smallCircleDiameter = smallCircleDiameter;
    this.rings = rings;
    this.bigCircleColor = bigCircleColor;
    this.smallCircleColor = smallCircleColor;
  }

  draw(scale) {
    this.drawBigCircle(scale);
    this.drawSmallCircles(scale);
  }

  drawBigCircle(scale) {
    noStroke();
    fill(this.bigCircleColor);
    let bigCircleDiameter = (this.rings - 1.5) * this.smallCircleDiameter * 3.6* scale;
    ellipse(this.x* scale, this.y* scale, bigCircleDiameter);
  }

  drawSmallCircles(scale) {
    for (let r = 0; r < this.rings; r++) {
      let radius = (r + 1.5) * this.smallCircleDiameter * 1.4* scale;
      let numSmallCircles = 1 + r * 8;
      for (let i = 0; i < numSmallCircles; i++) {
        let angle = 360 / numSmallCircles * i;
        let x = this.x* scale + radius * cos(angle);
        let y = this.y* scale+ radius * sin(angle);
        fill(this.smallCircleColor);
        ellipse(x, y, this.smallCircleDiameter* scale);
      }
    }
  }
}

function getRandomColor() {
  return color(random(360), 60, 100);
}