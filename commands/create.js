const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const { pkg } = require('../templates/package');
const mkdirp = require('mkdirp');
const { envTemplate } = require('../templates/env');
const { gitIgnoreTemplate } = require('../templates/gitignore');
const { readmeTemplate } = require('../templates/readme');



/**
 * create an asynchronous function to take user preference and create a template, but first
 * 1. parse the application name (@param {app} application_name), from the init command =>$ thunderstorm init <app>
 * 2. @param {packages} application_dependencies, specified with -p or --packages option => $ thunderstorm init <app> -p express passport dotenv 
 * 3. @param {env} application_environment_variables parsed from the init command=> $  thunderstorm init <app> -e JWT_KEY=the-old-witches SESSION_SECRET=wall-lock-of-nivana
 */
async function create(app, { packages, env }) {
    //decouple the parsed argument from the initialization command  => $ thunderstorm init <app> ... 
    const APPLICATION_NAME = app;
    const ENVIRONMENT_VARIABLE = env ? env.join(`

`) : `${envTemplate}`;

    // console.log(app, packages, env);
    //show off the applications banner 
    console.log(
        chalk.yellow(
            figlet.textSync('thunderstorm', {
                horizontalLayout: 'fitted',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true
            })
        )
    );


    //application question to be used in compiling user choice
    const questions = [
        {
            //prompt user for name of application
            type: 'text',
            name: 'registry',
            message: 'Package manager default to (npm)',
            initial: 'npm'
        },

        {
            //prompt user for language to use
            type: 'text',
            name: 'language',
            message: 'include  (Y/n)',
            initial: 'Y'
        },
        {
            //prompt user to include nodemon as dev dependency
            type: 'text',
            name: 'use_nodemon',
            message: 'include nodemon as dev dependency (Y/n)',
            initial: 'y'
        },

        {
            //prompt user for application indexFile point default to (index.js)
            type: 'text',
            name: 'indexFile',
            message: 'Application entry point, default to (index.js) ?',
            initial: 'index.js'
        },

        {
            //prompt user for name of application, this will be added to package.json description field
            type: 'text',
            name: 'description',
            message: 'Application Description ?'
        },
        {
            //prompt user for name of application
            type: 'text',
            name: 'version',
            message: 'Application version number, default to (1.0.0)',
            initial: '1.0.0'
        },
        {
            //prompt user for name of application
            type: 'text',
            name: 'license',
            message: 'Application version number ? Default to (ISC)',
            initial: 'ISC'
        },
        {
            //prompt for repo link
            type: 'text',
            name: 'repository',
            message: 'Application Repository ?'
        },

        {
            //application preset, let user proceed with the setup they wan or choose from existing options
            type: 'select',
            name: 'preset',
            message: 'Please select a preset',

            choices: [
                { title: 'Proceed with defaults', value: 'default' },
                { title: 'Initialize a basic template', value: 'basic' },
                { title: 'Manually Select features', value: 'manual' },
            ],
        }
    ]


    /**
     * get user choices from the questions and parse project preset,
     * the parsed preset will return a javascript object @return {application}.
     * Using this object, and the size of the application that the user wants, build the template
     * 
     * extract the package manager @param {registry},
     * the entry file @param {indexFile}, default to index.js
     * and the license type @param {license}
     * 
     * once these fields has been destructured from the returned object,
     * use the fields to build constant variables for further processing,
     * the variables to be built, include but not limited to
     * @param { PACKAGE_INSTALLER, APPLICATION_PACKAGES INSTALLATION_SHELL_CONTENT}
     */
    const application = await prompts(questions);
    let { registry, indexFile, license, description } = application;




    /**
      * if the default package manager is opted for (that is npm ), use 'npm install'
      *  else if yarn is opted for, use 'yarn add' followed by the names of the packages.
      * Build the package installation shell content (install.sh)
      * Standardize the index file name, default to index.js
      */
    const PACKAGE_INSTALLER = registry.toLowerCase() === 'npm' ?
        'npm install ' : 'yarn add ';
    const APPLICATION_PACKAGES = !packages ?
        ' ' : packages.join(' ')
    const INSTALLATION_SHELL_CONTENT = PACKAGE_INSTALLER + APPLICATION_PACKAGES;
    const STANDARDIZED_INDEX_FILE_NAME = indexFile.replace(/[^A-Za-z0-9.-]+/g, '-')
        .replace(/^[-_.]+|-+$/g, '')
        .toLowerCase();

    //application builder, the default option
    if (application.preset === "default") {
        //if user want default create a folder with gitignore, env, model, middleware, controllers, routes and utils
        const defaultApplication = {
            files:
                [{ name: 'package.json', content: JSON.stringify(pkg(application), null, 2) + '\n' },
                { name: '.gitignore', content: gitIgnoreTemplate },
                { name: '.env', content: ENVIRONMENT_VARIABLE },
                { name: 'README.md', content: readmeTemplate(APPLICATION_NAME, description) },
                { name: 'Contributing.md', content: "" },
                { name: STANDARDIZED_INDEX_FILE_NAME, content: "" },
                { name: "LICENSE", content: "" },
                { name: "install.sh", content: "" },
                ],
            folders:
                ['model', 'controllers', 'routes', 'lib']
        }
        //create files and folders based on the user preference
        executePreference(APPLICATION_NAME, defaultApplication)
    }

    else if (application.preset === "basic") {
        //if the user want a blank project, create the directory and gitignore, env and readme, package.json
        const basicApplication = {
            files:
                [{ name: 'package.json', content: JSON.stringify(pkg(application), null, 2) + '\n' },
                { name: '.gitignore', content: gitIgnoreTemplate },
                { name: 'README.md', content: readmeTemplate(APPLICATION_NAME, description) },
                { name: STANDARDIZED_INDEX_FILE_NAME, content: "" },
                { name: "LICENSE", content: license },
                { name: "install.sh", content: INSTALLATION_SHELL_CONTENT },
                ],
            folders:
                ['model', 'controllers', 'routes', 'utils', 'middleware', 'lib']
        }
        //create files and folders based on the user preference
        executePreference(APPLICATION_NAME, basicApplication)
    }

    else {        //prompt user to select the option they want
        const customApplicationOPtion = await prompts({
            type: 'multiselect',
            name: 'folders',
            message: 'Please select the desired folders',
            choices: [
                { title: 'config', value: 'config' },
                { title: 'controller', value: 'controller' },
                { title: 'migrations', value: 'migrations' },
                { title: 'files', value: 'files' },
                { title: 'middleware', value: 'middleware' },
                { title: 'models', value: 'models' },
                { title: 'lib', value: 'lib' },
                { title: 'routes', value: 'routes' },
                { title: 'templates', value: 'templates' },
                { title: 'utils', value: 'utils' },
                { title: 'views', value: 'view' },

            ],
        });

        //generate the foldername from user's choice
        const { folders } = customApplicationOPtion;
        const customApplication = {
            files:
                [{ name: 'package.json', content: JSON.stringify(pkg(application), null, 2) + '\n' },
                { name: '.gitignore', content: gitIgnoreTemplate },
                { name: '.env', content: ENVIRONMENT_VARIABLE },
                { name: 'README.md', content: readmeTemplate(APPLICATION_NAME, description) },
                { name: 'Contributing.md', content: "" },
                { name: STANDARDIZED_INDEX_FILE_NAME, content: "" },
                { name: "LICENSE", content: license },
                { name: "install.sh", content: INSTALLATION_SHELL_CONTENT },
                ],
            folders// computed from CustomApplicationOPtions
        }

        //create files and folders based on the user preference
        executePreference(APPLICATION_NAME, customApplication)
    }

    //installation prompt
    console.log(
        chalk.yellow(
            `${APPLICATION_NAME} 📦 generated!             
            `
        ))
    console.log('to begin, ensure you have bash shell installed \nthen run the following commands')
    console.log(
        chalk.yellow(
            `
            cd ${APPLICATION_NAME} 
            ${application.registry.toLowerCase() === 'npm' ? 'npm run make' : 'yarn make'}
            `
        )
    );
    console.log('if not copy \nthe content of \`install.sh\` to your default shell then press \`Enter\`');
};




/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)

function createFile(file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    console.log('   \x1b[36mcreate\x1b[0m : ' + file)
}

/**
 * Make the given dir relative to base.
 *
 * @param {string} base
 * @param {string} dir
 */

function mkdir(base, dir) {
    var loc = path.join(base, dir)

    console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
    mkdirp.sync(loc, MODE_0755)
}



/** 
* the following functions
* takes the user preference and set up the project directory accordingly
* @param {option} => an object containing two {array}, the files and folders to create
* @param {options.files} is an array of object{name, content}, the file ame and the default content
* @param {options.folders} is an array of string, essentially names of folders to create
*/
function executePreference(applicationDir, options) {
    const { files, folders } = options;

    /**
     * for each folder,
     * execute create  folder command
     * be sure to convert foldername to string first using String constructor
     */
    for (const folder of folders) {
        mkdir(applicationDir, String(folder))
    }

    /**
     * for each file, execute the create file command, 
     * pass the @params  {file.name} to string constructor
     */
    for (const file of files) {
        createFile(path.join(applicationDir, String(file.name)), file.content || '')
    }

}

/**
 * 
 * 
 */

module.exports = { create }