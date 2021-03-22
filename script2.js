var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function() {
	 document.getElementById("info").innerHTML = "Speak!";
 	 recognition.start();
}

var game = {
	scores: [],
	remaining: 501,
	total: 0
};


recognition.onresult = function(event) {
	var input = event.results[0][0].transcript;
	game501(input);
}

//$('#start-btn').on('click', function(e) {
//	game501(40);
//});

function game501(input){
	if(input == "new")
	{
		document.getElementById("info").innerHTML = "New game";
		game = {
			scores: [],
			remaining: 501,
			total: 0
		};
		roundComplete();
	}
	if(input == "back")
	{
		document.getElementById("info").innerHTML = "Removed last score";
		game.scores.pop();
		roundComplete();
	}
	else if (input == "first")
	{
		roundComplete(1);
		finishGame();
	}
	else if (input == "second")
	{
		roundComplete(2);
		finishGame();
	}
	else if (input == "third")
	{
		roundComplete(3);
		finishGame();
	}

	else if(!isNaN(input))
	{
		var score = parseInt(input);
		var total = scores.reduce((a, b) => a + b, 0)
		var remaining = 501-total-score;

		if(remaining == 1 || remaining < 0)
		{
			console.log('to high');
		}
		else
		{
			game.scores.push(score);
			game.remaining = remaining;
			game.total = total;
			console.log(scores);
			console.log("remaining:" + remaining);
		}
	}
}
function roundComplete(noOfDarts = 0){
	document.getElementById("scores").innerHTML = game.scores;
	document.getElementById("rounds").innerHTML = game.scores.length;
	document.getElementById("darts").innerHTML = (game.scores.length * 3) + noOfDarts;

}
function finishGame(){
	game501("new");
	document.getElementById("info").innerHTML = "Game finished";
}

