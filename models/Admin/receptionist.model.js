// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'receptionist';

// Schema
var roomSchema = new mongoose.Schema({
    receptionistName : { type: String, required: true}, 
    email : { type: String, required: true},
    password : { type: String, required: true},
    status : { type: Boolean, required: true},
    clinicId : { type: mongoose.Schema.ObjectId, required: false},
    image : { type: Object, required: false},
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var location = restful.model(collectionName, roomSchema, collectionName);
module.exports = location;