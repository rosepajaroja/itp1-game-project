/* ============================================ 
### The Final Coursework - ITP1
Ma. Rosario Pajaroja-Villanueva
===============================================  */

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var trees_x;
var clouds;;
var mountains;
var cameraPosX;
var collectables;
var canyons;
var game_score;
var flagpole;
var lives;
var prevScore;
var jumpSound;
var collectableSound;
var fallSound;
var gameOverSound;
var levelCompleteSound;
var platforms;
var enemies;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    collectableSound = loadSound('assets/collectable.wav');
    collectableSound.setVolume(0.1);
    fallSound = loadSound('assets/fall.wav');
    fallSound.setVolume(0.1);
    gameOverSound = loadSound('assets/game_over.wav');
    gameOverSound.setVolume(0.1);
    levelCompleteSound = loadSound('assets/level_complete.wav');
    levelCompleteSound.setVolume(0.1);
}


function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3;
    startGame();

}


function draw()
{
///////////DRAWING CODE//////////
    cameraPosX = gameChar_x - width/2;
	background(100,155,255);

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y);
    
    push();
    translate(-cameraPosX, 0); 

//DRAW CLOUDS
    drawClouds();
    
//DRAW MOUNTAINS
    drawMountains();
    
//DRAW TREES
    drawTrees();

//PLATFORMS
    for(var i = 0; i < platforms.length; i++)
    {
        platforms[i].draw();
    }

//DRAW COLLECTABLE ITEM & INTERACTION
    for(var i = 0; i < collectables.length; i++)
    {
        if(!collectables[i].isFound)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }

//DRAW CANYON & INTERACTION
    for(var i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

//FLAGPOLE
    renderFlagpole();
    if(flagpole.isReached == false)
    {
        checkFlagpole();
    }

//GAME CHARACTERS
    drawCharacter();
    checkPlayerDie();

//ENEMIES
    for(var i = 0; i < enemies.length; i++)
    {
        enemies.draw();

        var enemiesIsContact = 
        enemies.checkContact(gameChar_x, gameChar_y);

        if(enemiesIsContact)
        {
            lives -= 1;
            if(lives > 0)
            {
                fallSound.play();
                startGame();
                game_score += int(prevScore + game_score);
            }
        }

    }

    pop();

//SCORE
    fill(0);
    rect(20, 20, 105, 38, 10)

    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT)
    text("SCORE " + game_score, 30, 45);

//LIVES
    for(var i = 0; i < lives; i ++)
    {
        fill(255, 0, 255);
        ellipse(35 + i * 25, 85, 18, 30);
    }

//GAME OVER
    if(lives < 1)
    {
        gameOverSound.play();
        fill(0, 99);
        rect(224.50, 163, 575, 250, 10)
    
        fill(255);
        stroke(0)
        strokeWeight(3);
        textSize(48);
        textAlign(CENTER)
        text("GAME OVER!.", width/2, 276);
        textSize(28);
        noStroke();
        text("Press space to continue.", width/2, 336);
    }

//LEVEL COMPLETE
    if(flagpole.isReached)
    {
        levelCompleteSound.play();
        fill(0, 99);
        rect(224.50, 163, 575, 250, 10)
    
        fill(255);
        stroke(0)
        strokeWeight(3);
        textSize(48);
        textAlign(CENTER)
        text("LEVEL COMPLETE!", width/2, 276);
        textSize(28);
        noStroke();
        text("Press space to continue.", width/2, 336);
    }
}

