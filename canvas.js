let thereminWidth;
let thereminHeight;

let playing = false;
let grainplaying = false;
let interactivesound = false;

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    canvas.position(0, 0);

    poseNetSetup();

    

}

function draw() {

    canvas.clear();

    // map hand movement to synth and draw keypoints
    if (poses.length > 0) {
        let handR = poses[0].pose.rightWrist;
        let handL = poses[0].pose.leftWrist;
        let nose = poses[0].pose.nose;
        let d = 30;

        if (typeof handR.x !== 'undefined') {

            // size of hand ellipse based on distance between hands
            if (handR.confidence > 0.05 && handL.confidence > 0.05) {
                d = int(dist(handR.x, handR.y, handL.x, handL.y));
            }

            // draw hands
            if (handR.confidence > 0.2) {
                rightHandX = map(handR.x, 0, 640, 0, width);
                rightHandY = map(handR.y, 0, 360, 0, height);

                leftHandX = map(handL.x, 0, 640, 0, width);
                leftHandY = map(handL.y, 0, 360, 0, height);

            }

            if(playing){

            }

            if(grainplaying){

            }

            if(interactivesound){
                // check boundaries of hand parameter scale
                 console.log("length audio buffer: " + audioBuffer.length);
            }

            console.log("x :"+handR.x +" y: "+handR.y);

        }
    }
}