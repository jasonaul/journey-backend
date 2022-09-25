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
const whitelist = ['http://localhost:3003', 'http://localhost:3000']

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


// /* == Home == */
// app.get('/', (req, res) => {
//     res.send('Events home')
// })

// /* == Events (index) == */
// app.get('/events', (req, res) => {
//     res.send("Events route is working")
// })

// /* == Add New Event (new) == */
// app.get('/events/new', (req, res) => {
//     res.send("New routes is working")
// })

// BELOW: Save for later in development

// app.post('/events', (req, res) => {
//     Events.create(req.body, (err, createdEvent) => {
//         if (error) {
//             console.log('error', err);
//             res.send(err);
//         } else {
//             res.redirect('/events')
//         }
//     })
// })


// /* == Show Event (show) == */
// app.get('/events/:id', async (req, res) => {
//     res.send('ID route working')
// })


// /* == Edit Event (edit) == */
// app.get('/events/:id/edit', (req, res) => {
//     res.send('Edit route working')
//     //BELOW: Save for further in development
//     // Events.findById(req.params.id, (err, foundEvent) =>{
//     //     res.render('/edit.ejs', {event: foundEvent})
//     // })
// })


// /* == Delete and Destroy and Event (delete) == */
// app.delete('/events/:id', (req, res) => {
//     Events.findByIdAndRemove(req.params.id, (err, data) => {
//         if(err) console.log(err)
//         res.redirect('/events')
//     })
// })




app.listen( PORT, () => {
    console.log("Server is listening on " + PORT )
})

