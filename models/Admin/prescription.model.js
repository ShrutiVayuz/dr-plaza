// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'prescription';

// Schema
var prescriptionSchema = new mongoose.Schema({
    prescription_id: { type: String },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment'},
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor'},
    patient_note: { type: String },
    ailment_details : { type: String },
    ailment_instruction : { type: String },
    complain_details: { type: String},
    suggestion: { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, prescriptionSchema, collectionName);

module.exports = timing;