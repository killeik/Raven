const buttonStart = document.querySelector('.button-start');
const buttonStop = document.querySelector('.button-stop');
const waveformSelector = document.querySelector('.waveform-selector');
const inputHz = document.querySelector('.input-hz');
var audioCtx = new AudioContext();
var oscillator;

buttonStart.addEventListener('click', function(){
  var oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination)z;
  oscillator.frequency.setValueAtTime(inputHz.value, audioCtx.currentTime);
  oscillator.type = waveformSelector.value;
  oscillator.start();
})

buttonStop.addEventListener('click', function(){
  oscillator.stop();
})
