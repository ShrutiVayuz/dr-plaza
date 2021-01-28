// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'patient';
const clinicModel = require('./clinic.model');

// Schema
var patientSchema = new mongoose.Schema({
    patient_id: { type: String},
    patient_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    is_active: { type: Boolean },
    signup_details: {type: Boolean},
//   approvalStatus : { type: Boolean, required: true},
    age : { type : Number, required : false },
    contact_number: { type: Number, required: false },
    blood_group: { type: String },
    gender: { type: String },
    address: { type: String, required:false },
    otp: { type: String },
    clinicId : { type: mongoose.Schema.ObjectId, ref: clinicModel, required:false}
   
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

var location = restful.model(collectionName, patientSchema, collectionName);
module.exports = location;