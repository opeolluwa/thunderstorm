const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const { mkdir } = require("fs");
const { pkg } = require('../modules/package');
const { created } = require('../modules/created');

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')

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
            //database type
            type: 'autocomplete',
            name: 'database',
            message: 'Pick a database for the project',
            choices: [
                { title: 'MongoDb', value: 'mongodb' },
                { title: 'MySQL', value: 'mysql' },
                { title: 'SQLite', value: 'sqlite' },
                { title: 'Oracle', value: 'oracle' },
                { title: 'MsQL', value: 'mysql' },
                { title: 'Redis', value: 'redis' },
                { title: 'Cassandra', value: 'cassandra' },
            ]
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

        {
            //application preset
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

    //log use application 
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
        });

        //update the application with user choice and  an app name from a directory path, fitting npm naming requirements.
        Object.assign(application, {
            preset: variant,
            name: application.name
                .replace(/[^A-Za-z0-9.-]+/g, '-')
                .replace(/^[-_.]+|-+$/g, '')
                .toLowerCase()
        })
    }

    const dir = application.name

    //create config folder and copy config to it
    mkdir(dir, 'config')
    mkdir(dir, 'controllers')
    mkdir(dir, 'lib')
    mkdir(dir, 'middleware')
    mkdir(dir, 'migrations')
    mkdir(dir, 'models')
    mkdir(dir, 'routes')
    mkdir(dir, 'seeders')
    mkdir(dir, 'templates')



    //copy templates
    copyTemplateMulti('css', dir + '/public/stylesheets', '*.scss')

    //generate app entry package.json and .gitignore
    write('package.json', JSON.stringify(pkg(application), null, 2) + '\n')
    // write(path.join(dir, 'app.js'), app.render())
    // write(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
    // mkdir(dir, 'bin')
    // write(path.join(dir, 'bin/www'), www.render(), MODE_0755)
    console.log(application);
    /*{
        name: '',
        value: 'cassandra',
        entry: '',
        description: '',
        version: '',
        license: '',
        repository: '',
        preset: 'default'
      }*/


    //give  this feedback  (the files and folders ) to the user when the application has been created, 

    created(application.name, application.entry)

    //TODO: make directory here
    //TODO: copy files here
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



/**
 * Copy file from template directory.
 */

function copyTemplate(from, to) {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Copy multiple files from template directory.
 */

function copyTemplateMulti(fromDir, toDir, nameGlob) {
    fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
        .filter(minimatch.filter(nameGlob, { matchBase: true }))
        .forEach(function (name) {
            copyTemplate(path.join(fromDir, name), path.join(toDir, name))
        })
}

// copyTemplateMulti('css', dir + '/public/stylesheets', '*.less')

module.exports = { create }