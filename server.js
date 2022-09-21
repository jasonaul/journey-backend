/* == External Modules == */
const express = require('express')
const methodOverride = require('method-override');
require("dotenv").config()

/* == Express Instance == */
const app = express()


/* == Middleware == */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

/* == Mongoose == */
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)

/* == Port == */
const PORT = /* process.env.PORT || */ 3000;

/* == Models Required == */
const Events = require("./models/events.js");

//*****************//
//**** Routes ****//
//*****************//

/* == Home == */
app.get('/', (req, res) => {
    res.send("You are home.")
})

/* == Events (index) == */
app.get('/events', (req, res) => {
    res.send("Events route is working")
})

/* == Add New Event (new) == */
app.get('/events/new', (req, res) => {
    res.send("New routes is working")
})

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


/* == Show Event (show) == */
app.get('/events/:id', async (req, res) => {
    res.send('ID route working')
})


/* == Edit Event (edit) == */
app.get('/events/:id/edit', (req, res) => {
    res.send('Edit route working')
    //BELOW: Save for further in development
    // Events.findById(req.params.id, (err, foundEvent) =>{
    //     res.render('/edit.ejs', {event: foundEvent})
    // })
})


/* == Delete and Destroy and Event (delete) == */
app.delete('/events/:id', (req, res) => {
    Events.findByIdAndRemove(req.params.id, (err, data) => {
        if(err) console.log(err)
        res.redirect('/events')
    })
})




app.listen(/* PORT ||  */3000, () => {
    console.log("Server is listening on 3000"/* , PORT */)
})

