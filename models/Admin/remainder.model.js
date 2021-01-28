// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'remainder';
const patientModel = require('./patient.model');

// Schema
var remainderSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: patientModel , required: true},
    title : { type: String, required: true},
    date : { type: Date, required: true},
    type : { type: String, required: true},
    is_active: { type: Boolean, required: true }
},{
    timestamps : true,
        versionKey: false 
    });

var remainder = restful.model(collectionName, remainderSchema, collectionName);
module.exports = remainder;