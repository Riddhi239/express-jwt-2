const jwt = require('jsonwebtoken');
//verification of token
module.exports.verifyToken=(req,res,next)=>{
    var token;
    if ('authorization' in req.headers)
        token=req.headers['authorization'].split(' ')[1];
    
    if(!token)
        return res.status(403).send({auth:false,message:"No token is provided"});
    
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
           
            if(err){
                return res.status(500).send({auth:false,message:"Token authentication is failed"});
            }
            else{
                req._id=decoded._id;
                next();
            }
        })
    }
}