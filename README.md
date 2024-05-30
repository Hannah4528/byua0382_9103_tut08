# Major project (Binbin Yuan - byua0382)

## 1. Description of the work's interaction
By clicking the play/Pause button, the music will start playing and the image will move to the rhythm of the music. Click the button again to stop the music and the image movement.

## 2. Individual animation methods

### 2.1 Animation Driver Selection
I choose **music** as the driving factor for the animation. The animation will change dynamically according to the rhythm and intensity of the audio.

### 2.2 Image Animation Properties
The size of the **centre circle will get bigger or smaller** as the intensity of the music changes, and the angle of **rotation of the pink arc** will change with the beat of the music.

### 2.3 Inspiration Reference
I was inspired by audio visualisation pieces. These works usually appear as relaxing videos on YouTube or in music apps that provide users with a customised music visualisation experience to enhance the pleasure of music listening. These types of works take the spectral data of audio and transform it into visual elements such as colours, shapes and movement to better show the rhythm, emotion and structure of the music.
Here is one of the inspiration video from Youtube: [Youtube - Music Visualisation](https://www.youtube.com/watch?v=lBojAa7jNFI)

### 2.4 Technical explanation
#### Buttons to control music play pause
- First, create the button using the **createButton()** method in the setup function. After that modify the position of the button and update the position of the button in **windowResized()** to make it fit the screen size. 
- The button style change references the method in this link. [p5 reference - style](https://p5js.org/reference/#/p5.Element/style)
- Load the music file using the **preload()** function. And set action events on the button, mousePressed and mouseReleased. the former calls **play_pause()** to loop the music. The latter sets the colour change when the button is released via the **style()** method.
- The main code is as follows:
```
button = createButton("Play / Pause");
button.position((width - button.width) / 2, height - button.height - 30);

button.mousePressed(play_pause);
button.mouseReleased(reset_button_color);
```

#### Graphics change with the music
1. The pink arcs rotate with the spectrum data
- First initialise the **fft object** in the setup function and connect it to the audio.
- In the draw function, the spectrum data is obtained by calling **fft.analyze()**, and the map function is used to map one of the bands in the spectrum data (spectrum[0]) to the rotation angle **rotationAngle**. (reference from Chatgpt)
- This rotation angle is then added to the angle property of each mediumCircle. This way, when the music is played, the medium-sized circles will rotate with the spectrum data, driving the pink arcs within them to rotate together.
- The main code is as follows:
```
let spectrum = fft.analyze();
let rotationAngle = map(spectrum[0], 0, 255, 0, 360);

if (song.isPlaying()) {
    for (const mediumCircle of mediumCircles){
        mediumCircle.angle += rotationAngle;
        mediumCircle.display(scale);
    }
}
```
2. The dots in the big circle zoom in and out to the music.
- Add a **parameter spectrum** to the draw method of the CirclePattern class to determine if the song is playing. And introduce an **adjustedDiameter variable**.(reference from Chatgpt)
- When spectrum data exists, use the value of spectrum[0] to adjust adjustedDiameter dynamically, use adjustedDiameter to draw the small circle, but not change the original smallCircleDiameter.
- The main code is as follows:
```
draw(scale, spectrum = null) {
    let adjustedDiameter = this.smallCircleDiameter;
    if (spectrum) {
      let freqValue = spectrum[0];
      adjustedDiameter = map(freqValue, 0, 255, this.smallCircleDiameter, this.smallCircleDiameter * 2);
    }

    this.drawBigCircle(scale);
    this.drawSmallCircles(scale, adjustedDiameter);
  }
  ```