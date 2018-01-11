var canvas = document.getElementById("myCan");
var ctx = canvas.getContext('2d');
var snakes = [];
var x = 200;
var y = 80;
var direction = "right";
var meal = false;
// var extra = false;
var randomX = [];
var randomY = [];
var isfull = false;
var score = 0;
var counter = 0;
var randomBonus = 0;

for (var i=0; i<=19; i++) {
	randomX[i] = i*20+40;
}
for (var i=0; i<=6; i++) {
	randomY[i] = i*20+60;
}
//dfgfg//


//DRAW BORDER//
ctx.strokeStyle = '#051B05';
ctx.lineWidth = 3;
ctx.strokeRect(39, 59, 401, 201);
ctx.beginPath();
ctx.moveTo(38, 45);
ctx.lineTo(441, 45);
ctx.stroke();
ctx.font = '22px Homespun';

function RandomPositionX() {
    	return randomX[Math.floor(Math.random()*20)];
}
function RandomPositionY() {
    	return randomY[Math.floor(Math.random()*7)];
}


function Feed(x,y) {
	this.x = x;
	this.y = y;
	this.img = new Image();
	this.img.src = "feed.png";
}

function Bonus(x, y) {
	this.x = x;
	this.y = y;
	this.img = new Image();
	this.img.src = "bonus.png";
}



var src = "1.png";
function Segment(x, y, src, isturn, isfull){
	this.x = x;
	this.y = y;
	this.img = new Image();
	this.img.src = src;
	this.isturn = isturn;
	this.isfull = isfull;
};

//KEYBOARD LISTENER//

window.addEventListener("keydown", changeDirection, false);

function changeDirection(event) {
  var x = event.which || event.keyCode;
  if(x===37  && direction != "right" && direction != "left") {
    direction = "left";
    snakes[0].isturn = true;
  }
  if(x===38  && direction != "down" && direction != "up") {
    direction = "up";
    snakes[0].isturn = true;
  }
  if(x===39  && direction != "left" && direction != "right") {
    direction = "right";
    snakes[0].isturn = true;
  }
  if(x===40  && direction != "up" && direction != "down") {
    direction = "down";
    snakes[0].isturn = true;
  }
  window.removeEventListener("keydown", changeDirection, false);
}


function initialize(){
for(i=0; i<8; i++) {
		x -= 20;
		snakes.push(new Segment(x, y, src, false));
	}
	x = 200;
}

var feed = new Feed();
var bonus = new Bonus();

function createFeed(){
	if(!meal) {
		feed = new Feed(RandomPositionX(), RandomPositionY());
		meal = true;
	}
	ctx.drawImage(feed.img, feed.x, feed.y);
}

function createBonus(){
	bonus = new Bonus(-100, -100);
}

createBonus();


