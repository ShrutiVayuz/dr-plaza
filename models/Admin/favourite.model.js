// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'favourite';
const clinicModel = require('./clinic.model');
const PatientModel = require('./patient.model');
const DoctorModel = require('./doctor.model');

// Schema
var favouriteSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: PatientModel , required: true},
    doctorId : { type: mongoose.Schema.ObjectId, ref: DoctorModel, required: true},
    clinicId : { type: mongoose.Schema.ObjectId, ref: clinicModel, required: true},
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var favourite = restful.model(collectionName, favouriteSchema, collectionName);
module.exports = favourite;