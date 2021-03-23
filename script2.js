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
	total: 0,
	finishingDarts:0
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
			total: 0,
			finishingDarts:0
		};
	}
	else if (input == "back")
	{
		document.getElementById("info").innerHTML = "Removed last score";
		game.scores.pop();
	}
	else if (input == "first")
	{
		finishGame(1);
	}
	else if (input == "second")
	{
		finishGame(2);
	}
	else if (input == "third")
	{
		finishGame(3);
	}

	else if(!isNaN(input))
	{
		var score = parseInt(input);
		var total = game.scores.reduce((a, b) => a + b, 0) + score;
		var remaining = 501-total;

		if(remaining == 1 || remaining < 0)
		{
			document.getElementById("info").innerHTML = "to high";
		}
		else
		{
			game.scores.push(score);
			game.remaining = remaining;
			game.total = total;

			
			if(game.remaining == 0)
			{
				game.darts = "waiting for input";
			}
			else
			{
				game.darts = (game.scores.length * 3);
			}
	
			console.log(game);
		}
	}
	RenderResult();
}

function RenderResult()
{
	var scores =  document.getElementById("scores");
	while( scores.firstChild ){
		scores.removeChild( scores.firstChild );
	}

	game.scores.forEach((item, index, arr) => {
		var node = document.createElement("div");
		var textnode = document.createTextNode(arr[index]);
		node.appendChild(textnode);
		scores.appendChild(node);
	});


	document.getElementById("remaining").innerHTML = game.remaining;
	document.getElementById("darts").innerHTML = game.darts;
}
function finishGame(finishingDarts){
	document.getElementById("info").innerHTML = "Game finished";
	game.finishingDarts = finishingDarts;
	game.darts = ((game.scores.length - 1) * 3) + game.finishingDarts;
}

