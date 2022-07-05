const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/controller');
const jwtVerify = require('../config/jwtVerification');

router.post('/register',userCtrl.register);
router.post('/authenticate',userCtrl.authenticate);
//jwtverify.verifyToken is for private route authorization
router.get('/userProfile',jwtVerify.verifyToken,userCtrl.userProfile);


module.exports=router;