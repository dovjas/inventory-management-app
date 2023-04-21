const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleWare/errorMiddleware');

const app = express(); 
// Midllewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Midlleware routes
app.use('/api/users', userRoute)

// Routes
app.get('/',(req,res)=>{
    res.send('Homepage');
});
//Error handler
app.use(errorHandler)

// Connect to DB and start server
const PORT = process.env.PORT||5000
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Backend is working on Port: ${PORT}`);
        });
    })
    .catch((error)=> console.log(error));