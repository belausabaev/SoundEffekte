

let activeSources;

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






grainSize = 0.08; // clock geschwindigkeit einfluss
playbackRate = 0.1; // the grain is scheduled every x seconds
overlap = 0.5; // wie verbunden die grains klingen
detune = 500;

const clock = new Tone.Clock(clockCallback, 1 / grainSize);

//const clock2 = new Tone.Clock(clockCallback, 1 / (grainSize*0.5));

const fbdel1 = new Tone.FeedbackDelay(0.4, 0.7).toDestination();
const fbdel2 = new Tone.FeedbackDelay(0.1, 0.2).toDestination();



function clockCallback(time) {
  console.log("time " + time);
  const ticks = clock.getTicksAtTime(time);
  console.log("ticks " + ticks);
  const offset = ticks * grainSize;
  console.log("offset " + offset);



  const grainBuf = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
    console.log("done playing");
  }).toDestination();

  
   const grainBuf2 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
     console.log("done playing");
   }).toDestination();
 
   const grainBuf3 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
     console.log("done playing");
   }).toDestination();
 /*
   const grainBuf4 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
     console.log("done playing");
   }).toDestination();
   const grainBuf5 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
     console.log("done playing");
   }).toDestination();
 
 
   const grainBuf6 = new Tone.ToneBufferSource(audioBuffer.buffer, onload => {
     console.log("done playing");
   }).toDestination();
 */
  //grainBuf.playbackRate.value = 20;   // changing pitch of grain buffer!!!

  grainBuf.connect(feedbackDelay11).connect(feedbackDelay3).connect(fbdel1).toDestination();
  /*
  grainBuf2.connect(fbdel2).toDestination();
  grainBuf3.connect(fbdel1).toDestination();
  grainBuf4.connect(fbdel2).toDestination();
  grainBuf6.connect(fbdel2).toDestination();
*/

  //grainBuf.connect(gainNode);


  //  grainBuf.fadeIn = overlap;
  //  grainBuf.fadeOut = overlap;

  /*
  const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
  }).toDestination();
  */

  /*
    let attack = 0.1;
    let decay = overlap;
    const contour = new Tone.Gain().toDestination();
    contour.gain.setValueAtTime(0,time);
    contour.gain.linearRampToValueAtTime(0.7, time + );
    contour.gain.linearRampTo(0,time + attack);
    grainBuf.connect(contour);
  */
  const interval = detune / 100;
  //intervaltofrequencyratio function from tone js
  grainBuf.playbackRate.value = Math.pow(2, (interval / 12));

  grainBuf.fadeIn = 0.5;
  grainBuf.fadeOut = 0.5;
  grainBuf.start(time, offset);
  grainBuf.stop(time + grainSize / playbackRate);
  //grainBuf.stop(time + attack + decay +1 );

  grainBuf.onended = () => {
    grainBuf.buffer.dispose();
  }

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
  //grainBuf2.connect(ampEnv);
  grainBuf2.fadeIn = overlap+1;
  grainBuf2.fadeOut = overlap;
  grainBuf2.start(time, ticks * 0.1 * grainSize);
  grainBuf2.stop(time + (grainSize) / playbackRate);
  //grainBuf3.connect(ampEnv);
  grainBuf3.fadeIn = overlap+1;
  grainBuf3.fadeOut = overlap;
  grainBuf3.start(time, ticks * 0.05 * grainSize);
  grainBuf3.stop(time + (grainSize) / playbackRate);
  */
  /*
    grainBuf4.fadeIn = overlap+1;
    grainBuf4.fadeOut = overlap;
    grainBuf4.start(time, ticks * 0.01 * grainSize);
    grainBuf4.stop(time + (grainSize)/playbackRate);
    */
  /*
  grainBuf5.fadeIn = overlap+1;
  grainBuf5.fadeOut = overlap;h
  grainBuf5.start(time, ticks * 0.04 * grainSize);
  grainBuf5.stop(time + (grainSize)/playbackRate);
  */
  /*
  grainBuf6.fadeIn = overlap+1;
  grainBuf6.fadeOut = overlap;
  grainBuf6.start(time, ticks * 0.07 *grainSize);
  grainBuf6.stop(time + (grainSize)/playbackRate);
  */

}






function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}