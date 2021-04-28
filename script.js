var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var numberCmds = [...Array(180).keys()];
var otherCmds = ['game', 'back', 'first','second','third', 'fart', 'ford'];
var voiceCmds = numberCmds.concat(otherCmds);
var grammar = '#JSGF V1.0; grammar voiceCmds; public <voiceCmd> = ' + voiceCmds.join(' | ') + ' ;'

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var started = false;
var game = {};

document.body.onclick = function() {
	if(started)
	{
		recognition.stop();
		started = false;
		document.getElementById("info").innerHTML = 'Tap to start...';
	}
	else
	{
		recognition.start();
		started = true;
		if(game.darts == 0)
		{
			document.getElementById("info").innerHTML = 'Say "game" for new game';
		}
		else
		{
			document.getElementById("info").innerHTML = 'Waiting for voice...';
		}
	}
}



recognition.onresult = function(event) {
	var lastInputIndex = event.results.length-1;
	var input = event.results[lastInputIndex][0].transcript;
	game501(input.trim());
}

function game501(input){
	document.getElementById("info").innerHTML = "";
	if(input == "game")
	{
		document.getElementById("info").innerHTML = "New game";
		game = {
			scores: [],
			remaining: 501,
			total: 0,
			finishingDarts:0,
			darts: 0

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
	else if (input == "second" || input == "succumbed")
	{
		finishGame(2);
	}
	else if (input == "third" || input == "fart" || input == "ford" || input == "bird" || input == "ferd" || input == "heard" || input == "hard" )
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
				document.getElementById("info").innerHTML = "First, second or third dart?";
				game.darts = "--";
			}
			else
			{
				game.darts = (game.scores.length * 3);
			}
	
			console.log(game);
		}
	}
	else{
		document.getElementById("info").innerHTML =  input + "?";
	}
	RenderResult();
}

function RenderResult()
{
	var scores =  document.getElementById("scores");
	while( scores.firstChild ){
		scores.removeChild( scores.firstChild );
	}

	var runningRemaining = 501;
	game.scores.forEach((item, index, arr) => {
		var score = arr[index];
		runningRemaining = runningRemaining-score;
		var indexNode = document.createElement("div");
		var indexTextnode = document.createTextNode(index+1);
		var scoreNode = document.createElement("div");
		var scoreTextnode = document.createTextNode(score);
		var remainingNode = document.createElement("div");
		var remainingTextnode = document.createTextNode(runningRemaining);
	
		var rowNode = document.createElement("div");

		indexNode.classList.add("cell");
		scoreNode.classList.add("cell");
		remainingNode.classList.add("cell");
		rowNode.classList.add("row");

		indexNode.appendChild(indexTextnode);
		scoreNode.appendChild(scoreTextnode);
		remainingNode.appendChild(remainingTextnode);
		rowNode.appendChild(indexNode);
		rowNode.appendChild(scoreNode);
		rowNode.appendChild(remainingNode);
		scores.appendChild(rowNode);
	});

	document.getElementById("darts").innerHTML = game.darts;
}
function finishGame(finishingDarts){
	if ( game.remaining > 0)
		return;

	document.getElementById("info").innerHTML = "Game finished";
	game.finishingDarts = finishingDarts;
	game.darts = ((game.scores.length - 1) * 3) + game.finishingDarts;
}

