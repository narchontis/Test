var prob = 50;
var btnStart, btnStop;
var started = false;
var total = 0;

function setup(){
	noCanvas();
	btnStart = select("#start");
	btnStart.mousePressed(startLottery);
	btnStop	 = select("#stop");
	btnStop.mousePressed(stopLottery);
	noLoop();
}

function startLottery(){
	started = true;
	total = 0;
	loop();
}
function stopLottery(){
	started = false;
}

function draw(){
	if (started){
		var r = floor(random(prob));
		var results = select("#results");
		if (r == 1){
			results.html("You won!");

			noLoop();
		}
		else{
			results.html("Try again");
		}
		total++;
		select('#total').html(total)
;	}
}