
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition = new SpeechRecognition();

var Textbox = $('#textbox');
var instructions = $('instructions');

var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;


//  var transcript = event.results[current][0].transcript;
  var transcript = event.results[0][0].transcript;
 	console.log('recieved')
	console.log(transcript);
    Content += transcript;
    Textbox.val(Content);
  
};

recognition.onstart = function() { 
  instructions.text('Voice recognition is ON.');
}

recognition.onspeechend = function() {
  instructions.text('No activity.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('Try again.');  
  }
}

$('#start-btn').on('click', function(e) {
console.log('started')
	if (Content.length) {
    Content += ' ';
  }
  recognition.start();
});

Textbox.on('input', function() {
  Content = $(this).val();
})
