const prompts = require('prompts');
const chalk = require('chalk');
const figlet = require('figlet');
const RadioSelect = require('prompt-radio');
const multiselect = require('multiselect-prompt')


async function create() {
    //show off banner 
    console.log(
        chalk.yellow(
            figlet.textSync('RESTify', { horizontalLayout: 'full', })
        )
    );

    const response = await prompts({
        type: 'text',
        name: 'meaning',
        message: chalk.yellow('Name of application ?')
    });
    //TODO: GET application name and create dir having thaT NAME
    // console.log(response.meaning);


    var radioSelect = new RadioSelect({
        name: 'application preset',
        message: chalk.yellow('Please select a preset'),
        choices: [
            'Proceed with defaults',
            'Manually Select features'
        ]
    });

    // async
    radioSelect.ask(function (answer) {
        console.log(answer);
        // chocolate
    });




    // const colors = [
    //     { title: 'Proceed with defaults', value: 'default' },
    //     { title: 'Manually Select features', value: 'manual' },
    // ]

    // const selected = (items) => items
    //     .filter((item) => item.selected)
    //     .map((item) => item.value)

    // const options = {
    //     cursor: 0,
    //     hint: '(Use arrow keys to navigate, space to select)'
    // }


    // multiselect(chalk.hex('#fdca00').bold('Please select a preset'), colors, options)
    //     .on('data', (data) => console.log('Changed to', selected(data.value)))
    //     .on('abort', (items) => console.log('Aborted with', selected(items)))
    //     //TODO: get user option here
    //     .on('submit', (items) => console.log('Submitted with', selected(items)))
};

module.exports = { create }