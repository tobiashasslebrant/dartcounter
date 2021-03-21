var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function() {
  recognition.start();
}

var scores = [];

recognition.onresult = function(event) {
	var input = event.results[0][0].transcript;
	game501(input);
}

//$('#start-btn').on('click', function(e) {
//	game501(40);
//});

function game501(input){
	if(input == "back")
	{
		scores.pop();
	}
	if(input == "done")
	{
		scores = [];
	}
	if(!isNaN(input))
	{
		var score = parseInt(input);
		var total = scores.reduce((a, b) => a + b, 0)
		var remaining = 501-total-score;
		if(remaining == 0)
		{
			console.log("Done! darts: " + scores.length * 3)
			scores = [];
		}
		if(remaining < 0)
		{
			console.log('to high');
		}

		else
		{
			document.getElementById("instructions").innerHTML = score;
			scores.push(score)
			console.log(scores);
			console.log("remaining:" + remaining);
		}
	}
}

