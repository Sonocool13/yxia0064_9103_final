# Individual code description

## How To Interact

The overall dynamics of the work are similar to a "breathing" effect: when the mouse is still, the animation moves slowly; when the mouse moves quickly, the animation changes more violently. The specific interactive effects are as follows:

- **Animation Playback Control via Button:** There is a button below the canvas, which initially displays "PAUSE". After clicking, the screen turns black, the animation pauses, the button color turns red and displays "PLAY", and a line of text "Animation Paused" that rotates continuously will appear in the center of the screen. Click the button again to resume the animation.

- **Number of Outer Triangles (`mouseY`):** When the mouse is close to the top of the canvas, the `mouseY` value is small and the number of triangles is small; when it is close to the bottom, the number increases.

- **Outer Circle Divergent Points (`mouseX`):** When `mouseX` is small, the points are concentrated in multiple circles; when the mouse moves horizontally, the dot matrix spreads and moves like a wave.

- **Main Visual Dynamics (`mouseX`):** The faster the mouse moves, the more obvious the dynamic change of the main visual element, which enhances the visual tension.

- **Diverging Line Angles (`mouseX`):** When the mouse moves horizontally, the angle of the lines will change randomly, increasing the dynamics and uncertainty of the picture.

- **Density of Central Random Points (`mouseX`):** When the value of `mouseX` changes, the random points in the central area will become denser or sparser.

## Details of My Individual Approach to Animating the Group Code

### Choice

I chose to use `Perlin noise` and `randomness` as the main drivers of my individual animation logic.

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

### Playback Control via Button

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
		button.mousePressed(togglePause);
	}

}

function draw(){
  	if (ifPaused) {
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
function ifPause() {
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

