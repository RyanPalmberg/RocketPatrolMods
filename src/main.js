//Ryan Palmberg
//Rocket Patrol Mods
//27 June 2021
//Took around 13 hours to complete

//POINTS BREAKDOWN:
//Tutorial Completion (20)
//Smaller Spaceship (20)
//Parallax Scrolling (10)
//Control Rocket after Firing (5)
//4 New Explosion sounds (10)
//New rocket, spaceship, and explosion assets (20)
//Implement Background Music (5)
//TOTAL: 90

//HELPFUL SOURCES:
//https://rexrainbow.github.io/phaser3-rex-notes/docs/site/random/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT, keyDown;