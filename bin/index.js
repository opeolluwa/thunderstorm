#!/usr/bin/env node
const { Command } = require('commander');
const { create } = require('../commands/create');
const program = new Command();

program
    .name('thunderstorm')
    .description('A Command Line tool for setting up server side application directory')
    .version('1.0.0');


//create new project
program
    .command('init <application>')
    .description('create a new project project')
    .option('-p, --packages [packages...]', 'project dependencies. Dependencies will be added to package.json when the template is generated')
    .option('-e, --env <FIELD=value...>', 'comma separated listing of environment variables field value pain. Option only available during project initialization')
    // .option('-f, --force, overwrite existing files and folder names')
    .action((application, options) => {
        const { packages, env } = options;

        //pass the application name, packages and the environment variables to the create controller
        create(application, { packages, env });
    });

program.parse();
