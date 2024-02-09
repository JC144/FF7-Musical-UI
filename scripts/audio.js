class Audio {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.player = new WebAudioFontPlayer();
        this.player.loader.decodeAfterLoading(audioContext, '_tone_0000_Chaos_sf2_file');
    }

    playNote(note) {
        note.envelope = this.player.queueWaveTable(this.audioContext, this.audioContext.destination, _tone_0000_Chaos_sf2_file, 0, note.key, 999, true);
        return note;
    }

    stopNote(note) {
        if (note.envelope) {
            note.envelope.cancel();
            note.envelope = null;
        }
        return null;
    }
}
export { Audio };