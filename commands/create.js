const prompts = require('prompts');
const chalk = require('chalk');
const multiselect = require('multiselect-prompt')


async function create() {
    const response = await prompts({
        type: 'text',
        name: 'meaning',
        message: chalk.hex('#fdca00').bold('Name of application ?')
    });
    //TODO: GET application name and create dir having thaT NAME
    console.log(response.meaning);



    const colors = [
        { title: 'Proceed with defaults', value: 'default' },
        { title: 'Manually Select features', value: 'manual' },
    ]

    const selected = (items) => items
        .filter((item) => item.selected)
        .map((item) => item.value)

    const options = {
        cursor: 0,
        hint: '(Use arrow keys to navigate, space to select)'
    }


    multiselect(chalk.hex('#fdca00').bold('Please select a preset'), colors, options)
        .on('data', (data) => console.log('Changed to', selected(data.value)))
        .on('abort', (items) => console.log('Aborted with', selected(items)))
        //TODO: get user option here
        .on('submit', (items) => console.log('Submitted with', selected(items)))
};

module.exports = { create }