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





app.listen(/* PORT ||  */3000, () => {
    console.log("Server is listening on 3000"/* , PORT */)
})

