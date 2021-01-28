var restful = require('node-restful');
var mongoose = restful.mongoose;
const doctorModel = require('./doctor.model');
const patientModel = require('./patient.model');
const clinicModel = require('./clinic.model');
const paymentModel = require('./payment.model');
const collectionName = 'appointment';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


const appointmentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId ,ref : patientModel, required: true },
    patient_id: { type: Number, required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId ,ref : doctorModel, required: true },
    clinic_id: { type: mongoose.Schema.Types.ObjectId ,ref : clinicModel, required: true },
    patientname: { type: String, required: true },
    departmentname: { type: String, required: true },
    doctorname: { type: String, required: true },
    gender: { type: String },
    status: { type: String, required: true },
    payment_status: { type: Boolean, required: true },
    problem: { type: String, required: false },
    date: { type: Date, required: true },
    consultation_fee: { type: Number, required: false },
    mode_of_payment: { type: String, required: false },
    booked_as : {type: String, required : false},
    age : { type: Number, required : true },
    cancelledBy : { type: String, required : false },
    rescheduledBy : { type: String, required : false },
    rescheduledTo : { type: Date, required : false },
    rescheduledFrom : { type: Date, required : false },
    payment_id : { type : mongoose.Schema.Types.ObjectId ,ref : paymentModel, required: false }
}, 
{ timestamps: true,
    versionKey: false,
    collection : 'appointment'
});

appointmentSchema.plugin(aggregatePaginate);
var appointment = restful.model(collectionName, appointmentSchema, collectionName);
module.exports = appointment;