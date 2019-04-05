var jwt = require('jsonwebtoken');
var login_dao = require("../dao/login_dao");
var city_dao = require("../dao/city_dao");

module.exports = function(app){
 
  app.post('/signup',login_dao.register);
  
  app.post('/signin',login_dao.login);
  
  app.post('/findcity', city_dao.search_city);
  

}

var token_decoded = '';
function tokenVerification(req,res,next){
    let token = req.headers.authorization;
    console.log(token);
    jwt.verify(token,'secretkey',function(error,tokenData){
        if(error){
            return res.status(400).json({message:'Request Unauthorizied'});
        }
        if(tokenData){
            console.log(tokenData);
            token_decoded = tokenData;
            next();
        }
    })
}