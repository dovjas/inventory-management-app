const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const app = express();

const PORT = process.env.PORT||5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Backend is working on Port: ${PORT}`);
        });
    })
    .catch((error)=> console.log(error));