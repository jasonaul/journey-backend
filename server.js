require('dotenv').config();
/* == External Modules == */
const express = require('express')

/* == Internal Modules == */
const routes = require('./routes')
const cors = require('cors')
const session = require('express-session');


/* == Express Instance == */
const app = express()

/* == Port == */
const PORT =  process.env.PORT ||  8080;

/* == DB connection ==*/
require('./config/db.connection')

//  MongoDBStore for sessions
const MongoDBStore = require('connect-mongodb-session')(session)

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
	credentials: true,
};

/* == Middleware == */
// app.use(cors(corsOptions))
app.use(cors('*'))

app.set('trust proxy', 1) // trust first proxy

app.use(
	session({
		secret: process.env.CLIENT_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoDBStore({
	    uri: process.env.MONGODB_URI,
	    collection: 'mySessions'
	  }),
	  cookie: {
	    sameSite: 'none',
	    secure: true
	  }
	})
);

const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next();
	} else {
		res.status(403).json({ msg: 'login required' });
	}
}

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(methodOverride('_method'))
// app.use(express.static(__dirname + './public'));




//*****************//
//**** Routes ****//
//*****************//
app.use('/events', isAuthenticated, routes.events)
app.use('/users', routes.users)



app.listen( PORT, () => {
    console.log("Server is listening on " + PORT )
})

