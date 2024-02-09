import { Audio } from './audio.js';
import { App } from './app.js';


document.getElementById('startAudioContext').addEventListener('click', function () {
    //get audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audio = new Audio(audioContext);
    const app = new App(audio);
    document.getElementById('startMessage').style.display = 'none';
    document.getElementById('player-div').style.display = 'flex';
});
