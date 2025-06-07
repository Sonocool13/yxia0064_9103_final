# Individual code description

## How To Interact

The overall dynamics of the work are similar to a "breathing" effect: when the mouse is still, the animation moves slowly; when the mouse moves quickly, the animation changes more violently. The specific interactive effects are as follows:

- **Animation Playback Control via Button:** There is a button below the canvas, which initially displays "PAUSE". After clicking, the screen turns black, the animation pauses, the button color turns red and displays "PLAY", and a line of text "Animation Paused" that rotates continuously will appear in the center of the screen. Click the button again to resume the animation.

- **Main Visual Dynamics (`mouseX`):** The faster the mouse moves, the more obvious the dynamic change of the main visual element, which enhances the visual tension.

- **Number of Circumscribed Triangles (`mouseY`):** When the mouse is close to the top of the canvas, the `mouseY` value is small and the number of triangles is small; when it is close to the bottom, the number increases.

- **Outer Circle Divergent Points (`mouseX`):** When `mouseX` is small, the points are concentrated in multiple circles; when the mouse moves horizontally, the dot matrix spreads and moves like a wave.

- **Diverging Line Angles (`mouseX`):** When the mouse moves horizontally, the angle of the lines will change randomly, increasing the dynamics and uncertainty of the picture.

- **Density of Central Random Points (`mouseX`):** When the value of `mouseX` changes, the random points in the central area will become denser or sparser.

## Details of My Individual Approach to Animating the Group Code

### Choice

I chose to use **Perlin noise and randomness** as the main drivers of my individual animation logic.

### Features of My Code

I developed the overall design around a **"breathing" sensation**. The main visual elements expand and contract slowly, mimicking a calm breathing rhythm. Meanwhile, I applied rhythmic motion to both the random points in the center and the divergent points on the outer circle, resulting in a visual that feels soft and organic.

Additionally, I introduced length variations to the background divergent lines, allowing them to change gradually within a specific range to enhance subtle visual dynamism. I also added a **rotating circumscribed triangle at the center. Through a combination of consistent rotation and slight irregular jittering, the composition gains a richer sense of depth and motion.

To further enhance interactivity, I linked these animation parameters to `mouseX` and `mouseY`. The real-time mouse movement directly influences the degree of animation change, enabling the entire canvas to react smoothly and provide stronger visual feedback during interaction.

Finally, considering the group's original black-and-white color palette appeared a bit monotonous during motion, I introduced a healing color scheme to the animation. This makes the visual experience more gentle, soothing, and emotionally engaging.

## Inspiration

My work is mainly inspired by the following two visual references:

- **Figure 1:** The rhythmic lines in this image inspired me to build a wave-like line structure by combining multiple circles positioned at different coordinates. This structure conveys a sense of rhythm, as if the entire picture is "breathing". To recreate this feeling, I used the `noise()` function to control the positions of the small circles and applied a `for` loop to generate a layered, animated effect.

- **Figure 2:** This image presents a radial composition with a strong sense of space and direction. It features a dense arrangement of dot elements at the center and regularly spaced lines radiating outward. I drew from this visual form to structure the divergent lines in my work with more regularity. I also allowed the line lengths to change over time, and added movement to the decorative dots in the center to enhance visual richness.

These two references provided inspiration not only for rhythm and spatial composition but also helped clarify how to balance "order and randomness" in animation to produce visuals that feel both dynamic and harmonious.

![Figure 1](ReadmeImages/Figure1.jpg)

**Figure 1**
[Source](https://www.pinterest.com/pin/1001839879614861818/)

![Figure 2](ReadmeImages/Figure2.jpg)

**Figure 2**
[Source](https://www.pinterest.com/pin/1001839879614863309/)

 ## Technical Explanation

### Animation Playback Control via Button

The principle of the button is to set its default style in the `setup()` function. A Boolean variable `isPaused` is used to manage the animation state. In the `ifPaused()` function, each button click toggles the value of `isPaused`, switching between the paused and playing states. Based on the current state, the button updates its style and label (e.g., changing color and text between `"PAUSE"` and `"PLAY"`). In the `draw()` function, this state determines whether the animation continues to play or a paused message is displayed, effectively enabling playback control through user interaction.

The style effect refers to [the p5js style](https://p5js.org/reference/p5.Element/style/).

```
function setup() {
	if (!button) {
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

}

function draw(){
  	if (isPaused) {
		background(0)
		fill(255);
		textSize(32);
		textAlign(CENTER, CENTER);
		text("Animation Paused", 0, 0);

	}
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	draw();
	button.position((width - button.width) / 2, height * 0.9);
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

```

### Main Visual Dynamics (`mouseX`)

The main visual element's size is dynamically controlled using the `noise()` and `map()` functions inside the `draw()` loop. A variable `timeFactor` increments on each frame to introduce time-based variation, while `mouseX` is used as a second input to `noise()` to make the animation responsive to horizontal mouse movement.

The value returned by `noise()` (ranging from `0` to `1`) is mapped to a fixed range between `200` and `400` using `map()`, which determines the diameter of the main element. This approach enables the element to smoothly grow and shrink over time and interaction, creating a natural, breathing-like motion.

```
let timeFactor = 0;

function draw() {
	timeFactor += 10;

	background(139, 15, 92);
	push();
	translate(width / 2, height / 2);

	// Keep the diameter of the subject element between 200 and 400
	let scale = map(noise(mouseX * 0.003, timeFactor * 0.005), 0, 1, 200, 400);
	let totalR = scale;

	// Draw all the concentric circles
	coreElements = new createMutipleCircle(0, 0, totalR);
}
```
### Number of Circumscribed Triangles (`mouseY`)

The circumscribed triangle is implemented by the `drawTriangle(d)` function inside a custom class, where the parameter `d` controls the rotation angle of each triangle. The number of triangles is dynamically determined by the `mouseY` value in the `draw()` function. Specifically, `mouseY` adjusts the number of iterations of the loop variable `i`, which in turn determines how many times `drawTriangle()` is called. This directly controls the number of circumscribed triangles rendered on the canvas.

```
function draw(){
  // Draw all the concentric circles
	coreElements = new createMutipleCircle(0, 0, totalR);
	push();
	rotate(frameCount);
	//The number of triangles is determined by mouseY
	for (let i = 0; i < mouseY / 100; i++) {
		coreElements.drawTriangle(i * 36);
	}
	pop();

}

class createMutipleCircle {
  constructor(centerX, centerY, centerSize) {
    this.x = centerX;
    this.y = centerY;
    this.size = centerSize;
  }
  // Draw different triangles
  drawTriangle(d) {
    let drawTriangleApha = map(noise(frameCount / 50), 0, 1, 20, 80);
    noFill();
    stroke(28, 53, 93, drawTriangleApha);
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
}
```
### Playback Control via Button

```
function setup() {
  
}
function draw() {

}
```
### Playback Control via Button

```
function setup() {
  
}
function draw() {

}
```
### Playback Control via Button

```
function setup() {
  
}
function draw() {

}
```

