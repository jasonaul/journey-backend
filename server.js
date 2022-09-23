/* == External Modules == */
const express = require('express')
// const methodOverride = require('method-override');
// require("dotenv").config()

/* == Internal Modules == */
const routes = require('./routes')
const cors = require('cors')


/* == Express Instance == */
const app = express()

/* == Port == */
const PORT =  process.env.PORT ||  3003;

/* == DB connection ==*/
require('./config/db.connection')



// whitelist & corsOptions 
const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']

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

