// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'specialization';

// Schema
var specializationSchema = new mongoose.Schema({
    specialization : { type: String, required: true},
    condition : { type: String, required: false},
    status : { type: Boolean, required: true}
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
        
    });

var specialization = restful.model(collectionName, specializationSchema, collectionName);

module.exports = specialization;