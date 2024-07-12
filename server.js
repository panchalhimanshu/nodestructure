const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const cors = require('cors');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 5000;


// Import the router files
const studentRoutes = require('./routes/studentroute');


// Enable CORS for all routes
app.use(cors());


// Use the routers
app.use('/student', studentRoutes);


app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})