function drawCharacter()
{
    stroke(0);
    strokeWeight(2);
	if(isLeft && isFalling)
	{
        //clothes/body
        fill(204, 204, 255);
        triangle(gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 20, gameChar_x + 10, gameChar_y -20);
        //hand
        line(gameChar_x - 3, gameChar_y - 47.5, gameChar_x - 25, gameChar_y - 65);
        line(gameChar_x + 3, gameChar_y - 47.5, gameChar_x + 25, gameChar_y - 55);
        //feet
        line(gameChar_x - 3, gameChar_y - 20, gameChar_x - 12, gameChar_y - 5);
        noFill();
        beginShape();
        vertex(gameChar_x + 5, gameChar_y - 20);
        vertex(gameChar_x + 8, gameChar_y - 10);
        vertex(gameChar_x + 18, gameChar_y - 18);
        endShape();
        //face
        fill(255);
        ellipse(gameChar_x, gameChar_y - 60, 30, 25);
        fill(0);
        //eyes
        ellipse(gameChar_x - 7, gameChar_y - 60, 1, 1);
        ellipse(gameChar_x + 3, gameChar_y - 60, 1, 1);
        //mouth
        noFill();
        arc(gameChar_x - 2, gameChar_y - 55, 8, 5, 0, PI, PI);
	}
	else if(isRight && isFalling)
	{
        //clothes/body
        fill(204, 204, 255);
        triangle(gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 20, gameChar_x + 10, gameChar_y -20);
        //hand
        line(gameChar_x - 3, gameChar_y - 47.5, gameChar_x - 25, gameChar_y - 55);
        line(gameChar_x + 3, gameChar_y - 47.5, gameChar_x + 25, gameChar_y - 65);
        //feet
        line(gameChar_x + 3, gameChar_y - 20, gameChar_x + 12, gameChar_y - 5);
        noFill();
        beginShape();
        vertex(gameChar_x - 5, gameChar_y - 20);
        vertex(gameChar_x - 8, gameChar_y - 10);
        vertex(gameChar_x - 18, gameChar_y - 18);
        endShape();
        //face
        fill(255);
        ellipse(gameChar_x, gameChar_y - 60, 30, 25);
        fill(0);
        //eyes
        ellipse(gameChar_x + 7, gameChar_y - 60, 1, 1);
        ellipse(gameChar_x - 3, gameChar_y - 60, 1, 1);
        //mouth
        noFill();
        arc(gameChar_x + 2, gameChar_y - 55, 8, 5, 0, PI, PI);
	}
	else if(isLeft)
	{
        //clothes/body
        line(gameChar_x - 1, gameChar_y - 47.5, gameChar_x - 15, gameChar_y - 35);
        fill(204, 204, 255);
        triangle(gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 20, gameChar_x + 10, gameChar_y -20);
        //hand
        line(gameChar_x + 1, gameChar_y - 45, gameChar_x + 6, gameChar_y - 32);
        //feet
        line(gameChar_x - 3, gameChar_y - 20, gameChar_x - 12, gameChar_y);
        line(gameChar_x + 1, gameChar_y - 20, gameChar_x + 7, gameChar_y);
        //face
        fill(255);
        ellipse(gameChar_x, gameChar_y - 60, 30, 25);
        fill(0);
        //eyes
        ellipse(gameChar_x - 7, gameChar_y - 60, 1, 1);
        ellipse(gameChar_x + 3, gameChar_y - 60, 1, 1);
        //mouth
        noFill();
        arc(gameChar_x - 2, gameChar_y - 55, 8, 5, 0, PI, PI);
	}
	else if(isRight)
	{
        //clothes/body
        line(gameChar_x + 1, gameChar_y - 47.5, gameChar_x + 15, gameChar_y - 35);
        fill(204, 204, 255);
        triangle(gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 20, gameChar_x + 10, gameChar_y - 20);
        //hand
        line(gameChar_x - 1, gameChar_y - 45, gameChar_x - 6, gameChar_y - 32);
        //feet
        line(gameChar_x + 3, gameChar_y - 20, gameChar_x + 12, gameChar_y);
        line(gameChar_x - 1, gameChar_y - 20, gameChar_x - 7, gameChar_y);
        //face
        fill(255);
        ellipse(gameChar_x, gameChar_y - 60, 30, 25);
        fill(0);
        //eyes
        ellipse(gameChar_x - 3, gameChar_y - 60, 1, 1);
        ellipse(gameChar_x + 7, gameChar_y - 60, 1, 1);
        //mouth
        noFill();
        arc(gameChar_x + 2, gameChar_y - 55, 8, 5, 0, PI, PI);
	}
	else if(isFalling || isPlummeting)
	{
        //clothes/body
        fill(204, 204, 255);
        triangle(gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 20, gameChar_x + 10, gameChar_y -20);
        //hand
        line(gameChar_x - 3, gameChar_y - 47.5, gameChar_x - 20, gameChar_y - 35);
        line(gameChar_x + 3, gameChar_y - 47.5, gameChar_x + 20, gameChar_y - 35);
        //feet
        line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 20, gameChar_y - 10);
        line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 20, gameChar_y - 10);
        //face
        fill(255);
        ellipse(gameChar_x, gameChar_y - 60, 30, 25);
        fill(0);
        //eyes
        ellipse(gameChar_x - 5, gameChar_y - 60, 1, 1);
        ellipse(gameChar_x + 5, gameChar_y - 60, 1, 1);
        //mouth
        noFill();
        arc(gameChar_x, gameChar_y - 55, 8, 5, 0, PI, PI);
	}
	else
	{
        //clothes/body
        fill(204, 204, 255);
        triangle(gameChar_x, gameChar_y - 60, gameChar_x - 10, gameChar_y - 20, gameChar_x + 10, gameChar_y -20);
        //hand
        line(gameChar_x - 3, gameChar_y - 47.5, gameChar_x - 15, gameChar_y - 30);
        line(gameChar_x + 3, gameChar_y - 47.5, gameChar_x + 15, gameChar_y - 30);
        //feet
        line(gameChar_x - 3, gameChar_y - 20, gameChar_x - 5, gameChar_y);
        line(gameChar_x + 3, gameChar_y - 20, gameChar_x + 5, gameChar_y);
        //face
        fill(255);
        ellipse(gameChar_x, gameChar_y - 60, 30, 25);
        fill(0);
        //eyes
        ellipse(gameChar_x - 5, gameChar_y - 60, 1, 1);
        ellipse(gameChar_x + 5, gameChar_y - 60, 1, 1);
        //mouth
        noFill();
        arc(gameChar_x, gameChar_y - 55, 8, 5, 0, PI, PI);
	}
}

