import { App } from './app.js';


document.getElementById('startAudioContext').addEventListener('click', function () {
    //get audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const app = new App(audioContext);
    document.getElementById('startMessage').style.display = 'none';
    document.getElementById('main').style.display = 'flex';
});
