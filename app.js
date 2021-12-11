const express = require('express');
const app = express();
const port = process.env.PORT || 2099;
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongodb = require("mongodb")
const mongoose = require("mongoose");
const AWS = require("aws-sdk");

require('dotenv').config();

mongoose.connect("mongodb+srv://BelleUng:" + 
process.env.MONGO_ATLAS_PW + 
"@node-rest-shop.rqqwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
() => console.log('Connected to MongoDB'), { useNewUrlParser: true });


const userRoutes = require('./userRoute');

app.use("/user", userRoutes);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded ({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * means to give access to any orgin
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // ALL THE HTTP REQUESTS THAT WANT TO SUPPORT API
            return res.status(200).json({});
        }
        next();
});

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.get('/', async (req, res, next) => {
    res.status(200).json ({
        message: 'It works successfully!'
    })
});

app.listen(port, () => {
    console.log(`APIs running on ${port}`);
})