//give the feedback to use when application has been created 
const created = (appName, appEntry) => ` 
/
/config/config.js
/controllers/
/controllers/
/lib/
/middleware/
/migrations/
/models/
/routes/
/seeders/
/${appEntry}.js
/package.json
/.gitignore
/.env

change directory:
  $ cd ${appName}

install dependencies:
  $ npm install

run the app in development:
  $ npm run dev

  run the app in production:
  $ npm run start
`;

module.exports = {created}