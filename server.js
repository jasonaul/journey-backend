/* == External Modules == */
const express = require('express')
// const methodOverride = require('method-override');
require("dotenv").config()

// Installed and required 'body-parser' in case we need to use it to parse requests of content-type (application/json)
// const bodyParser = require("body-parser")
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))

/* == Internal Modules == */
const routes = require('./routes')
const cors = require('cors')


/* == Express Instance == */
const app = express()

/* == Port == */
const PORT =  process.env.PORT ||  3000;

/* == DB connection ==*/
require('./config/db.connection')



// whitelist & corsOptions 
const whitelist = ['http://localhost:3003', 'http://localhost:3000','https://git.heroku.com/journey-1.git']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/* == Middleware == */
app.use(cors(corsOptions))
// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(methodOverride('_method'))
// app.use(express.static(__dirname + './public'));



/* == Models Required == */
// const Events = require("./models/events.js");

//*****************//
//**** Routes ****//
//*****************//
app.use('/events', routes.events)



app.listen( PORT, () => {
    console.log("Server is listening on " + PORT )
})

