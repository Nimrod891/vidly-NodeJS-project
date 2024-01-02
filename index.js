const config = require('config')
const Joi = require("joi");
const logger = require("./logger");
const genres=require('./routes/genres')
const express = require("express");
const helmet = require("helmet");
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const morgan = require("morgan");

const app = express();

app.set('view engine','pug')

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/genres', genres)

//Configuration
//USAGE: In Terminal, export NODE_ENV=development
console.log('Application Name: '+config.get('name'))
console.log('Mail Server: '+config.get('mail.host'))

if (app.get("env") === "development") {
  app.use(morgan("tiny"));

  // USAGE: enable debugging: export DEBUG=app:startup,app:db or app.*
  startupDebugger('Morgan Enabled...')
}




// Stopped at restructuring this to home.js
app.get('/', (req,res)=>{
    res.render('index', {title: 'My Express App', message: 'Hello'})
})


// Env variable for port, default = 3000 if port is undefied
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
