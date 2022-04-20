#!/usr/bin/env node
const { Command } = require('commander');
const { mkdir } = require("fs");
const { create } = require('./commands/create');
const program = new Command();

program
    .name('thunderstorm')
    .description('A Command Line tool for setting up server side application directory')
    .version('1.0.0');


//create new project
program.command('init')
    .description('create a new project project')
    .option('-f, --force, overwrite existing files and folder names')
    .action(() => {
        create();
    });

//add environment variables
program.command('add:env')
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