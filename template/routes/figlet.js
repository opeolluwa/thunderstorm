const chalk = require('chalk');
const figlet = require('figlet');

// figlet('Hello World!!', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

console.log(
    chalk.yellow(
      figlet.textSync('RESTify', { horizontalLayout: 'full',  })
    )
  );