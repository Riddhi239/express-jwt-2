const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');

const User = mongoose.model('User');

//config authentication
passport.use(
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        User.findOne({email:username},
            (err,user)=>{
                if(err){
                    return done(err);
                }
                //unknown user
                else if(!user){
                    return done(null,false,{message:'Email is not registered.'});
                }
                //wrong password
                else if(!user.verifyPassword(password)){
                    return done(null,false,{message:'wrong password'})
                }
                //success authentication
                else{
                    return done(null,user);
                }
            });
    })
)