function update() {
	window.addEventListener("keydown", changeDirection, false);
	ctx.clearRect(40, 60, 400, 200);
	ctx.clearRect(0, 0, 450, 40);
	ctx.fillText(("000" + score).slice(-4), 40, 40);
	var newHead = new Segment(x, y, src);
	snakes.unshift(newHead);

	//CREATING FEED//

	createFeed();
	ctx.drawImage(bonus.img, randomBonus, 0, 20, 20, bonus.x, bonus.y, 20, 20);


	for(var i=1; i<snakes.length; i++) {
		if(feed.x == snakes[i].x && feed.y == snakes[i].y) {

			createFeed();
			meal = false;

		}
		if(bonus.x == snakes[i].x && bonus.y == snakes[i].y) {
			bonus.x = RandomPositionX();
			bonus.Y = RandomPositionY();
			counter = 0;
		}
	}

	//COLISION DETECTION//
	if(newHead.x == feed.x && newHead.y == feed.y) {
		meal = false;
		snakes[0].isfull = true;
		score++;
		if(score%5 == 0) {
			randomBonus = (Math.floor(Math.random()*2))*20;
			bonus.x = RandomPositionX();
			bonus.y = RandomPositionY();
			counter = 3000;
		}
	}

	if(newHead.x == bonus.x && newHead.y == bonus.y) {
		snakes[0].isfull = true;
		score +=6;
	}

	if(counter > 0) {
		counter -= 100;
		ctx.drawImage(bonus.img, randomBonus, 0, 20, 20, 399, 23, 20, 20);
		ctx.fillText(("0" + (counter/100)).slice(-2), 420, 40);
	} else {
		bonus.x = -100;
	}




	if(!snakes[snakes.length-1].isfull) {
		snakes.splice(snakes.length-1, 1);
	} else {
		snakes[snakes.length-1].isfull = false;
	}


	for(var i=1; i<snakes.length; i++) {

		if(snakes[i].isturn == true) {
			ctx.drawImage(snakes[i].img, 0, 0, 20, 20, snakes[i].x, snakes[i].y, 20, 20);
			ctx.drawImage(snakes[i].img, 40, 0, 20, 20, snakes[i-1].x, snakes[i-1].y, 20, 20);
		} else if(snakes[i-1].isfull == true) {
			ctx.drawImage(snakes[i].img, 60, 0, 20, 20, snakes[i].x, snakes[i].y, 20, 20);
			ctx.drawImage(snakes[i-1].img, 80, 0, 20, 20, snakes[i-1].x, snakes[i-1].y, 20, 20);
		}
		else {
			ctx.drawImage(snakes[i].img, 0, 0, 20, 20, snakes[i].x, snakes[i].y, 20, 20);
		}

		if(newHead.x == snakes[i].x && newHead.y == snakes[i].y) {
			snakes = [];
			score = 0;
			x = 220;
			y = 80;
			direction = "right";
			src = "1.png";
			createBonus();
			counter = 0;
			initialize();
		}
	}

	if(direction == "right" || direction == "up"){
			ctx.drawImage(snakes[0].img, 0, 20, 20, 20, snakes[0].x, snakes[0].y, 20, 20);

	}
	if(direction == "left" || direction == "down"){
		ctx.drawImage(snakes[0].img, 0, 40, 20, 20, snakes[0].x, snakes[0].y, 20, 20);
	}




	if(direction == "right"){
		x += 20;
	    if(x > 420) {
	    	x = 40;
	    }
	    src = "1.png";
	    if((snakes[0].y == feed.y && Math.abs(snakes[0].x - feed.x) == 20) || (snakes[0].y == bonus.y && Math.abs(snakes[0].x - bonus.x) == 20)) {
			ctx.drawImage(snakes[0].img, 20, 20, 20, 20, snakes[0].x, snakes[0].y, 20, 20);
		}
	}
	if(direction == "down"){
	    y += 20;
	    if(y > 240) {
	    	y = 60;
	    }
	    src = "4.png";
	    if((snakes[0].x == feed.x && Math.abs(snakes[0].y - feed.y) == 20) || (snakes[0].x == bonus.x && Math.abs(snakes[0].y - bonus.y) == 20)) {
			ctx.drawImage(snakes[0].img, 20, 40, 20, 20, snakes[0].x, snakes[0].y, 20, 20);
		}
	}
	if(direction == "left"){
	    x -= 20;
	    if(x < 40) {
	    	x = 420;
	    }
	    src = "3.png";
	    if((snakes[0].y == feed.y && Math.abs(snakes[0].x - feed.x) == 20) || (snakes[0].y == bonus.y && Math.abs(snakes[0].x - bonus.x) == 20)) {
			ctx.drawImage(snakes[0].img, 20, 40, 20, 20, snakes[0].x, snakes[0].y, 20, 20);
		}
	}
	if(direction == "up"){
	    y -= 20;
	    if(y < 60) {
	    	y = 240;
	    }
	    src = "2.png";
	    if((snakes[0].x == feed.x && Math.abs(snakes[0].y - feed.y) == 20) || (snakes[0].x == bonus.x && Math.abs(snakes[0].y - bonus.y) == 20)) {
			ctx.drawImage(snakes[0].img, 20, 20, 20, 20, snakes[0].x, snakes[0].y, 20, 20);
		}
	}
}

setInterval(update, 100);





initialize();
