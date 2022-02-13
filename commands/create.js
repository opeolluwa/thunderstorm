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

    //prompt user for name of application
    const response = await prompts({
        type: 'text',
        name: 'name',
        message: chalk.yellow('Name of application ?')
    });
    //TODO: GET application name and create dir having thaT NAME
    // console.log(response.meaning);

    //inquire the type of app to be created, default or custom
    const radioSelect = new RadioSelect({
        name: 'application preset',
        message: chalk.yellow('Please select a preset'),
        choices: [
            'Proceed with defaults',
            'Manually Select features'
        ]
    });

    //parse user option and follow down the path
    radioSelect.run()
        .then(function (answer) {
            // get the user option 
            if (answer === "Proceed with defaults") {
                //TODO: add default config here to generate config 
                console.log("default");
            }
            if (answer === "Manually Select features") {
                // available options
                const applicationFeatures = [
                    { title: 'Analytics', value: 'analytics' },
                    { title: 'Contacts management', value: 'contacts' },
                    { title: 'Emails', value: 'emails' },
                    { title: 'Files Backup', value: 'files' },
                    { title: 'News letter', value: 'letters' },
                    { title: 'Email Templates', value: 'templates' },
                    { title: 'User Authentication', value: 'authentication' },
                ]
                //selected options
                const selected = (items) => items
                    .filter((item) => item.selected)
                    .map((item) => item.value)
                //multi select generation options
                const options = {
                    cursor: 0,
                    hint: '(Use arrow keys to navigate, space to select)'
                }

                multiselect(chalk.hex('#fdca00').bold('Please select a preset'), applicationFeatures, options)
                    .on('data', (data) => console.log('Changed to', selected(data.value)))
                    .on('abort', (items) => console.log('Aborted with', selected(items)))
                    //TODO: get user option here
                    .on('submit', (items) => console.log('Submitted with', selected(items)))
            }
        });




};

module.exports = { create }