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
const passport = require('passport')
const cookieSession = require('cookie-session')
const passportSetup = require('./passport')
const authRoute = require('./routes/auth')


/* == Express Instance == */
const app = express()

/* == Port == */
const PORT =  process.env.PORT ||  8080;

/* == DB connection ==*/
require('./config/db.connection')



//whitelist & corsOptions 
const whitelist = ['http://localhost:3003', 'http://localhost:3000','http://localhost:8080',`${process.env.CLIENT_URL}`]


const corsOptions = {
	origin: (origin, callback) => {
		console.log(whitelist, "WHITELIST")
		console.log(origin, "ORIGIN")
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods:'GET,POST,PUT,DELETE',
	// This is needed for accept credentials from the front-end
	// not needed if you are not implementing authentication
	credentials: true,
};

/* == Middleware == */
app.use(
	cookieSession({
		name:'session',
		keys:['cyberwolve'],
		maxAge:24*60*60*100,


	})
)
app.use(passport.initialize())
app.use(passport.session())
// app.use(cors(corsOptions))
app.use(cors('*'))
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
app.use('/auth',authRoute)



app.listen( PORT, () => {
    console.log("Server is listening on " + PORT )
})

