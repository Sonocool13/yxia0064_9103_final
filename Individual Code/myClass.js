// Control all concentric circles with the same center and size.
class createMultipleCircle {
  constructor(centerX, centerY, centerSize) {
    this.x = centerX;
    this.y = centerY;
    this.size = centerSize;
  }

  // Draw the moon
  drawMoon() {
    noStroke();
    for (let j = 0; j < 3; j++) {
      if (j % 2 == 0) {
        fill(178, 46, 79);
      } else {
        fill(42, 47, 99);
      }
      let smallMoon = this.size / 6;
      circle(this.x - (this.size / 2 - (this.size - j * smallMoon) / 2), this.y, this.size - j * smallMoon);
    }
  }

  // Line made of circles
  lineCircle() {
    for (let j = 0; j < 360 / 2; j++) {
      let lineCircleX1 = cos(j * 2) * this.size / 2 * 1.32 + this.x;
      let lineCircleX2 = sin(j * 2) * this.size / 2 * 1.32 + this.y;
      if (random() > 0.0176) {
        fill(42, 46, 98, 50);
        circle(lineCircleX1, lineCircleX2, this.size / 100);
      } else {
        fill(42, 46, 98, 50);
        circle(lineCircleX1, lineCircleX2, random(this.size / 25, this.size / 13));
      }
    }
  }

  // A circle of dots between two circular lines
  decorationCircle() {
    fill(28, 53, 93);
    push();
    noStroke();
    noFill();
    let zhouSize = this.size * 1.075;
    circle(this.x, this.y, zhouSize);
    pop();

    push();
    strokeWeight(this.size / 200);
    stroke(28, 53, 93);
    noFill();
    circle(this.x, this.y, zhouSize * 0.97);
    pop();

    push();
    strokeWeight(this.size / 200);
    stroke(28, 53, 93);
    noFill();
    circle(this.x, this.y, zhouSize * 1.07);
    pop();

    for (let j = 0; j < 360 / 6; j++) {
      let decorationCircleX = cos(j * 6) * zhouSize / 1.95 + this.x;
      let decorationCircleY = sin(j * 6) * zhouSize / 1.95 + this.y;
      circle(decorationCircleX, decorationCircleY, this.size / 40);
    }
  }

  // Draw different triangles
  drawTriangle(d) {
    let drawTriangleAlpha = map(noise(frameCount / 50), 0, 1, 20, 80);
    noFill();
    stroke(28, 53, 93, drawTriangleAlpha);
    strokeWeight(this.size / 80);
    let sr = (this.size * 1.15) * 2;

    let points = [];
    beginShape();
    for (let j = 0; j < 4; j++) {
      let sx1 = cos(120 * j - d) * (sr / 2) + this.x;
      let sy1 = sin(120 * j - d) * (sr / 2) + this.y;
      if (j < 3) {
        points.push(createVector(sx1, sy1));
      }
      vertex(sx1, sy1);
      circle(sx1, sy1, noise(frameCount / 50, j * 10) * j * 20);
      push();
    }
    pop();
    endShape();
  }

  // Lines radiating from a circle
  drawLine() {
    let drawLineDegree = map(noise(mouseX / 1000), 0, 1, 15, 60);
    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < 30; i++) {
        push();
        let lengthFactor = map(i, 0, 30, 0.3, 1.3);
        let drawLineAlpha = map(i, 0, 30, 20, 100);
        let drawLineThick = map(i, 0, 30, 0.5, 2.5);
        stroke(166, 36, 81, drawLineAlpha);
        strokeWeight(drawLineThick);

        let noiseX = noise(i / 150, (frameCount / 40 + j));
        let noiseY = noise(i / 150, (frameCount / 40 + j));
        let x1 = cos(drawLineDegree * j - 67.5 - i * 2) * this.size * noiseX * 4 * lengthFactor + this.x;
        let y1 = sin(drawLineDegree * j - 67.5 - i * 2) * this.size * noiseY * 4 * lengthFactor + this.y;

        line(this.x, this.y, x1, y1);
        pop();
      }
    }
  }

  // The ordered points of the outermost circle
  diverPoint() {
    for (let j = 0; j < 360; j += 0.2) {
      for (let i = 0; i < 3; i++) {
        let diverPointSize = map(i, 0, 2, 50, 35);
        let pointAlpha = map(i, 0, 2, 0, 30);
        push();
        noStroke();
        fill(34, 62, 90, pointAlpha);

        let diverPointBaseR = this.size / 2.2;
        let diverPointnoise = map(noise(j / 50, i / 10, frameCount / 12000), 0, 1, 0.9, 1.1);
        let diverpointR = diverPointBaseR * diverPointnoise;

        let posNoise = map(noise(i / 10, j / 10 * mouseX / 500, frameCount / 10), 0, 1, 0.95, 1.35);
        let x1 = cos(j * 3) * diverpointR / 1.3 * (4 - i / 10) * posNoise + this.x;
        let y1 = sin(j * 3) * diverpointR / 1.3 * (4 - i / 10) * posNoise + this.y;

        circle(x1, y1, diverpointR / diverPointSize * 2);
        pop();
      }
    }
  }

  // Draw random points
  randomPoint() {
    push();
    let randomPointAlpha = map(noise(frameCount * 0.005), 0, 1, 20, 80);
    fill(178, 30, 80, randomPointAlpha);
    for (let j = 1; j < 35; j++) {
      for (let i = 0; i < 360; i += j / 4) {
        let dianR = map(j, 1, 100, this.size * 2.34 / 2, this.size / 2);
        let rNoise = noise(mouseX * 100 + j * 0.01, i / 50);
        let randomPointR = rNoise * this.size * 2.34 / 2 - dianR;

        let angleNoise = noise(frameCount / 1000 + j * 0.01, j / 100, i / 100);
        let randomPointAngle = angleNoise * i * 180 - j;

        let randomPointX = cos(randomPointAngle) * randomPointR + this.x;
        let randomPointY = sin(randomPointAngle) * randomPointR + this.y;

        noStroke();
        let randomPointSize = map(noise(i * 0.05, j * 0.05, frameCount * 0.05), 0, 1, this.size / 100, this.size / 40);
        circle(randomPointX, randomPointY, randomPointSize);
      }
    }
    pop();
  }
}