function keyPressed()
{
    //Left control + freeze when falling down the canyon
    if(key == "a")
    {
        if(isPlummeting == false && isFalling == false)
        {
            isLeft = true;
        }
    }
    
    //Right control + freeze when falling down the canyon
    if(key == "d")
    {
        if(isPlummeting == false && isFalling == false)
        {
            isRight = true;
        }
    }
    
    //Jump control + freeze when falling down the canyon
    if(key == "w")
    {
        if(isPlummeting == false && isFalling == false)
        {
            gameChar_y -= 100;
        }
    }
}

function keyReleased()
{
    if(keyCode == 32)
    {
        if(lives < 1)
        {
            startGame();
            lives = 3;
        }
        if(flagpole.isReached)
        {
            startGame();
            flagpole.isReached = false;
        }
    }

    //release left control
    if(key == "a") 
    {
        isLeft = false;
    }
    //release right control
    if(key == "d")
    {
        isRight = false;
    }
    //release jump control
    if(key == "w")
    {
        isFalling = false;
        jumpSound.play();
    }
}

function drawClouds()
{
    for(var i = 0; i < clouds.length; i++)
    {
        cloud = clouds[i];
        //cloud shadow
        fill(192, 216, 240);
        ellipse(cloud.x_pos - (cloud.size / 0.88), cloud.y_pos - (cloud.size / 2.64), cloud.size - (cloud.size / 2.64), cloud.size - (cloud.size / 2.64));
        ellipse(cloud.x_pos - (cloud.size / 4.55), cloud.y_pos - (cloud.size / 2.78), cloud.size + (cloud.size /1.79), cloud.size + (cloud.size / 1.79));
        ellipse(cloud.x_pos + (cloud.size / 0.76), cloud.y_pos - (cloud.size / 1.52), cloud.size + (cloud.size / 0.64), cloud.size + (cloud.size / 0.64));
        ellipse(cloud.x_pos + (cloud.size / 0.34), cloud.y_pos - (cloud.size / 1.79), cloud.size + (cloud.size / 1.47), cloud.size + (cloud.size / 1.47));
        ellipse(cloud.x_pos + (cloud.size / 0.26), cloud.y_pos - (cloud.size / 3.85), cloud.size - (cloud.size / 7.15), cloud.size - (cloud.size / 7.15));

        //cloud
        fill(255);
        ellipse(cloud.x_pos - (cloud.size / 0.89), cloud.y_pos - (cloud.size / 2.28), cloud.size / 1.62, cloud.size / 1.62);
        ellipse(cloud.x_pos - (cloud.size / 4.55), cloud.y_pos - (cloud.size / 1.79), cloud.size / 0.6, cloud.size / 0.60);
        ellipse(cloud.x_pos + (cloud.size / 0.76), cloud.y_pos - (cloud.size / 1.17), cloud.size / 0.39, cloud.size / 0.39);
        ellipse(cloud.x_pos + (cloud.size / 0.33), cloud.y_pos - (cloud.size / 1.52), cloud.size / 0.625, cloud.size / 0.625);
        ellipse(cloud.x_pos + (cloud.size / 0.25), cloud.y_pos - (cloud.size / 2.95), cloud.size / 1.1, cloud.size / 1.17);
    }
}

