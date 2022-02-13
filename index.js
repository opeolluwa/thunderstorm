#!/usr/bin/env node
const chalk = require('chalk');
const { Command } = require('commander');
const { create } = require('./commands/create');
const program = new Command();

program
    .name('restify')
    .description(chalk.bold.blueBright('RESTful API template generator'))
    .version('0.1.0');


//create new project in a new directory
program.command('new')
    .description('create a new project powered by restify-cli-tool')
    .action(() => {
     create()
    });


//create new project
program.command('init')
    .description('add restify to existing project project powered by restify-cli-tool')
    .option('-f, --force, overwrite existing file and folder names')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });
    
//add environment variables
program.command('env:add')
    .description('add environment variable to project')
    .option('DB_USER', 'add database username to environment variables')
    .option('DB_ACCESS_KEY', 'add database password to environment variables')
    .option('DB_HOST', 'add  database host to environment variables')
    .option('EMAIL_USER', 'add email to environment variables')
    .option('EMAIL_ACCESS_KEY', 'add email password to database key')
    .option('JWT_KEY', 'add json web tokens secret key to environment variables')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });


//development mode
program.command('dev')
    .description('run the project in development mode')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });

//update dependencies
program.command('update [package]')
    .description('update existing project dependencies')
    .action((str, options) => {
        const limit = options.first ? 1 : undefined;
        console.log(str.split(options.separator, limit));
    });


program.parse();