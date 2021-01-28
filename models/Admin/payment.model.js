// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'payment';
const patientModel = require('./patient.model');
const doctorModel = require('./doctor.model');
const appointmentModel = require('./appointment.model');

// Schema
var paymentSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
    payment_id: { type: String, required: true },
    amount: {type: Number, required: true },
    payment_status : {type : String, required : true },
    // email: { type: String, required: true },
    user_id : { type: mongoose.Schema.ObjectId, ref: patientModel, required:true },
    doctor_id : { type: mongoose.Schema.ObjectId, ref: doctorModel, required:true },
    // appointment_id : { type: mongoose.Schema.ObjectId, ref: appointmentModel, required: true }
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

var payment = restful.model(collectionName, paymentSchema, collectionName);
module.exports = payment;