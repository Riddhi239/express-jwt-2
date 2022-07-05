require('./config/config');
require('./model/db');
require('./config/passportConfig');
//install dependencies
const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');

const app=express();

//middlewares
app.use(bodyParser.json());

app.use(passport.initialize());

//routes request
app.use('/user',require('./routes/index.router'));


//development port connection
app.listen(process.env.PORT,()=>console.log(`server running on port of ${process.env.PORT}`));