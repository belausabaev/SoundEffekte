let audioFile = "soundfiles/Theremin_Hauptstimme_sound.wav";
let audioFile2 = "soundfiles/guitar.wav";


let outGain = 1;
const gainNode = new Tone.Gain(outGain).toDestination();

Tone.FeedbackDelay.wet = 0.7;

const feedbackDelay = new Tone.FeedbackDelay(0.1, 0.2).toDestination();
const feedbackDelay2 = new Tone.FeedbackDelay(0.15, 0.4).toDestination();
const feedbackDelay3 = new Tone.FeedbackDelay(0.2, 0.2).toDestination();
const feedbackDelay4 = new Tone.FeedbackDelay(0.25, 0.4).toDestination();
const feedbackDelay5 = new Tone.FeedbackDelay(0.3, 0.2).toDestination();
const feedbackDelay6 = new Tone.FeedbackDelay(0.35, 0.3).toDestination();
const feedbackDelay7 = new Tone.FeedbackDelay(0.4, 0.4).toDestination();
const feedbackDelay8 = new Tone.FeedbackDelay(0.45, 0.45).toDestination();
const feedbackDelay9 = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
const feedbackDelay10 = new Tone.FeedbackDelay(0.55, 0.55).toDestination();
const feedbackDelay11 = new Tone.FeedbackDelay(0.6, 0.6).toDestination();

const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
  }).toDestination();
  // create an oscillator and connect it

  const grainBuffer = new Tone.ToneBufferSource().toDestination();

const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
    console.log('loaded');
    grainBuffer.buffer = audioBuffer.buffer;
  }).toDestination();




grainSize = 0.7; // clock geschwindigkeit einfluss
playbackRate = 7; 
overlap = 0.2; // wie verbunden die grains klingen
detune = 2000;

const clock = new Tone.Clock(clockCallback,1/grainSize);


const pitchsh = new Tone.PitchShift(5).toDestination();

function clockCallback(time){
    console.log("time "+time);
    const ticks = clock.getTicksAtTime(time);
    console.log("ticks "+ticks);
    const offset = ticks * grainSize;
    console.log("offset "+offset);
    

    const interval = detune/100;
  

    const grainBuf = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
        console.log("done playing");
    }).toDestination();

      //intervaltofrequencyratio function from tone js
     // grainBuf.playbackRate = Math.pow(2,(interval/12));
   
    const grainBuf2 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
        console.log("done playing");
    }).toDestination();

    grainBuf.connect(feedbackDelay11).connect(feedbackDelay9).toDestination();
    grainBuf2.connect(feedbackDelay9).toDestination();
    grainBuf.connect(pitchsh);
    grainBuf.fadeIn = overlap;
    grainBuf.fadeOut = overlap;

   
    //grainBuf.playbackRate = Math.pow(2,(interval/12));
    console.log("detune pbrate "+grainBuf.playbackRate);

    grainBuf.start(time,offset*0.2);
    grainBuf.stop(time + (grainSize/playbackRate));

    grainBuf2.fadeIn = overlap/2;
    grainBuf2.fadeOut = overlap;
    grainBuf2.start(time, ticks*0.2 * grainSize);
    grainBuf2.stop(time + (grainSize*0.2)/playbackRate);
    

}



  
          
  
