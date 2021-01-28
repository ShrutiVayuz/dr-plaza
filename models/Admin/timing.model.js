// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'timing';

// Schema
var timingSchema = new mongoose.Schema({
    timeSlot : { type: String, required: true},
    status : {type: Boolean, required: true}
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, timingSchema, collectionName);

module.exports = timing;