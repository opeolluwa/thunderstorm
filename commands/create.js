const prompts = require('prompts');
const fs = require('fs');
const fsAsync = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const { pkg } = require('../modules/package');
const mkdirp = require('mkdirp');
const { envTemplate } = require('../modules/env');
const { gitIgnoreTemplate } = require('../modules/gitignore');
const { readmeTemplate } = require('../modules/readme');


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
            name: 'dir',
            message: 'Name of application ?'
        },


        {
            //prompt user for application entry point default to (index.js)
            type: 'text',
            name: 'entry',
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
            //application preset
            type: 'select',
            name: 'preset',
            message: 'Please select a preset',

            choices: [
                { title: 'Proceed with defaults', value: 'default' },
                { title: 'Manually Select features', value: 'manual' },
                { title: 'Initialize a starter template', value: 'blank' }
            ],
        }
    ]

    //get user choices from the questions
    const application = await prompts(questions);

    //parse project preset, the functionality the user wants
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
            message: 'Please select the desired folders',
            choices: [
                { title: 'Config', value: 'config' },
                { title: 'Controller', value: 'controller' },
                { title: 'Files Backup', value: 'files' },
                { title: 'Middleware', value: 'middleware' },
                { title: 'Database Migrations', value: 'migrations' },
                { title: 'Models', value: 'models' },
                { title: 'Routes', value: 'routes' },
                { title: 'Email Templates', value: 'templates' },
                { title: 'Utils', value: 'utils' },
                { title: 'Views', value: 'view' },

            ],
        });

        //update the application with user choice and  an app name from a directory path, fitting npm naming requirements.
        Object.assign(application,
            {
                // to be used as directory name
                preset: variant,
                name: application.dir
                    .replace(/[^A-Za-z0-9.-]+/g, '-')
                    .replace(/^[-_.]+|-+$/g, '')
                    .toLowerCase()
            },

            {
                //create application entry point
                preset: variant,
                name: application.entry || "index.js"
            },
            {
                //application license
                preset: variant,
                name: application.license || "ISC"
            } );




    }

    //create config folder and copy config to it
    // const { mane:dir, entry, license } = application
    const dir = application.dir
    const entry = application.entry
    const license = application.license

    mkdir(dir, 'config')
    mkdir(dir, 'controllers')
    mkdir(dir, 'files')
    mkdir(dir, 'middleware')
    mkdir(dir, 'migrations')
    mkdir(dir, 'models')
    mkdir(dir, 'routes')
    mkdir(dir, 'templates')
    mkdir(dir, 'utils')
    mkdir(dir, 'view')



    //generate app entry  point and package.json and .env
    // write(path.join(dir, 'package.json'), JSON.stringify(pkg(application), null, 2) + '\n')
    write(path.join(dir, 'package.json'), JSON.stringify(pkg(application), null, 2) + '\n')
    write(path.join(dir, '.gitignore'), gitIgnoreTemplate)
    write(path.join(dir, '.env'), envTemplate)
    write(path.join(dir, 'README.md'), readmeTemplate)
    write(path.join(dir, 'Contributing.md'), "")
    write(path.join(dir, entry), "")
    write(path.join(dir, "LICENSE"), license)
};


/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)

function write(file, str, mode) {
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






module.exports = { create }