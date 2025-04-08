var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var melon;
var bombs;
var rock;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('melon', 'assets/watermelon.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('rock', 'assets/rocks.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Create the ground and ledges
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    platforms.create(350, 120, 'ground');
    platforms.create(0, 500, 'ground');
   

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Stars and melon to collect
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    melon = this.physics.add.group({
        key: 'melon',
        repeat: 1,
        setXY: { x: 80, y: 0, stepX: 550 }
    });

    // Initialize the rock group
    rock = this.physics.add.group({
        key: 'rock',
        repeat: 0,
        setXY: { x: 600, y:400 , stepX: 250 }
    });

    // Make objects bounce
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
    });

    melon.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.9));
    });

    rock.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.9));
    });

    bombs = this.physics.add.group();

    // Score Text
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Collide player with platforms and objects
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(melon, platforms);
    this.physics.add.collider(rock, platforms);
    this.physics.add.collider(bombs, platforms);

    // Check for overlaps
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, melon, collectMelon, null, this);
    this.physics.add.overlap(player, rock, hitRock, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    if (gameOver) return;

    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    // Jumping with spacebar
    if (cursors.space.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    // Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        // Spawn a bomb
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

function collectMelon(player, melon) {
    melon.disableBody(true, true);

    // Add and update the score
    score += 30;
    scoreText.setText('Score: ' + score);
}

function hitRock(player, rock) {
    // Reduce score when hitting rocks
    score -= 10;
    scoreText.setText('Score: ' + score);
}

function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}