function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
        mountain = mountains[i];
        fill(64, 67, 75);
        beginShape();
        vertex(mountain.x_pos - 38, mountain.y_pos + 133);
        vertex(mountain.x_pos + 54, mountain.y_pos + 40);
        vertex(mountain.x_pos + 94, mountain.y_pos + 54);
        vertex(mountain.x_pos + 176, mountain.y_pos - 14);
        vertex(mountain.x_pos + 232, mountain.y_pos + 35);
        vertex(mountain.x_pos + 245, mountain.y_pos + 24);
        vertex(mountain.x_pos + 363, mountain.y_pos + 133);
        endShape();

        fill(0, 0, 0);
        triangle(mountain.x_pos + 167, mountain.y_pos + 133, mountain.x_pos + 250, mountain.y_pos + 45, mountain.x_pos + 334, mountain.y_pos + 133);

        beginShape();
        vertex(mountain.x_pos - 40, mountain.y_pos + 133);
        vertex(mountain.x_pos + 80, mountain.y_pos + 85);
        vertex(mountain.x_pos + 121, mountain.y_pos + 113);
        vertex(mountain.x_pos + 101, mountain.y_pos + 133);
        endShape();

        fill(64, 67, 75);
        triangle(mountain.x_pos + 224, mountain.y_pos + 133, mountain.x_pos + 304, mountain.y_pos + 52, mountain.x_pos + 383, mountain.y_pos + 133);
        triangle(mountain.x_pos + 255, mountain.y_pos + 89, mountain.x_pos + 221, mountain.y_pos + 133, mountain.x_pos + 290, mountain.y_pos + 133);
    }
}

function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {
        //leaves shadow
        fill(54, 109, 71);
        ellipse(880 + trees_x[i], 323, 85, 85);
        ellipse(855 + trees_x[i], 284, 85, 85);
        ellipse(868 + trees_x[i], 243, 68, 68);
        ellipse(917 + trees_x[i], 234, 85, 85);

        //leaves
        fill(140, 179, 71);
        ellipse(911 + trees_x[i], 320, 96, 96);
        ellipse(959 + trees_x[i], 316, 96, 96);
        ellipse(965 + trees_x[i], 272, 81, 81);
        ellipse(942 + trees_x[i], 257, 96, 96);
        ellipse(897 + trees_x[i], 288, 96, 96);

        //trunk
        fill(77, 47, 32);
        beginShape();
        vertex(912 + trees_x[i], 433);
        vertex(914 + trees_x[i], 382);
        vertex(903 + trees_x[i], 368);
        vertex(905 + trees_x[i], 366);
        vertex(915 + trees_x[i], 376);
        vertex(917 + trees_x[i], 321);
        vertex(920 + trees_x[i], 321);
        vertex(921 + trees_x[i], 354);
        vertex(938 + trees_x[i], 342);
        vertex(938 + trees_x[i], 344);
        vertex(922 + trees_x[i], 363);
        vertex(925 + trees_x[i], 432);
        endShape();
    }
}

