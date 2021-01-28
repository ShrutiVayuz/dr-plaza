// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'doctor';
const clinicModel = require('./clinic.model');
const specializationModel = require('./specialization.model');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


// Schema
var doctorSchema = new mongoose.Schema({
    doctor_id: { type: String },
    doctorName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: String },
    address: { type: String, required: false },
    is_active: { type: Boolean },
    is_approved : { type: Boolean },
    not_approved : { type: Boolean },
    contactNumber: { type: Number, required: false },
    locationData: { type: String, required: false },
    clinicData: { type: mongoose.Schema.Types.ObjectId, ref: clinicModel, required: false },
    specializationData: { type: mongoose.Schema.Types.ObjectId, ref: specializationModel, required: false },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room'},
    roomData: { type: String, required: false },
    daysOfWorking: { type: String, required: false },
    hoursPerDay: { type: Number, required: false },
    hoursPerPatient: { type: Number, required: false },
    consultancyFee: { type: Number, required: false },
    paidAccount: { type: Boolean, required: false },
    amountPaid: { type: Number, required: false },
    amountPaidOn: { type: Date, required: false },
    signaturelImage: { type: String, required: false },
    profileImage: { type: String },
    otp: { type: String },
    delete_description : { type: String }
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

doctorSchema.plugin(aggregatePaginate);
var location = restful.model(collectionName, doctorSchema, collectionName);
module.exports = location;