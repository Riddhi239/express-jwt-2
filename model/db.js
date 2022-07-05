const mongoose = require('mongoose');
//connection to database
mongoose.connect(process.env.MONGODB_URI,(err)=>{
    if(!err){
        console.log("MongoDb connection was success...")
    }
    else{
        console.log("Failed to connect mongodb"+ JSON.stringify(err,undefined,2));
    }
});

//creating collection
require('./user.model');