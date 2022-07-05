const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ =require('lodash');


module.exports.register = (req,res,next)=>{
    var user = new User();
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log("Error in posting data"+ JSON.stringify(err,undefined,2));
        }
    })
};

module.exports.authenticate = (req,res,next)=>{
    
    //call for passport authentication
    passport.authenticate('local',(err,user,info)=>{
        //error from passport middleware
        if(err) {
            return res.status(400).json(err);
        }
        //register user
        else if (user) {
            return res.status(200).json({"token":user.generateJwt()});
        }
        //unknown user or wrong password
        else {
            return res.status(404).json(info);
        }
    })(req,res);
};
//show the user credentials when token is valid
module.exports.userProfile=(req,res,next)=>{
    
    User.findOne({_id:req._id},(err,user)=>{
        if(!user){
            return res.status(404).send({status:false,message:"User record not found."})
        }
        else{
            return res.status(200).send({status:true,user:_.pick(user,['firstName','lastName','email'])})
        }
    })
}