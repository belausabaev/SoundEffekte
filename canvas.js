let thereminWidth;
let thereminHeight;

let playing = false;
let grainplaying = false;
let interactivesound = false;


let audioFile = "soundfiles/Theremin_Hauptstimme_sound.wav";
let audioFile2 = "soundfiles/guitar.wav";
let audioFile3 = "soundfiles/Beethoven-Mondscheinsonate-sound-part.wav";
let audioFile4 = "soundfiles/nevsky-theremin-part2.wav";


const sampleBuffer1 = new Tone.ToneAudioBuffer(audioFile, () => {
    console.log('loaded');
});
const sampleBuffer2 = new Tone.ToneAudioBuffer(audioFile2, () => {
    console.log('loaded');
});
const sampleBuffer3 = new Tone.ToneAudioBuffer(audioFile3, () => {
    console.log('loaded');
});
const sampleBuffer4 = new Tone.ToneAudioBuffer(audioFile4, () => {
    console.log('loaded');
});

const audioBuffer = new Tone.ToneBufferSource(audioFile4, () => {
    console.log('loaded');
    grainBuffer.buffer = audioBuffer.buffer;
  }).toDestination();

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
                 console.log("length audio buffer: " + audioBuffer.buffer.length);
            }

            let audioLenInSec = audioBuffer.buffer.length/Tone.getContext().rawContext.sampleRate;

            console.log("x :"+handR.x +" y: "+handR.y);
            /*
            handPos = y
            audioLength = y
            handPosPossible = video.height
            audioPos = ?
            */

            //
            //Tone.setContext(new Tone.Context(new Tone.context.rawContext.constructor({ sampleRate: 96000 })))
            console.log("sample rate "+Tone.getContext().rawContext.sampleRate);
            console.log("audio file length in seconds "+audioBuffer.buffer.length/Tone.getContext().rawContext.sampleRate);
            console.log("audio file length in samples "+audioBuffer.buffer.length);
            //y/video.height * audiolenght??
            //x/audioLength 
            // height of webcam video = max value of hand y 
            let handPercent = handR.y / (360/100) // percent hand height wrt video height
            let audioPercent = (audioBuffer.buffer.length /100);
            console.log("right hand y " +handR.y);
            console.log("hand perc " +handPercent);
            console.log("audio lenght sec wrt hand percent " +(audioPercent * handPercent)/Tone.getContext().rawContext.sampleRate);
            let audioPercToHand = (audioPercent * handPercent)/Tone.getContext().rawContext.sampleRate;
            let ticks = clock.getTicksAtTime();
            console.log("ticks "+ticks);
            
            //clock.stop("+2");
        }
    }
}