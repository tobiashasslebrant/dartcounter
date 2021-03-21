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
	var score = event.results[0][0].transcript;
	game501(score);
}

//$('#start-btn').on('click', function(e) {
//	game501(40);
//});

function game501(score){
	var total = scores.reduce((a, b) => a + b, 0)
	if(score == "back")
	{
		scores.pop();
	}
	if(score == "done")
	{
		scores = [];
	}
	if(!isNaN(score))
	{
		var remaining = 501-total+score;
		var error = '';
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
			//			recognition.start();
		}
	}
}

