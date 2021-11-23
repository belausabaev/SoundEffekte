let audioFile = "soundfiles/Theremin_Hauptstimme_sound.wav";
let audioFile2 = "soundfiles/guitar.wav";




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


// create an oscillator and connect it

const grainBuffer = new Tone.ToneBufferSource().toDestination();

const audioBuffer = new Tone.ToneBufferSource(audioFile, () => {
  console.log('loaded');
  grainBuffer.buffer = audioBuffer.buffer;
}).toDestination();




grainSize = 0.07; // clock geschwindigkeit einfluss
playbackRate = 0.3;
overlap = 0.02; // wie verbunden die grains klingen
detune = 2000;

const clock = new Tone.Clock(clockCallback, 1 / grainSize);

//const clock2 = new Tone.Clock(clockCallback, 1 / (grainSize*0.5));


const pitchsh = new Tone.PitchShift(12).toDestination(); // pitch shift in semitones, 12 = one octave

const interval = detune / 100;
const fbdel1 = new Tone.FeedbackDelay(0.5, 0.7).toDestination();
const fbdel2 = new Tone.FeedbackDelay(0.2, 0.7).toDestination();



function clockCallback(time) {
  console.log("time " + time);
  const ticks = clock.getTicksAtTime(time);
  console.log("ticks " + ticks);
  const offset = ticks * grainSize;
  console.log("offset " + offset);

  let outGain = 50;
const gainNode = new Tone.Gain(outGain).toDestination();

  const grainBuf = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();

  //intervaltofrequencyratio function from tone js
  // grainBuf.playbackRate = Math.pow(2,(interval/12));
  const grainBuf2 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();

  const grainBuf3 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();

  const grainBuf4 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();
  const grainBuf5 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();


  const grainBuf6 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();


 // grainBuf.connect(pitchsh);
 // grainBuf2.connect(pitchsh);
 // grainBuf3.connect(pitchsh);
  //grainBuf.connect(fbdel1).toDestination();
  grainBuf2.connect(fbdel2).toDestination();
  grainBuf3.connect(fbdel1).toDestination();
  grainBuf4.connect(fbdel1).toDestination();
  //grainBuf.connect(pitchsh);
  
  //grainBuf.connect(gainNode);
  grainBuf.playbackRate  = grainBuf.playbackRate *5;

  grainBuf.fadeIn = overlap;
  grainBuf.fadeOut = overlap;
  grainBuf.start(time, offset);
  grainBuf.stop(time + (grainSize / playbackRate));

 /*


  Tone.Offline(() => {

    
    
    //const oscillator = new Tone.Oscillator().toDestination().start(0);

    const grainBuf = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
      console.log("done playing");
    }).toDestination();
   
    grainBuf.fadeIn = overlap;
    grainBuf.fadeOut = overlap;
    grainBuf.start(0, offset);
   // grainBuf.stop(0 + (grainSize / playbackRate));

  }, grainSize/playbackRate).then((buffer) => {
    const newBuf = new Tone.ToneBufferSource(buffer, onload => {
      console.log("done playing");
  }).toDestination()
 
  newBuf.start();
  
  }
  );

*/
 

/*
grainBuf2.connect(ampEnv);
grainBuf2.start(time, ticks * 0.1 * grainSize);
grainBuf2.stop(time + (grainSize) / playbackRate);
grainBuf3.connect(ampEnv);
grainBuf3.start(time, ticks * 0.05 * grainSize);
grainBuf3.stop(time + (grainSize) / playbackRate);
*/
/*
  grainBuf4.fadeIn = overlap;
  grainBuf4.fadeOut = overlap;
  grainBuf4.start(time, ticks * 0.01 * grainSize);
  grainBuf4.stop(time + (grainSize)/playbackRate);
  grainBuf5.fadeIn = overlap;
  grainBuf5.fadeOut = overlap;
  grainBuf5.start(time, ticks * 0.04 * grainSize);
  grainBuf5.stop(time + (grainSize)/playbackRate);
  grainBuf6.fadeIn = overlap;
  grainBuf6.fadeOut = overlap;
  grainBuf6.start(time, ticks * 0.07 *grainSize);
  grainBuf6.stop(time + (grainSize)/playbackRate);
  */
  
}






