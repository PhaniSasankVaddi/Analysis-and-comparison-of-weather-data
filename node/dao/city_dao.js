var cityModel = require('../models/city_model');

exports.search_city = (req,res) =>{
    cityModel.findOne({'name':req.body.city_name,'country':req.body.country},(error,city)=>{
        if(error){
            return res.status(404).json({message:'City not found'});
        }
        if(!city){
            return res.status(400).json({message:'No City found with this name'});
        }else{
            return res.status(200).send(city);
        }
    })
}
