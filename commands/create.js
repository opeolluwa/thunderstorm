const prompts = require('prompts');
const fs = require('fs');
const fsAsync = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const { pkg } = require('../templates/package');
const mkdirp = require('mkdirp');
const { envTemplate } = require('../templates/env');
const { gitIgnoreTemplate } = require('../templates/gitignore');
const { readmeTemplate } = require('../templates/readme');


async function create() {
    //show off the applications banner 
    console.log(
        chalk.yellow(
            figlet.textSync('frost', { horizontalLayout: 'full', })
        )
    );


    //application question to be used in creating application with cli
    const questions = [
        {
            //prompt user for name of application
            type: 'text',
            name: 'directory',
            message: 'Name of application ?'
        },

        {
            //prompt user for application indexFile point default to (index.js)
            type: 'text',
            name: 'indexFile',
            message: 'Application Entry point (index.js) ?'
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
            message: 'Application version number (1.0.0) ?'
        },
        {
            //prompt user for name of application
            type: 'text',
            name: 'license',
            message: 'Application version number (ISC) ?'
        },
        {
            //prompt for repo link
            type: 'text',
            name: 'repository',
            message: 'Application Repository ?'
        },

        {
            //application preset, let user proceed with the setup they wan or choos e from existing options
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



    //get user choices from the questions and parse project preset, the functionality the user wants
    const application = await prompts(questions);
    if (application.preset === "default") {
        //get the user indexFile for other fields of the application
        const { directory, description, indexFile, version, license, repository } = application

        //if user want default create a folder with gitignore, env, model, middleware, controllers, routes and utils
        const defaultApplication = {
            files:
                [{ name: 'package.json', content: JSON.stringify(pkg(application), null, 2) + '\n' },
                { name: '.gitignore', content: gitIgnoreTemplate },
                { name: '.env', content: envTemplate },
                { name: 'README.md', content: readmeTemplate },
                { name: 'Contributing.md', content: "" },
                {
                    name: indexFile.replace(/[^A-Za-z0-9.-]+/g, '-')
                        .replace(/^[-_.]+|-+$/g, '')
                        .toLowerCase(), content: ""
                },
                { name: "LICENSE", content: license },
                ],
            folders:
                ['model', 'controllers', 'routes',]
        }
        //create files and folders based on the user preference
        executePreference(directory, defaultApplication)
    }

    else if (application.preset === "basic") {
        //get the user indexFile for other fields of the application
        const { directory, description, indexFile, version, license, repository } = application

        //if the user want a blank project, create the directory and gitignore, env and readme, package.json
        const basicApplication = {
            files:
                [{ name: 'package.json', content: JSON.stringify(pkg(application), null, 2) + '\n' },
                { name: '.gitignore', content: gitIgnoreTemplate },
                { name: 'README.md', content: readmeTemplate },
                {
                    name: indexFile.replace(/[^A-Za-z0-9.-]+/g, '-')
                        .replace(/^[-_.]+|-+$/g, '')
                        .toLowerCase(), content: ""
                },
                { name: "LICENSE", content: license },
                ],
            folders:
                ['model', 'controllers', 'routes', 'utils', 'middleware']
        }
        //create files and folders based on the user preference
        executePreference(directory, basicApplication)
    }

    else {
        //get the user indexFile for other fields of the application
        const { directory, indexFile, license, } = application

        //prompt user to select the option they want
        const customApplicationOPtion = await prompts({
            type: 'multiselect',
            name: 'folders',
            message: 'Please select the desired folders',
            choices: [
                { title: 'Config', value: 'config' },
                { title: 'Controller', value: 'controller' },
                { title: 'Database Migrations', value: 'migrations' },
                { title: 'Files Backup', value: 'files' },
                { title: 'Middleware', value: 'middleware' },
                { title: 'Models', value: 'models' },
                { title: 'Routes', value: 'routes' },
                { title: 'Email Templates', value: 'templates' },
                { title: 'Utils', value: 'utils' },
                { title: 'Views', value: 'view' },

            ],
        });

        //generate the foldername from user's choice
        const { folders } = customApplicationOPtion;
        const customApplication = {
            files:
                [{ name: 'package.json', content: JSON.stringify(pkg(application), null, 2) + '\n' },
                { name: '.gitignore', content: gitIgnoreTemplate },
                { name: '.env', content: envTemplate },
                { name: 'README.md', content: readmeTemplate },
                { name: 'Contributing.md', content: "" },
                {
                    name: indexFile.replace(/[^A-Za-z0-9.-]+/g, '-')
                        .replace(/^[-_.]+|-+$/g, '')
                        .toLowerCase(), content: ""
                },
                { name: "LICENSE", content: license },
                ],
            folders// computed from CustomApplicationOPtions
        }

        //create files and folders based on the user preference
        executePreference(directory, customApplication)
    }
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


module.exports = { create }