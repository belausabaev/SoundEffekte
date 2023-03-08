let thereminWidth;
let thereminHeight;

let playing = false;
let grainplaying = false;
let interactivesound = false;

Tone.getContext().rawContext.suspend();

/*
let audioFile = "soundfiles/Theremin_Hauptstimme_sound.wav";
let audioFile2 = "soundfiles/guitar.wav";
let audioFile3 = "soundfiles/Beethoven-Mondscheinsonate-sound-part.wav";
let audioFile4 = "soundfiles/nevsky-theremin-part2.wav";
*/

let audioFile = "soundfiles/birdsnearwater.wav";
let audioFile2 = "soundfiles/boatpassing.wav";
let audioFile3 = "soundfiles/boatpassinghydrophone.wav";
let audioFile4 = "soundfiles/dryleaves.wav";
let audioFile5 = "soundfiles/dryleaveseq.wav";
let audioFile6 = "soundfiles/riverambiencebirds.wav";
let audioFile7 = "soundfiles/riverwater.wav";


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
const sampleBuffer5 = new Tone.ToneAudioBuffer(audioFile5, () => {
    console.log('loaded');
});
const sampleBuffer6 = new Tone.ToneAudioBuffer(audioFile6, () => {
    console.log('loaded');
});
const sampleBuffer7 = new Tone.ToneAudioBuffer(audioFile7, () => {
    console.log('loaded');
});

const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
    console.log('loaded');
    grainBuffer.buffer = audioBuffer.buffer;
}).toDestination();

audioBuffer.loop = true;

grainSize = 0.08; // clock geschwindigkeit einfluss
playbackRate = 0.1; // the grain is scheduled every x seconds
overlap = 0.5; // wie verbunden die grains klingen
detune = 500;

let fbdelay;

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

            if (playing) {

            }

            if (grainplaying) {

            }

            if (interactivesound) {
             }

            let audioLenInSec = audioBuffer.buffer.length / Tone.getContext().rawContext.sampleRate;

        

            // set sample rate of tone js audio context
            //Tone.setContext(new Tone.Context(new Tone.context.rawContext.constructor({ sampleRate: 96000 })))
            //    console.log("sample rate "+Tone.getContext().rawContext.sampleRate);
            //    console.log("audio file length in seconds "+audioBuffer.buffer.length/Tone.getContext().rawContext.sampleRate);
            //    console.log("audio file length in samples "+audioBuffer.buffer.length);
            //y/video.height * audiolenght??
            //x/audioLength 
            // height of webcam video = max value of hand y 
            let handPercent = handR.y / (360 / 100) // percent hand height wrt video height
            let audioPercent = (audioBuffer.buffer.length / 100);
            //    console.log("right hand y " +handR.y);
            //     console.log("hand perc " +handPercent);
            //    console.log("audio lenght sec wrt hand percent " +(audioPercent * handPercent)/Tone.getContext().rawContext.sampleRate);
            let audioPercToHand = (audioPercent * handPercent) / Tone.getContext().rawContext.sampleRate;

       //     let ticksinDraw = clock.getTicksAtTime(Tone.now()); // when clock is paused ticks stays the same
            //    console.log("ticks in clock "+ticks);
            //          console.log("ticks in draw "+ticksinDraw);
      //      let curTicks = clock.toTicks(audioPercToHand);
            //    console.log("cur ticks "+curTicks);
            //clock.start(Tone.now(),curTicks);
            //           console.log("audio len to hand pos "+audioPercToHand);
            // eine Melodie in Form von Bewegung ausdrücken
            if (audioPercToHand > audioLenInSec) {
                //hand movement is outside the valid range
                clock.pause();
             }
            else if (audioPercToHand < 0) {
                clock.pause();
            }
            else if (audioPercToHand < audioLenInSec) {
                // movement is within valid audio length range
                //where is the hand in audio file
                let fb = map(audioPercToHand, 0, audioLenInSec, 0, 1);
                console.log("feedback " + fb);
                // dont apply any feedback delay if hand is super high up 
                if (fb <= 0.3) {
                    fbdelay = null;
                }
                // apply feedback delay 9 (definition in player.js) if hand is between 0.3 and o.5
                else if(fb > 0.3 && fb <= 0.5){
                    //fbdelay = fbd1;
                    fbdelay = feedbackDelay9;
                }
                // set fbdelay to 1 if hand is between 0.5 and 0.7, see condition in player.js
                else if (fb > 0.5 && fb <= 0.7) {
                    fbdelay = 1;
                }
                // in all other cases set fbdelay 2, see condition in player.js
                // for example greater 0.7, 
                else  {
                    fbdelay = 2;
                }
                

               PARAMS.fbdelay = fb;
                //         console.log("gs "+grainSize +" pbr "+playbackRate+" detune "+detune);   
                console.log("start clock");
                clock.start(); // continues melody


            }
        
        }
    }
}