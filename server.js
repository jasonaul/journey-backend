/* == External Modules == */
const express = require('express')


/* == Express Instance == */
const app = express()


/* == Middleware == */
app.use(express.json())
app.use(express.urlencoded({extended: true}))


/* == Port == */
const PORT = /* process.env.PORT || */ 3000;





app.listen(/* PORT ||  */3000, () => {
    console.log("Server is listening on 3000"/* , PORT */)
})

