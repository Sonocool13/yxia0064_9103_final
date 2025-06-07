## How to Interact

The overall dynamics of the work are similar to a "breathing" effect: when the mouse is still, the animation moves slowly; when the mouse moves quickly, the animation changes more violently. The specific interactive effects are as follows:

1. **Animation Playback Control via Button:** There is a button below the canvas, which initially displays "PAUSE". After clicking, the screen turns black, the animation pauses, the button color turns red and displays "PLAY", and a line of text "Animation Paused" that rotates continuously will appear in the center of the screen. Click the button again to resume the animation.

2. **Number of Outer Triangles (`mouseY`):** When the mouse is close to the top of the canvas, the `mouseY` value is small and the number of triangles is small; when it is close to the bottom, the number increases.

3. **Outer Circle Divergent Points (`mouseX`):** When `mouseX` is small, the points are concentrated in multiple circles; when the mouse moves horizontally, the dot matrix spreads and moves like a wave.

4. **Main Visual Dynamics (Mouse Speed):** The faster the mouse moves, the more obvious the dynamic change of the main visual element, which enhances the visual tension.

5. **Diverging Line Angles (`mouseX`):** When the mouse moves horizontally, the angle of the lines will change randomly, increasing the dynamics and uncertainty of the picture.

6. **Density of Central Random Points (`mouseX`):** When the value of `mouseX` changes, the random points in the central area will become denser or sparser.

