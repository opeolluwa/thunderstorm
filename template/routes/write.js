/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

 var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)
 
 function write (file, str, mode) {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    console.log('   \x1b[36mcreate\x1b[0m : ' + file)
 }
  
 
 const pkg = {
   "name": "",
   "version": "",
   "description": "",
   "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
   },
   "dependencies": {
       "cors": "^2.8.5",
       "dotenv": "^10.0.0",
       "express": "~4.16.1",
       "express-useragent": "^1.0.15",
       "jsonwebtoken": "^8.5.1",
       "lodash": "^4.17.21",
       "nodemailer": "^6.7.2",
       "otp-generator": "^4.0.0",
       "sequelize": "^6.13.0",
       "sequelize-bcrypt": "^1.1.0"
   },
   "devDependencies": {
       "nodemon": "^2.0.15"
   },
   "repository": {
       "type": "git",
       "url": ""
   },
   "keywords": [
   ],
   "author": "",
   "license": "MIT",
   "bugs": {
       "url": ""
   },
   "homepage": ""
}


write("pakage.json", JSON.stringify(pkg));
