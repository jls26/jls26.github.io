/*

The Game Project 6

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var game_score;
var lives;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var jumpSound;
var coin;
var gameOver;
let c1, c2;

function preload()
{
	//load sounds
	audioManager();
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3;
	theme.loop();
	startGame();
}

function draw()
{
	setGradient(0, 0, width, height, c1, c2); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
	
	// Draw & move background
	push();
	translate(scrollPos,0);
	drawWorld();
	pop();
	//----------------------

	// Draw game character.
	
	drawGameChar();

	gameManager();
	
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if(keyCode == 65 && gameOver == false)  //To Move Left
	{
		isLeft = true;
	}
	else if(keyCode == 68 && gameOver == false) //To Move Right
	{
		isRight = true;
	}
	else if(keyCode == 32 && gameChar_y == floorPos_y && gameOver == false) // To Jump
	{
		gameChar_y -= 100;
		jumpSound.play();
	}else{
		gameChar_x += 0;
	}

	if(gameOver && keyCode == 32)
	{
		gameOver = false;
		lives = 3;
		theme.loop();
		startGame();
	}

	
}

function keyReleased()
{
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if(gameOver)
	{
		isLeft = false;
		isRight = false;
	}else if(keyCode == 65 && gameOver == false)
	{
		gameChar_x -= 5;
		isLeft = false;
		
	}
	else if(keyCode == 68 && gameOver == false)
	{
		gameChar_x +=5;
		isRight = false;
	}else{
		gameChar_x += 0;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() 
{
	// draw game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		stroke(1)
		strokeWeight(2);
		//leftleg
		line(gameChar_x + 5,gameChar_y-25,gameChar_x - 0,gameChar_y - 60)
		//rightleg
		line(gameChar_x + 10,gameChar_y-25,gameChar_x + 0,gameChar_y - 60)
		strokeWeight(1);
		fill(150,50,200);
		ellipse(gameChar_x,gameChar_y - 65,35,20);
		fill(200,50,0);
		ellipse(gameChar_x - 15,gameChar_y - 65,15,7);
		fill(0);
		ellipse(gameChar_x - 6,gameChar_y-70,3,3);

	}else if(isRight && isFalling)
	{
		// add your jumping-right code
		stroke(1)
		strokeWeight(2);
		//leftleg
		line(gameChar_x - 10,gameChar_y - 25,gameChar_x - 0,gameChar_y -60)
		//rightleg
		line(gameChar_x -5,gameChar_y - 25,gameChar_x + 0,gameChar_y - 60)
		strokeWeight(1);
		fill(150,50,200);
		ellipse(gameChar_x,gameChar_y - 65,35,20);
		fill(200,50,0);
		ellipse(gameChar_x + 15,gameChar_y - 65,15,7);
		fill(0);
		ellipse(gameChar_x+6,gameChar_y-70,3,3);

	}else if(isLeft)
	{
		// add your walking left code
		stroke(1)
		strokeWeight(2);
		//left leg
		line(gameChar_x - 10,gameChar_y-15,gameChar_x - 5,gameChar_y - 40)
		line(gameChar_x - 5,gameChar_y,gameChar_x - 10,gameChar_y - 15)
		//right leg
		line(gameChar_x + 14,gameChar_y,gameChar_x + 7,gameChar_y - 40)
		strokeWeight(1);
		fill(150,50,200);
		ellipse(gameChar_x,gameChar_y - 45,20,35);
		fill(200,50,0);
		ellipse(gameChar_x - 10,gameChar_y - 45,15,10);
		fill(0);
		ellipse(gameChar_x-3,gameChar_y-55,3,3);
	}else if(isRight)
	{
		// add your walking right code
		stroke(1)
		strokeWeight(2);
		//left leg
		line(gameChar_x - 14,gameChar_y,gameChar_x - 7,gameChar_y - 40)
	
		//right leg
		line(gameChar_x + 5,gameChar_y,gameChar_x + 10,gameChar_y - 15)
		line(gameChar_x + 10,gameChar_y-15,gameChar_x + 5,gameChar_y - 40)
		
		strokeWeight(1);
		fill(150,50,200);
		ellipse(gameChar_x,gameChar_y - 45,20,35);
		fill(200,50,0);
		ellipse(gameChar_x + 10,gameChar_y - 45,15,10);
		fill(0);
		ellipse(gameChar_x+3,gameChar_y-55,3,3);
	}else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		stroke(1)
		strokeWeight(2);
		line(gameChar_x - 15,gameChar_y - 20,gameChar_x - 5,gameChar_y - 45)
		line(gameChar_x + 15,gameChar_y - 20,gameChar_x + 5,gameChar_y - 45)
		strokeWeight(1);
		fill(150,50,200);
		ellipse(gameChar_x,gameChar_y - 55,35,30);
		fill(200,50,0);
		ellipse(gameChar_x,gameChar_y - 55,10,10);
		fill(0);
		ellipse(gameChar_x+5,gameChar_y-65,3,3);
		ellipse(gameChar_x-5,gameChar_y-65,3,3);
	}else
	{
		// add your standing front facing code
		stroke(1)
		strokeWeight(2);
		line(gameChar_x - 10,gameChar_y,
			gameChar_x - 7,gameChar_y - 40);
		line(gameChar_x + 10,gameChar_y,
			gameChar_x + 7,gameChar_y - 40);
		strokeWeight(1);
		fill(150,50,200);
		ellipse(gameChar_x,gameChar_y - 45,30,35); //body
		//nose
		fill(200,50,0);
		ellipse(gameChar_x,gameChar_y - 45,10,10); 
		//eyes
		fill(0);
		ellipse(gameChar_x+5,gameChar_y-55,3,3);
		ellipse(gameChar_x-5,gameChar_y-55,3,3);

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(isLeft == true)
	{
		gameChar_x -= 1;
	}
	if(isRight == true)
	{
		gameChar_x += 1;
	}
	
}

function moveLogic()
{
	if(isLeft && gameOver == false)
	{
		if(gameChar_x > width * 0.35)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight && gameOver == false)
	{
		if(gameChar_x < width * 0.65)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}
}

function riseFall()
{
	if(isPlummeting == true)
	{
		gameChar_y += 5;
	}

	if(gameChar_y != floorPos_y && gameOver == false)
	{
		gameChar_y +=1;
		isFalling = true;
	}
	else{
		isFalling = false;
	}
}
// ---------------------
// Life & Game Functions
// ---------------------
function startGame()
{
	makeWorld();
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	gameOver = false;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	game_score = 0;
}

function checkPlayerDie()
{
	if(gameChar_y > height + 200)
	{
		lives -= 1;
		if(lives > 0)
		{
			startGame();
		}
	}
}

function drawUI()
{
	fill(255);
	noStroke()
	text("Score: " + game_score, 50,50);

	fill(255);
	noStroke();
	text("Lives: " ,50,30);
	for(var i = lives; i > 0; i--)
	{
		fill(230,220,100);
		ellipse(80 + (i* 15), 25, 10);
	}

}

function endGame()
{
	if(lives < 1)
		{
			gameOver = true;
		
			push();
			fill(255,0,0);
			textSize(42);
			text("Game Over. Press space to continue.", 150, height/2)
			pop();	
			
			theme.stop();
		}

		if(flagPole.isReached)
		{
			push();
			fill(0,255,0);
			textSize(42);
			text("Level complete. Press space to continue.", 150, height/2)
			pop();
			theme.stop();

			gameOver = true;
		}
}

function audioManager()
{
	soundFormats('mp3','wav');
	jumpSound = loadSound('assets/jump.wav');
	coin = loadSound('assets/coin.wav')
	theme = loadSound('assets/theme.wav')

	jumpSound.setVolume(0.1);
	coin.setVolume(0.1);
	theme.setVolume(0.1);
}

function gameManager()
{
	// Draw Score & Life

	drawUI();
		
	//Game Functions
	checkPlayerDie();
	endGame();

	// Logic to make the game character move or the background scroll.
	moveLogic();

	// Logic to make the game character rise and fall.
	riseFall();

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Stops a bug where the player can continue moving right as long as they hold the key down
	if(gameOver)
	{
		isRight = false;
	}

	
}

function setGradient(x, y, w, h, c1, c2) {
	noFill();

	c1 = color(0, 60, 180);
	c2 = color(0, 150, 255);
	
	for (let i = y; i <= y + h; i++) {
		let inter = map(i, y, y + h, 0, 1);
		let c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x, i, x + w, i);
	}
} 
// ---------------------------
// Making and creating the world and it's functions
// ---------------------------

function drawWorld()
{
	// Draw clouds.
	clouds.draw();
	clouds.move();

	// Draw mountains.
	mountains.draw(-120,-200,200);
	mountains.draw(-40,-200,250);
	mountains.draw(120,200,200);
	mountains.draw(200,200,300);
	mountains.draw(40,200,250);
	mountains.draw(450,300,150);
	mountains.draw(900,350,100);

	// Draw trees.
	trees.draw();

	// Draw canyons.
	canyons.myCanyons();	

	// Draw collectable items.
	collectables.draw();
	collectables.check();

	// Draw Flagpole
	flagPole.renderFlagpole();
	flagPole.checkFlagpole();
}

function makeWorld()
{
	clouds = {
		x:[-280,100,400,800,1200,1500],
		y:[120,100,130,70,120,100],
		cloudWidth:[120,100,80,150,150,100],
		draw: function()
			{
				for(var i = 0; i < this.x.length; i++)
				{
					fill(235)
					rect(this.x[i],this.y[i],this.cloudWidth[i],25);
					ellipse(this.x[i],this.y[i],this.cloudWidth[i],50);
					ellipse(this.x[i] + this.cloudWidth[i],this.y[i],this.cloudWidth[i],50);
					ellipse(this.x[i] + this.cloudWidth[i]/2, this.y[i] - 25,this.cloudWidth[i] + 25,60);
				}
			},

		move: function()
			{
				for(var i = 0; i < this.x.length; i++)
				{
					this.x[i] += .5;

					if(this.x[i] + 100 > 1900)
					{
						this.x[i] = -350;
						this.cloudWidth[i] *= random(.8,1.2);
					}
				}
			}
	}

	mountains = {
		draw: function(x,mWidth,mHeight)
		{
			fill(60,60,80);
			triangle(x,floorPos_y,
					x + mWidth,floorPos_y,
					x+mWidth/2,mHeight);
			fill(60/2,60/2,80/2);
			triangle(x,floorPos_y,
					x + mWidth/4,floorPos_y,
					x+mWidth/2,mHeight);
		}
	}

	trees = {
		x: [-300,-150,150,250,350,500,800,1300,1800],
		draw: function()
		{
			for(var i = 0; i < this.x.length; i++)
			{
				fill(120,60,20);
				// rect(805,350,10,82);
				rect(this.x[i] - 100,floorPos_y - 70,10,74);
				fill(50,140,30);
				triangle(this.x[i] - 135,floorPos_y - 40,
						this.x[i] - 55,floorPos_y - 40,
						this.x[i] - 95,floorPos_y - 120);
				
				fill(40,120,25);
				triangle(this.x[i] - 130,floorPos_y - 60,
					this.x[i] - 60,floorPos_y - 60,
					this.x[i] - 95,floorPos_y - 140);
				fill(20,100,10);
				triangle(this.x[i] - 120,floorPos_y - 95,
					this.x[i] - 70,floorPos_y - 95,
					this.x[i] - 95,floorPos_y - 160);
			}
		}

	}

	flagPole = {
		xPos: 1500,
		isReached: false,
		renderFlagpole: function()
		{
			push();

			stroke(200,20,20);
			strokeWeight(10);
			line(this.xPos, floorPos_y, this.xPos, floorPos_y - 200)
			fill(255);
			noStroke();
			x = floorPos_y - 30;
			if(flagPole.isReached){
				x -= 170;
				rect(this.xPos, x, 60,30)
			}else{
				rect(this.xPos, x, 60,30)
			}

			pop();
		},
		checkFlagpole: function()
		{
			var d = abs(gameChar_world_x - this.xPos)

			if(d < 30)
			{
				flagPole.isReached = true;
			}
		}

	}

	canyons = {
		info: [{x_pos: -50, width: 60},
			{x_pos: 300, width: 80},
			{x_pos: 750, width: 100},
			{x_pos: 1600, width: 70}],
		myCanyons: function()
		{
			for(var i = 0; i < canyons.info.length;i++)
			{
			canyons.drawCanyon(this.info[i].x_pos, this.info[i].width);
			canyons.checkCanyon(this.info[i].x_pos,this.info[i].width);
			}
		},
		drawCanyon: function(x,width)
		{
			noStroke();
			fill(30, 10, 10);
			quad(x, 432, 
				x + width, 432, 
				x + width, 576, 
				x, 576);
		},
		checkCanyon: function(x,width)
		{
			if(gameChar_world_x>x && gameChar_world_x<x + width && (gameChar_y >= floorPos_y - 10))
			{
				isPlummeting = true;
				gameChar_x = x + width/2 + scrollPos;  //Make character fall down the middle of the canyon
				
			}
		}


	}

	collectables = {
		info:[{x_pos: 100, y_pos: 400, size: 30, isFound: false},
			{x_pos: 300, y_pos: 400, size: 30, isFound: false},
			{x_pos: 900, y_pos: 400, size: 30, isFound: false}],
		draw: function()
		{
			for(var i = 0; i < this.info.length; i++)
				{
					if(this.info[i].isFound == false){
					stroke(220,220,30);
					strokeWeight(8);
					noFill();
					ellipse(this.info[i].x_pos, this.info[i].y_pos, this.info[i].size, this.info[i].size)
					}
				}
			
		
		},
		check: function()
		{
			for(var i = 0; i < this.info.length; i++)
				if(dist(gameChar_world_x, gameChar_y+50, this.info[i].x_pos, this.info[i].y_pos+50) < 40 && this.info[i].isFound == false)
				{
					this.info[i].isFound = true;
					coin.play();
					game_score ++;
				}
		}
	}
}