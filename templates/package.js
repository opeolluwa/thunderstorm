
// const fields = { name: "", entry: "", version: "1.0.0", description: "", author: "", database, license }
//package.json template  generator
const pkg = (fields) => ({

    "name": fields.directory,
    "version": fields.version,
    "description": fields.description,
    "scripts": {
        "start": `node ${fields.indexFile}`,
        "dev": `nodemon ${fields.indexFile}`,
        "make":"bash install.sh"
    },
    "dependencies": {
       
    },
    "devDependencies": {
        
    },
    "repository": {
        "type": "git",
        "url": ""
    },
    "keywords": [
    ],
    "author": fields.author,
    "license": fields.license,
    "bugs": {
        "url": ""
    },
    "homepage": ""
})
module.exports = { pkg }