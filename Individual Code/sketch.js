let coreElements = [];
let starDegree = 45;
let overallTexture;
let timeFactor = 0;
let isPaused = false;
let button;
let starPoints = []

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	background(139, 15, 92);
	angleMode(DEGREES);
	//Background with random little stars
	for (let i = 0; i <= 250; i++) {

		starPoints.push(createVector(random(width), random(height), random(0, width / 300)));
	}
	// create button
	button = createButton("PAUSE");
	button.style('width', '100px');
	button.style('height', '40px');
	button.position((width - button.width) / 2, height * 0.9);
	button.style("font-size", "16px");
	button.style("padding", "6px 12px");
	button.style("background-color", "#666");
	button.style("color", "#fff");
	button.mousePressed(ifPaused);
}

function draw() {
	timeFactor += 10;

	background(139, 15, 92);

	for (let o of starPoints) {
		noStroke()
		fill(42, 70, 100, 80)
		circle(o.x, o.y, o.z)
	}

	push();
	translate(width / 2, height / 2);

	// Keep the diameter of the subject element between 200 and 400
	let scale = map(noise(mouseX * 0.003, timeFactor * 0.005), 0, 1, 200, 400);
	let totalR = scale;

	// Draw all the concentric circles
	coreElements = new createMultipleCircle(0, 0, totalR);

	coreElements.drawLine();
	coreElements.diverPoint();
	coreElements.randomPoint();
	// coreElements.drawTriangle(-90);
	coreElements.drawMoon();
	// coreElements.lineCircle();
	coreElements.decorationCircle();

	// Draw the star in the middle
	drawStar(-totalR / 9, 0, totalR / 9, 0);

	push();
	rotate(frameCount);
	for (let i = 0; i < mouseY / 100; i++) {
		coreElements.drawTriangle(i * 36);
	}
	pop();
	pop();

	if (isPaused) {
		background(0)
		fill(255);
		textSize(32);
		textAlign(CENTER, CENTER);
		text("Animation Paused", 0, 0);

	}
}

// As the canvas size changes
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	button.position((width - button.width) / 2, height * 0.9);
	setup();
}
function ifPaused() {
	isPaused = !isPaused;
	if (isPaused) {
		button.html("PLAY");
		button.style("background-color", "red");
	} else {
		button.html("PAUSE");
		button.style("background-color", "#666");
	}
}