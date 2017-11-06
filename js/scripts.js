var canvas = document.getElementById("myCan");
var ctx = canvas.getContext('2d');
var snakes = [];
var movedir = 1;
var x = 200;
var y = 70;
var direction = "right";

ctx.strokeRect(39, 59, 401, 201);

var img = new Image();
img.src = "1.jpg";
function Segment(x, y){
	this.x = x;
	this.y = y;
};


function initialize(){
for(i=0; i<5; i++) {
		x -= 20;
		snakes.push(new Segment(x, y)); 
		console.log(snakes[i]);
	}
	x = 200;
}



function update() {
	ctx.clearRect(40, 60, 400, 200);
	var newHead = new Segment(x, y); 
	for(i=0; i<5; i++) { 
		ctx.drawImage(img, snakes[i].x, snakes[i].y);   
	}
	snakes.unshift(newHead); 
	snakes.splice(snakes.length-1, 1);
	if(direction == "right"){
		x += 20;
	    if(x > 501) {
	    	x = 0;
	    }
	    img.src = "1.jpg";
	}
	if(direction == "down"){
	    y += 20;
	    if(y > 501) {
	    	y = 0;
	    }
	    img.src = "2.jpg";
	} 
	if(direction == "left"){
	    x -= 20;
	    if(x < 0) {
	    	x = 521;
	    }
	    img.src = "1.jpg";
	}
	if(direction == "up"){
	    y -= 20; 
	    if(y < 0) {
	    	y = 521;
	    }
	    img.src = "2.jpg";
	}
}
setInterval(update, 300);



window.addEventListener("keydown", changeDirection, false);

function changeDirection(event) {
  var x = event.which || event.keyCode;
  if(x===37  && direction != "right") {
    direction = "left";
  }
  if(x===38  && direction != "down") {
    direction = "up"; 
  }
  if(x===39  && direction != "left") {
    direction = "right";
  }
  if(x===40  && direction != "up") {
    direction = "down";
  }
}

initialize();