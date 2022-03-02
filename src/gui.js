const PARAMS = {
    source: 0, //sample file number in GUI drop down list
    grainSize: 0.30, //in seconds
    overlap: 0.5, //in seconds
    detune: 500, // detuning in cents, 100 cent = 1 semitone
    playbackrate: 0.1, //playback rate factor
    fbdelay: 0
};

const pane = new Tweakpane({
    title: 'Grain Delay',
    expanded: true,
});

pane.addSeparator();

const instr = pane.addFolder({
    title: 'Sound',
});

// sound/tone context on and off
const btnSound = instr.addButton({
    title: '► | ◼︎',
    label: 'sound on/off',
});

playing = false;

btnSound.on('click', () => {
    console.log(Tone.getContext().state);
    if (playing) {
        Tone.getContext().rawContext.suspend();
        playing = false;
        //audioBuffer.disconnect();
    } else {
      
       
        playing = true;
    
    
          Tone.start();
         
          /*
          audioBuffer.start(Tone.now(),1);
          audioBuffer.stop(Tone.now()+2);
        
         grainBuffer.start(Tone.now(),2);
         grainBuffer.stop(Tone.now()+2);
       */
      //  clock.loop = true;
     //   clock.start(Tone.now());
   
    //   clock.stop("+15");
    //    audioBuffer.loop = true;

        interactivesound = true;
      
       
        /*
        clock.start(Tone.now()+1);
        clock.stop("+10");
        clock.start(Tone.now()+2);
        clock.stop("+10");
        clock.start(Tone.now()+3);
        clock.stop("+10");
        clock.start(Tone.now()+4);
        clock.stop("+10");
        clock.start(Tone.now()+5);
        clock.stop("+10");
        clock.start(Tone.now()+6);
        clock.stop("+10");
        */
   /*
        gp.start();
        let len = audioBuffer.buffer.length;
        let att = 0.1;
        let dec = 0.1;
*/
        /*
            for(let i = 0; i < len/50; i + 50){
                buf = new Tone.ToneBufferSource().toDestination();
                buf.buffer = audioBuffer.buffer;
                buf.start(Tone.now(),(audioBuffer.buffer.length*i)/audioBuffer.buffer.length);
                buf.stop(Tone.now()+(audioBuffer.buffer.length*i)/audioBuffer.buffer.length);
                
            }
            */

      

/*
        for (let i = 0; i < 50; i + 0.1) {
            
            const buf = new Tone.ToneBufferSource().toDestination();
            buf.buffer = audioBuffer.buffer;
            grainGain = new Tone.Gain();
            contour = new Tone.Gain();

            contour.gain.setValueAtTime(0, Tone.now());
            contour.gain.exponentialRampToValueAtTime(0.6, Tone.now() + att);
            contour.gain.exponentialRampToValueAtTime(0, Tone.now() + (att + dec));

            contour.connect(grainGain);

            grainGain.toDestination();
            buf.connect(contour);

            buf.start(Tone.now(), (len * i) / len + Math.random(0,1), (att + dec));
            //buf.stop(Tone.now()+(att+dec));
            
            grainGain.disconnect();
        

        }
        console.log(Tone.getContext().rawContext.state);

*/
        //     audioBuffer.start();


        // gp.start();
        //  console.log("started gp");
        //player.start();
        //audioBuffer.start();

    }



});


const SourceInput = 
    instr.addInput(PARAMS, 'source', { options: { Theremin_Melody: 0, Guitar: 1, Piano: 2 , Theremin_Melody_Nevsky: 3} });
SourceInput.on('change', function (ev) {
    grainSample = ev.value;
    if (grainSample == 0) {
        audioBuffer.buffer = sampleBuffer1;
          console.log("grain sample "+grainSample);
          clock.stop();
          clock.start(); // restart clock, restart melody with new buffer
        //gp.buffer = sampleBuffer1;
        //interactivesound = false;

    }
    if (grainSample == 1) {
        audioBuffer.buffer = sampleBuffer2;
          console.log("grain sample "+grainSample);
          clock.stop();
          clock.start();
        //gp.buffer = sampleBuffer1;
        //interactivesound = false;
       // clock.start(Tone.now());
    }

    if (grainSample == 2) {
        audioBuffer.buffer = sampleBuffer3;
          console.log("grain sample "+grainSample);
          clock.stop();
          clock.start();
        //gp.buffer = sampleBuffer1;
        //interactivesound = false;

    }

    if (grainSample == 3) {
        audioBuffer.buffer = sampleBuffer4;
         console.log("grain sample "+grainSample);
          clock.stop();
          clock.start();
        //gp.buffer = sampleBuffer1;
        //interactivesound = false;

    }
});

pane.addSeparator();

const grain = pane.addFolder({
    title: 'Grain Params',
    expanded: true
});

const gsInput = grain.addInput(PARAMS, 'grainSize', { min: 0.01, max: 3, step: 0.01 });
gsInput.on('change', function (ev) {
    gS = parseFloat(ev.value.toFixed(2));
    grainSize = gS;
});

const ovInput = grain.addInput(PARAMS, 'overlap', { min: 0.0, max: 1, step: 0.01 });
ovInput.on('change', function (ev) {
    oL = parseFloat(ev.value.toFixed(2));
    overlap = oL;
});

const maxDetune = grain.addInput(PARAMS, 'detune', { min: 0, max: 800, step: 10 });
maxDetune.on('change', function (ev) {
    detune = ev.value;
});

const changePBR = grain.addInput(PARAMS, 'playbackrate', { min: 0.1, max: 5, step: 0.1 });
changePBR.on('change', function (ev) {
    playbackRate = ev.value;
});

pane.addMonitor(PARAMS,'grainSize',{ view:'graph', min: 0, max: 1});
pane.addMonitor(PARAMS,'overlap',{ view:'graph', min: 0, max: 1});
pane.addMonitor(PARAMS,'fbdelay',{ view:'graph', min: 0.0, max: 1.0});