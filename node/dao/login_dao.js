
var userModel = require('../models/user_model');
var jwt = require('jsonwebtoken');

exports.register = (req,res) =>{
    userModel.findOne({'email': req.body.email},(error,doc) =>{
    if(doc){
      return res.json({message:'Email id is already registered'});
    }else{
      var user = new userModel({
      email: req.body.email,
      username: req.body.username,
      password: userModel.hashPassword(req.body.password),
      active_ind: "Y",
      creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then(function(doc){
    return res.status(201).json({successInd: true, message:'Registration Successful'});
  })

  promise.catch(function(error){
    return res.status(501).json({successInd: false, message: 'Error while registering user'})
  })
    }
  })
}

exports.login = (req,res) =>{
  console.log(req.body.email+"------"+req.body.password);
    userModel.findOne({'email':req.body.email},(error,doc) =>{
        if(doc){
            if(doc.isValid(req.body.password)){
                let webToken = jwt.sign({email:doc.email},'secretkey',{expiresIn : '1h'});
                return res.status(200).json({successInd: true, token: webToken});
            }else{
                return res.status(403).json({successInd: false, message:'Invalid Credentials'});
            }
        }
        else{
            return res.status(510).json({successInd: false, message:'User Not Found'});
        }
    })
}