var player = new Tone.Player({
    "url" : "../samples/creepy_109.wav",
    "autostart" : true,
}).toMaster();

player.start();
