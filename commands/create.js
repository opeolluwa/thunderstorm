const prompts = require('prompts');
const chalk = require('chalk');
const figlet = require('figlet');
const { mkdir } = require("fs");


async function create() {
    //show off banner 
    console.log(
        chalk.yellow(
            figlet.textSync('RESTify', { horizontalLayout: 'full', })
        )
    );

    //application question to be used in creating application with restify-cli
    const questions = [
        {
            //prompt user for name of application
            type: 'text',
            name: 'name',
            message: chalk.yellow('Name of application ?')
        },

        {
            //prompt user for application entry point default to (index.js)
            type: 'text',
            name: 'entry',
            message: chalk.yellow('Application Entry point (index.js) ?')
        },

        {
            //prompt user for name of application
            type: 'text',
            name: 'description',
            message: chalk.yellow('Application Description ?')
        },
        {
            //prompt user for name of application
            type: 'text',
            name: 'version',
            message: chalk.yellow('Application version number (1.0.0) ?')
        },
        {
            //prompt user for name of application
            type: 'text',
            name: 'license',
            message: chalk.yellow('Application version number (ISC) ?')
        },
        {
            //prompt for repo link
            type: 'text',
            name: 'repository',
            message: chalk.yellow('Application Repository ?')
        },
        //application preset
        {
            type: 'select',
            name: 'preset',
            message: chalk.yellow('Please select a preset'),

            choices: [
                { title: 'Proceed with defaults', value: 'default' },
                { title: 'Manually Select features', value: 'manual' },
                { title: 'Initialize a starter template', value: 'blank' }
            ],
        }
    ]
    //git this feedback to the user when the application has been created
    //TODO: create routes controllers and 
    //TODO: add all lib modules here
    const createdFeedback = (appName, appEntry) => console.log(` 
    created : ${appName}/
    created : ${appName}/config/
    created : ${appName}/config/config.js
    created : ${appName}/controllers/
    created : ${appName}/controllers/
    created : ${appName}/lib/
    created : ${appName}/middleware/
    created : ${appName}/migrations/
    created : ${appName}/models/
    created : ${appName}/routes/
    created : ${appName}/seeders/
    created : ${appName}/${appEntry}.js
    created : ${appName}/package.json
    created : ${appName}/.gitignore
    created : ${appName}/.env

    change directory:
      $ cd ${appName}
    
    install dependencies:
      $ npm install
    
    run the app in development:
      $ npm run dev

      run the app in production:
      $ npm run start
    `);
    ///log use application 
    const application = await prompts(questions);


    //pares project preset
    if (application.preset === "default") {
        Object.assign(application, { preset: "default" })
    }
    else if (application.preset === "blank") {
        Object.assign(application, { preset: "blank" })
    }
    else {
        const variant = await prompts({
            type: 'multiselect',
            name: 'color',
            message: chalk.yellow('Please select a preset'),
            choices: [
                { title: 'Analytics', value: 'analytics' },
                { title: 'Contacts management', value: 'contacts' },
                { title: 'Emails', value: 'emails' },
                { title: 'Files Backup', value: 'files' },
                { title: 'News letter', value: 'letters' },
                { title: 'Email Templates', value: 'templates' },
                { title: 'User Authentication', value: 'authentication' },
            ],
            /*    hint: "hhha" */
        });

        Object.assign(application, { preset: variant })
    }

    console.log(application);
    createdFeedback(application.name, application.entry)
    //get the option and create folder in present directory here
    /*  const { name } = application;
     mkdir(name, { recursive: true }, (err) => {
         if (err) throw err;
         console.log("done")
     }); */
};

module.exports = { create }