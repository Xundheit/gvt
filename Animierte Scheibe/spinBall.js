"use strict";

var ball;
var count = 1;
var isSpinning = false;

window.onkeydown = function(evt) {

        console.log(evt);

        var key = evt.which ? evt.which : evt.keyCode;
        var c = String.fromCharCode(key);

        switch (c) {
        case ('L'):
            spinBallLeft();
            break;
        case ('R'):
            spinBallRight();
            break;
        case ('A'):
            spinContinuously();
            break;
        };

    }; 

var spinBallRight = function (){
	if(count < 12){
		count++;
	} else if (count === 12) {
		count = 1; 
	};
	console.log(count);
	var ball = document.getElementById('ball');
	ball.src = "images/bild"+count+".png";
	
 
};

var spinBallLeft = function (){
	if(count > 1){
		count--;
	} else if (count === 1) {
		count = 12;
	};
	console.log(count);
 var ball = document.getElementById('ball');
 ball.src = "images/bild"+count+".png";
};

var spinContinuously = async function () {
	if (isSpinning) {
		isSpinning = false;
		
	} else {
		isSpinning = true;
	}
	console.log(isSpinning);
	
	 do { spinBallRight();
	 await new Promise(r => setTimeout(r, 100));
	 } while(isSpinning);
};