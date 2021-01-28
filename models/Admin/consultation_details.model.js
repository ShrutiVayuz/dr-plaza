// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'consultation_details';

// Schema
var consultationSchema = new mongoose.Schema({
    consultation_id: { type: String },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'doctor'},
    day: { type: String },
    clinicStartTime : { type: String },
    clinicEndTime : { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, consultationSchema, collectionName);

module.exports = timing;