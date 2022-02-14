#!/usr/bin/env node
const { Command } = require('commander');
const { mkdir } = require("fs");
const { create } = require('./commands/create');
const program = new Command();

program
    .name('restify')
    .description('RESTful API template generator to help developer quickly scaffold backend applications ')
    .version('0.1.0');


//create new project in a new directory
// program.command('new')
//     .description('create a new project powered by restify-cli-tool')
//     .action(() => {
//         create()
//     });



//create new project
program.command('init')
    .description('create a new project powered by restify-cli-tool')
    // .argument('<application-name>', 'name of application, will beused to create folder to hold generated files')
    .option('-f, --force, overwrite existing files and folder names')
    .action(() => {
        create();
    });

//add environment variables
program.command('env:add')
    .description('add environment variable to project')
    .option('-u, --database-user <value>', 'add database username to environment variables')
    .option('-p, --database-password', 'add database password to environment variables')
    .option('-h, --database-host', 'add  database host to environment variables')
    .option('-e, --email-address', 'add email to environment variables')
    .option('-x, --email-password', 'add email password to database key')
    .option('-jwt, --jwt-key', 'add json web tokens secret key to environment variables')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });


//development mode
program.command('dev')
    .description('run the project in development mode')
    .action(() => {
       /*  const path = "tabloid"
        mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
            console.log("done")
        }); */
        console.log(__dirname)
    });

//update dependencies
program.command('update [package]')
    .description('update existing project dependencies')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });


program.parse();