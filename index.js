var Radio = require('prompt-radio');
var prompt = new Radio({
  name: 'colors',
  message: 'Favorite flavor?',
  choices: [
    'chocolate',
    'strawberry',
    'vanilla'
  ]
});

// async
prompt.ask(function(answer) {
    console.log(answer);
    // chocolate
  });