console.log(__dirname)

const fs = require('fs');
const path = require('path');
var TEMPLATE_DIR = path.join(__dirname, '..', 'templates')


function copyTemplate (from, to) {
    write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
  }

  copyTemplate()