# angular-auth-foundation

run `npm install` and `bower install`

In a separate directory create 2 files:

`package.json` :

```json
{
  "name": "angular-auth-server",
  "version": "0.0.0",
  "dependencies": {
    "express": "^4.9.7",
    "mongoose": "^3.8.16",
    "express-jwt-auth": "*",
    "body-parser": "^1.9.2"
  }
}
```

`server.js` :

```javascript
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var path = require('path');
var bodyParser = require('body-parser');

var settings = {
  mongoconnection: 'mongodb://localhost:27017/angular-auth-demo',
  logFile: path.join(__dirname, 'authlogger.log'),
  corsDomains: ['http://localhost:3000'],
  // Nodemailer settings, used for resetting password
  mailer: {
    mailerFrom    : 'your.mail@example.com',
    mailerTitle   : 'Password reset',
    transporter   : {
      service: 'Gmail',
      auth: {
        user: 'your.mail@gmail.com',
        pass: '<app_token>'
      }
    }
  }
};
var auth = require('express-jwt-auth')(app, settings);

app.use(bodyParser.json());

app.get('/api/test', auth, function(req, res) {
  res.send('Secured access.');
});

server.listen(5000);
```

run `npm install` and `node server.js`.

Go back to the `angular-auth-foundation` folder.

To run the project in development mode use `gulp serve`.
To build the project for production run `gulp`.
To check the project running with built assets run `gulp serve:dist`.

Setup front-end accordingly - apiUrl in `app.js`.
Email (transport) settings are optional.

## e2e tests with protractor.js

`gulp protractor`


