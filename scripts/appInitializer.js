import { Audio } from './audio.js';
import { App } from './app.js';


document.getElementById('startAudioContext').addEventListener('click', function () {
    //get audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audio = new Audio(audioContext);
    const app = new App(audio);
    document.getElementById('startMessage').style.display = 'none';
    document.getElementById('player-div').style.display = 'flex';

    let languagePicker = document.getElementById("languages");

    //get navigator language and set picker
    this.language = navigator.language;
    if (this.language.includes("en")) {
        languagePicker.value = "en";
    } else if (this.language.includes("fr")) {
        languagePicker.value = "fr";
    } else if (this.language.includes("es")) {
        languagePicker.value = "es";
    }

    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    }
    else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
    else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
});