function drawCollectable(t_collectable)
{
    if(t_collectable.isFound == false)
    {
        stroke(214, 19, 85);
        strokeWeight(t_collectable.size / 25);
        noFill();
        arc(t_collectable.x_pos + (t_collectable.size - (t_collectable.size / 1.43)), t_collectable.y_pos + 4, t_collectable.size - (t_collectable.size / 2.2727), t_collectable.size, PI, TWO_PI);
        noStroke();
        fill(252, 226, 42);
        rect(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - (t_collectable.size / 2.5), t_collectable.size - (t_collectable.size / 2.5), t_collectable.size / 10, t_collectable.size / 10, t_collectable.size / 5, t_collectable.size / 5);
        fill(48, 227, 223);
        rect(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - (t_collectable.size / 2.5), t_collectable.size - (t_collectable.size / 1.5151), t_collectable.size / 10, t_collectable.size / 10, t_collectable.size / 5, t_collectable.size / 5);
        fill(214, 19, 85);
        ellipse(t_collectable.x_pos + (t_collectable.size - (t_collectable.size / 1.43)), t_collectable.y_pos + t_collectable.size - (t_collectable.size / 1.3), t_collectable.size - (t_collectable.size / 1.0869), t_collectable.size - (t_collectable.size / 1.0869));
    }
}

function drawCanyon(t_canyon)
{
    fill(77, 47, 32);
    rect(t_canyon.x_pos - 23, t_canyon.y_pos, t_canyon.width + 45, 145);
    fill(100,155,255);
    rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, 145);
    fill(99, 205, 215);
    rect(t_canyon.x_pos - 18, t_canyon.y_pos + 10, t_canyon.width + 35, 140);
}

function checkCollectable(t_collectable)
{
    if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50)
    {
        t_collectable.isFound = true;
        collectableSound.play();
        game_score += 1;
    }
}

function checkCanyon(t_canyon)
{
    if((gameChar_x > t_canyon.x_pos) && (gameChar_x < (t_canyon.x_pos + t_canyon.width)) && (gameChar_y >= floorPos_y))
    {
        isPlummeting = true;
        gameChar_y += 3;
        gameChar_fallen = true;
    }
    if(gameChar_y < floorPos_y)
    {
        var isContact = false;
        for(var i = 0; i < platforms.length; i ++)
        {
            if(platforms[i].checkContact(gameChar_x, gameChar_y) == true)
            {
                isContact = true;
                break;
            }
        }
        if(isContact == false){
            gameChar_y += 1;
            isFalling = true;
        }
    }
    else
    {
        isFalling = false;
    }
    if(isLeft)
    {
        gameChar_x -= 1;
    }
    if(isRight)
    {
        gameChar_x += 1;
    }
    if(isPlummeting == true)
    {
        isRight = false;
        isLeft = false;
    }
}

function renderFlagpole()
{
    push();
    strokeWeight(4);
    stroke(0);
    line
    (
        flagpole.x_pos, 
        floorPos_y, 
        flagpole.x_pos, 
        floorPos_y - 300
    );

    noStroke();
    fill(255, 0, 0)
    if(flagpole.isReached)
    {
        triangle
        (
            flagpole.x_pos, floorPos_y - 250, 
            flagpole.x_pos + 80, floorPos_y - 275, 
            flagpole.x_pos, floorPos_y - 300
        )
    }
    else 
    {
        triangle
        (
            flagpole.x_pos, floorPos_y, 
            flagpole.x_pos + 80, floorPos_y - 25, 
            flagpole.x_pos, floorPos_y - 50
        )

    }
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_x - flagpole.x_pos);
    if(d < 15)
    {
        flagpole.isReached = true;
    }
}

