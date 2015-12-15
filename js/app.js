/* app.js
 *
 * Contains Class definitions for Game, Enemies, Player, and Model Objects
 * Input handling and game logic.
 */

/** 
 * @description Enemies our player must avoid
 * @constructor
 * @param {number} row - The row the enemy will run on
 * @param {number} spd - An index used to determine speed
 */
var Enemy = function(row, spd) {
    // Start offscreen from the left
    this.x = -100;
    this.y = row * 83 + 50;
    this.speed = this.speeds[spd];
    this.sprite = 'images/enemy-bug.png';
};

/**
 * @description Array that holds the possible enemy speeds
 */
Enemy.prototype.speeds = [100,200,400];

/**
 * @description Updates the enemy's position
 * @param {number} dt - A time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    /* Moves the enemy across the screen horizontally */
    this.x += this.speed*dt;

    /* Handles collision with the Player */
    if ((this.y == player.y) && 
        (this.x > (player.x - 83)) && 
        (this.x < (player.x + 83))){

        /* Subtract score, display notes, and reset player */
        var score = document.getElementById("score");
        var notes = document.getElementById("score-note");
        if(game.score > 0){
            game.addScore(-1);
            notes.innerHTML = 'You\'ve been hit! -1 point!';
        } else {
            notes.innerHTML = 'You\'ve been hit!';
        }
        score.innerHTML = 'Level: ' + game.level + ' | Score: ' + game.score;
        notes.style.color = 'red';
        player.reset();
        setTimeout(function(){}, 3000);
        return;
    }

    /* Handles what happens once enemy finishes across the screen */
    if (this.x > 707) {
        this.x = -100;
        /* Resets enemy to the left of the canvas and randomly
         * changes the enemy's row and speed */
        this.speed = this.speeds[Math.floor((Math.random() * 3))];
        this.y = (Math.floor(Math.random() * 3)) * 83 + 50;
    }
};

/**
 * @description Draws the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** 
 * @description Represents the player
 * @constructor
 */
var Player = function() {
    this.x = 303;
    this.y = 340.5;
    this.key = null;

    /* How much the player moves per key input in each direction */
    this.moveY = 41.5;
    this.moveX = 50.5;
    this.sprite = 'images/char-boy.png';
};

/**
 * @description Updates the player's position
 * @param {number} dt - A time delta between ticks
 */
Player.prototype.update = function(dt) {
    if (this.key == 'left'){
        this.x -= this.moveX;
    } else if (this.key == 'up'){
        this.y -= this.moveY;
    } else if (this.key == 'down'){
        this.y += this.moveY;
    } else if (this.key == 'right'){
        this.x += this.moveX;
    }
    this.key = null;
};

/**
 * @description Draws the player on the screen
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Handles key input for player on the screen
 * @param (string)
 */
Player.prototype.handleInput = function(key){
    /* For string manipulation on the page */
    var score = document.getElementById('score');
    var notes = document.getElementById('score-note');

    /* Checks if move results in out-of-bounds */
    if (!this.legalMove(key)){
        notes.innerHTML = 'Out of Bounds.';
        notes.style.color = 'red';
        return;
    } else {
        notes.innerHTML = '';
    }

    /* Checks if move would result in touching river (goal) */
    if (this.riverTouch(key)){
        game.addScore(1);

        /* If score is enough to reach the next level */
        if(game.score == 3){
            score.innerHTML = 'You\'ve reached LEVEL ' + (game.level+1) + '!!';
            score.style.fontsize = '32px';
            game.nextLevel();
            this.reset();  
        } else {
            score.innerHTML = 'Level: ' + game.level + ' | Score: ' + game.score;
            notes.innerHTML = 'You made it! +1 point!';
            notes.style.color = 'green';
            this.reset();
        }
        return;
    }
    score.innerHTML = "Level: " + game.level + " | Score: " + game.score;
    this.key = key;
};

/**
 * @description Checks if move would result in out of bounds
 */
Player.prototype.legalMove = function(key){
    if ((key == 'left' && (this.x - this.moveX < 0)) ||
        (key == 'right' && (this.x + this.moveX >= 617)) ||
        (key == 'down' && (this.y + this.moveY > 404))) {
        return false;
    }
    return true;
};

/**
 * @description Checks if player is touching the river
 */
Player.prototype.riverTouch = function(key){
    if (key == 'up' && (this.y - this.moveY <= 0)) {
        return true;
    }
};

/**
 * @description Resets the player's position to initial position
 */
Player.prototype.reset = function(){
    this.x = 303;
    this.y = 340.5;
};

/**
 * @description Object to hold game data
 * @constructor
 */
var Game = function(){
    this.level = 1;
    this.score = 0;
};

/**
 * @description Next level setup: Reset score, add enemy
 */
Game.prototype.nextLevel = function(){
    this.level++;
    this.score = 0;
    allEnemies[this.level+1] = new Enemy(Math.floor((Math.random()*3)), Math.floor((Math.random()*3)));
};

Game.prototype.prevLevel = function(){
    this.level--;
    this.score = 0;
    allEnemies.pop();
}

/**
 * @description Method to adjust the score
 * @param {number} value - The value to adjust the score by
 */
Game.prototype.addScore = function(value){
    this.score += value;
};

/**
 * @description Array to hold strings of sprite images
 */
var models = [        
        'images/Key.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/enemy-bug.png'];

/**
 * @description Draws the model on the screen
 * @constructor
 * @param {number} number - Index for models
 */
var Model = function(number) {
    this.x = (number > 2) ? 101 * (number + 1) : 101 * number; 
    this.y = 382;  
    this.sprite = models[number];
};

/**
 * @description Swaps the model sprite if chosen
 * @param {number} dt - A time delta between ticks
 */
Model.prototype.update = function(dt) {
    if (this.y == player.y && this.x == player.x){
        player.reset();
        player.sprite = [this.sprite, this.sprite = player.sprite][0];
    }
};

/**
 * @description Draws the player on the screen
 */
Model.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* 
 * Instantiate all objects
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */
var game = new Game();
var player = new Player();
var allEnemies = [];
var allModels = [];

/* Create enemies (start with 3 enemies at level 1) */
for (var i=0; i<3; i++){
    allEnemies[i] = new Enemy(Math.floor((Math.random()*3)), Math.floor((Math.random()*3)));
}

 /* For each of the 6 different character models */
for (var i=0; i<6; i++){
    allModels[i] = new Model(i);
}

/**
 * @description This listens for key presses and sends the keys to your
 *              Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function level(requestedLevel) {
    if(game.level < requestedLevel){
        while(game.level < requestedLevel){
            game.nextLevel();
        }
    } else {
        while(game.level > requestedLevel){
            game.prevLevel();
        }
    }
    player.reset();
    var score = document.getElementById('score');
    score.innerHTML = "Level: " + game.level + " | Score: " + game.score;
}