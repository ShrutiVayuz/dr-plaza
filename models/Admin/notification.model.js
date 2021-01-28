// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'notification';
const doctorModel = require('./doctor.model');
const patientModel = require('./doctor.model');

// Schema
var notificationSchema = new mongoose.Schema({
    content : { type: String, required : false },
    type : { type: String, required: true },
    source : { type: String, required : true },
    dest : { type : String, required : true },
    doctor_id : { type: mongoose.Schema.ObjectId, ref: doctorModel, required:false },
    patient_id : { type: mongoose.Schema.ObjectId, ref: patientModel, required:false },
    is_read : { type : Boolean, required : false },
    is_active: { type: Boolean, required : true },
}, {
    timestamps: true,
    versionKey: false 
});

var notification = restful.model(collectionName, notificationSchema, collectionName);
module.exports = notification;