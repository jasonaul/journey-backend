const mongoose = require('mongoose');

const connectionStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/journeyDB'

mongoose.connect(connectionStr);

// set up listeners to monitor your database connection
mongoose.connection.on('connected', ()=> console.log('DB connected...'));

mongoose.connection.on('error', (err)=> console.log(err.message));

mongoose.connection.on('disconnected', ()=> console.log('mongoose disconnected'));