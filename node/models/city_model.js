var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
    id : {type:Number},
    name: {type:String},
    country:{type:String},
    coord:{type:Array}
});


module.exports = mongoose.model('City',citySchema);