function checkPlayerDie()
{
    prevScore = game_score;
    if(gameChar_y > height)
    {
        lives -= 1;
        if(lives > 0)
        {
            fallSound.play();
            startGame();
            game_score += int(prevScore + game_score);
        }
    }
}

function createPlatforms(x, y, length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
            fill(53, 26, 23);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function(gameChar_x, gameChar_y)
        {
            if(gameChar_x > this.x && gameChar_x < this.x + this.length)
            {
                var d = this.y - gameChar_y
                if(d >= 0 && d < 5)
                {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

function enemy(x, y, range)
{
    enemies.x = -500;
    enemies.y = y;
    enemies.range = range;

    enemies.currentX = x;
    enemies.inc = 1;

    enemies.update = function()
    {
        this.currentX += enemies.inc

        if(enemies.currentX >= enemies.x + enemies.range)
        {
            enemies.inc = -1;
        }
        else if(enemies.currentX < enemies.x)
        {
            enemies.inc = 1;
        }
    }

    enemies.draw = function()
    {
        enemies.update();
        fill(0);
        ellipse(enemies.currentX, enemies.y, 50, 50);
        fill(255);
        ellipse(enemies.currentX - 10, enemies.y -5, 10, 10);
        ellipse(enemies.currentX + 10, enemies.y -5, 10, 10);
        fill(255);
        rect(enemies.currentX - 8, enemies.y + 8, 18, 8);
    }

    enemies.checkContact = function(gameChar_x, gameChar_y)
    {
        var d = dist(gameChar_x, gameChar_y, enemies.currentX, enemies.y)

        if(d < 50)
        {
            return true;
        }
        return false;
    }
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    cameraPosX = 0;
    trees_x = [-600, -900, -300, -200, 600, 800, 1500, 100];
    clouds = 
    [
        {x_pos: 50, y_pos: 100, size: 50},
        {x_pos: 300, y_pos: 150, size: 20},
        {x_pos: 500, y_pos: 80, size: 60},
        {x_pos: 1200, y_pos: 150, size: 60},
        {x_pos: -600, y_pos: 150, size: 25},
        {x_pos: -200, y_pos: 150, size: 50},
        {x_pos: 900, y_pos: 150, size: 40},
        {x_pos: 1500, y_pos: 150, size: 25},
    ];
    mountains =
    [
        {x_pos: -300, y_pos: 300},
        {x_pos: 500, y_pos: 300},
        {x_pos: 800, y_pos: 300},
        {x_pos: 1600, y_pos: 300},
    ];
    collectables =
    [
        {x_pos: 320, y_pos: 420, size: 40, isFound: false},
        {x_pos: -570, y_pos: 420, size: 40, isFound: false},
        {x_pos: 890, y_pos: 420, size: 40, isFound: false},
        {x_pos: 1100, y_pos: 420, size: 40, isFound: false},
        {x_pos: 1720, y_pos: 420, size: 40, isFound: false},
        {x_pos: -100, y_pos: 420, size: 40, isFound: false},
        {x_pos: 720, y_pos: 420, size: 40, isFound: false},
        {x_pos: 150, y_pos: 420, size: 40, isFound: false},
        {x_pos: -720, y_pos: 420, size: 40, isFound: false},
    ];
    canyons = 
    [
        {x_pos: 1203, y_pos: 432, width: 40},
        {x_pos: -903, y_pos: 432, width: 40},
        {x_pos: 203, y_pos: 432, width: 40},
        {x_pos: 1863, y_pos: 432, width: 40},
        {x_pos: -203, y_pos: 432, width: 40},
    ]

    platforms = [];
    platforms.push(createPlatforms(400, floorPos_y - 75, 100));
    platforms.push(createPlatforms(1500, floorPos_y - 90, 100));
    platforms.push(createPlatforms(-500, floorPos_y - 100, 100));
    platforms.push(createPlatforms(-800, floorPos_y - 100, 100));

    game_score = 0;
    flagpole = {isReached: false, x_pos: 2500};
    enemies = [];
    enemies.push(new enemy(100, floorPos_y-10, 100));
}
