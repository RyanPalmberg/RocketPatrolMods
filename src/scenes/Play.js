class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }  
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket01.png');
        // this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('parallax', './assets/parallax.png');
        this.load.image('miniship', './assets/MiniSpaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('spaceship', './assets/battleship01.png');


      }
    create() {
        this.starfield=this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.parallax=this.add.tileSprite(0, 0, 640, 480, 'parallax').setOrigin(0, 0);


        // this.p1Boom = new Boomerang(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Miniship(this, game.config.width, borderUISize*3 + borderPadding*5, 'miniship', 0, 40).setOrigin(0,0);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // this.shipAnimation(this.ship01);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        // })
        // this.anims.create({
        //     key: 'driller1',
        //     frames: this.anims.generateFrameNumbers('spaceshipanim', { start: 0, end: 0, first: 0}),
        //     frameRate: 14,
        //     repeat:-1
        // })

        // this.anims.create({
        //     key: 'driller2',
        //     frames: this.anims.generateFrameNumbers('spaceshipanim', { start: 1, end: 1, first: 1}),
        //     frameRate: 14,
        //     repeat:-1
        // })

        // this.anims.create({
        //     key: 'driller3',
        //     frames: this.anims.generateFrameNumbers('spaceshipanim', { start: 2, end: 2, first: 2}),
        //     frameRate: 14,
        //     repeat:-1
        
        });


        //initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
            this.fire = this.add.text(borderUISize + borderPadding*3, borderUISize + borderPadding*2, 'FIRE', scoreConfig)

            
        // GAME OVER flag
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        if (!this.gameOver) {
            this.sound.play('sfx_BGM');
        }
        // if (this.gameOver == true) {
        //     this.sound.pause('sfx_BGM');
        //     this.sound.currentTime = 0;
        // }

        // Display Time
        // let timerDisplay = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'left',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //         fixedWidth: 100
        //     }
        //         let startTime = (game.settings.gameTimer);
        //         // let timerD = (game.settings.gameTimer)
        //         let remainingtime = this.add.text(borderUISize*15 + borderPadding, borderUISize + borderPadding*2, startTime, timerDisplay);
        
            
    }
    update() {
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        this.parallax.tilePositionX -= 2.5;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        // let substituteclock = game.settings.gameTimer
        // if (game.settings.gameTimer = substituteclock - 1,000) {
        //     this.remainingtime = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, game.settings.gameTimer, timerDisplay);
        //     substituteclock = game.settings.gameTimer
        // }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
        

        // if (!this.gameOver) {               
        //     this.p1Rocket.update();         // update rocket sprite
        //     this.ship01.update();           // update spaceships (x3)
        //     this.ship02.update();
        //     this.ship03.update();
        // }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }
    // let (p = 0)

    // Here I attempted to animate the spaceships fram by frame, but I couldn't get the syntax right.

    // shipAnimation(ship) {
    //     let drilly = this.add.sprite(ship.x, ship.y, 'driller').setOrigin(0, 0);
    //     if (p = 0) {

    //         drilly.anims.play('driller1');
    //         drilly.on('animationcomplete', () => {
    //             drilly.destroy();
    //             p += 1;
    //         }
    //     }
    //     if (p = 1) {
    //         drilly.anims.play('driller2');
    //         drilly.on('animationcomplete', () => {
    //             drilly.destroy();
    //             p += 1;
    //         })
    //     }
    //     if (p = 2) {
    //         drilly.anims.play('driller3');
    //         drilly.on('animationcomplete', () => {
    //             drilly.destroy();
    //             p = 0;
    //     }
        
    // }

    shipExplode(ship) {
        ship.alpha=0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha=1;
            boom.destroy();
        });

          // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // int j = ((Math.random() * (3-0))+0);
        // int (random_int) = (int)Math.floor(Math.random()*(max-min+1)+min);
        var rando = Phaser.Math.Between(0, 3);
            if (rando==2) {
                this.sound.play('sfx_explosion1');
            }
            if (rando==0) {
                this.sound.play('sfx_explosion2');
            }
            if (rando==1) {
                this.sound.play('sfx_explosion3');
            }
            if (rando==3) {
                this.sound.play('sfx_explosion4');
            }
        // this.sound.
        // this.sound.
        // this.sound.play('sfx_explosion');
    }

}