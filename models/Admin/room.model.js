// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'room';
const clinicModel = require('./clinic.model');
const doctorModel = require('./doctor.model');

// Schema
var roomSchema = new mongoose.Schema({
    clinicData : { type: mongoose.Schema.Types.ObjectId, ref: clinicModel , required: true},
    room_id: { type: String },
    roomNumber : { type: Number, required: true},
    rentPerMonth : { type: Number, required: false},
    paidStatus : { type: Boolean, },
    paidOn : { type: Date, required: false},
    doctorData : { type: mongoose.Schema.Types.ObjectId, ref: doctorModel, required: false},
    clinicManagerId: { type: mongoose.Schema.Types.ObjectId, ref: 'clinic_manager'},
    is_available: { type: Boolean,  },
    roomName: { type: String },
    roomStartTime : { type: String },
    roomEndTime : { type: String },
    floor: { type: String },
    specialization: { type: String },
    // available_days: [{ type: String }],
    is_active: { type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var location = restful.model(collectionName, roomSchema, collectionName);
module.exports = location;