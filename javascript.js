var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var crowRight = new Image();
crowRight.src = "images/crowRight.png";

var crowLeft = new Image();
crowLeft.src = "images/crowLeft.png";

//Key event listener
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);


	var rightPressed = false;
	var leftPressed = false;
	var downPressed = false;
	var upPressed = false;

	function keyDownHandler(e) {
	    if( e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
	        rightPressed = true;
	    }
	    else if( e.key == "Left" || e.key == "ArrowLeft"||  e.key == "a") {
	        leftPressed = true;
	    }
	    else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
	        upPressed = true;
	    }
	    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
	        downPressed = true;
	    }
	}

	function keyUpHandler(e) {
	    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
	        rightPressed = false;
	    }
	    else if(e.key == "Left" || e.key == "ArrowLeft"||  e.key == "a") {
	        leftPressed = false;
	    }  
	    else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
	        upPressed = false;
	    }
	    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
	        downPressed = false;
	    }
	}

//touchpad support
	function startup() {
  		canvas.addEventListener("touchstart", handleStart, false);
	 	canvas.addEventListener("touchend", handleEnd, false);
	    canvas.addEventListener("touchcancel", handleCancel, false);
	    canvas.addEventListener("touchmove", handleMove, false);
	}

	document.addEventListener("DOMContentLoaded", startup);

	var ongoingTouches = [];

	function handleStart(evt) {
		  evt.preventDefault();
		  var touches = evt.changedTouches;

		  for (var i = 0; i < touches.length; i++) {
		    console.log("touchstart:" + idx + ',' + touches[i].pageX + ','  +touches[i].pageY);
		    ongoingTouches.push(copyTouch(touches[i]));
		  }
	}

	function handleMove(evt) {
	  evt.preventDefault();
	  var touches = evt.changedTouches;

	  for (var i = 0; i < touches.length; i++) {
	    var idx = ongoingTouchIndexById(touches[i].identifier);

	    if (idx >= 0) {
	      console.log("continuing touch "+ idx + ',' + touches[i].pageX + ','  +touches[i].pageY);
	      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
	    } else {
	      console.log("can't figure out which touch to continue");
	    }
	  }
	}

	function handleEnd(evt) {
	  evt.preventDefault();
	  var touches = evt.changedTouches;

	  for (var i = 0; i < touches.length; i++) {
	   
	    var idx = ongoingTouchIndexById(touches[i].identifier);

	    if (idx >= 0) {
	    	console.log('touchend:'+i + ',' + touches[i].pageX + ','  +touches[i].pageY)
	    } else {
	      console.log("can't figure out which touch to end");
	    }
	  }
	}

	function handleCancel(evt) {
	  evt.preventDefault();
	  console.log("touchcancel.");
	  var touches = evt.changedTouches;

	  for (var i = 0; i < touches.length; i++) {
	    var idx = ongoingTouchIndexById(touches[i].identifier);
	    ongoingTouches.splice(idx, 1);  // remove it; we're done
	  }
	}
	
	function ongoingTouchIndexById(idToFind) {
      for (var i = 0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;
    
        if (id == idToFind) {
          return i;
        }
      }
      return -1;    // not found
    }
    
    function copyTouch({ identifier, pageX, pageY }) {
      return { identifier, pageX, pageY };
    }
    



var crowX = 0.5 * canvas.width;
var crowY = 0.5 * canvas.height;

var CrowSide;

function CrowMove (){
	//right-left axis
	var CrowSpeed = 2;

	if (rightPressed){
		crowX += CrowSpeed;
		CrowSide = true;
	}else if(leftPressed){
		crowX -= CrowSpeed;
		CrowSide = false;
	};

	if (upPressed) {
		crowY -= CrowSpeed;
	}else if(downPressed){
		crowY += CrowSpeed;
	}
	
};

function CrowDraw (){
	if (CrowSide == true) {
		ctx.drawImage(crowRight, crowX, crowY);
	} else {
		ctx.drawImage(crowLeft, crowX, crowY);
	}
}


function draw(){

   	ctx.clearRect(0, 0, canvas.width, canvas.height);

   	CrowMove();

	CrowDraw ();

	requestAnimationFrame(draw);

}

draw();

// var interval= setInterval(draw, 100)