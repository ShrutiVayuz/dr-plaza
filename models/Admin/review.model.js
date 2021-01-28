// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'review';

// Schema
var reviewSchema = new mongoose.Schema({
    doctorId : { type: mongoose.Schema.ObjectId, ref: 'doctor', required: true},
    clinicId : { type: mongoose.Schema.ObjectId, ref: 'clinic', required: true},
    userId : { type: mongoose.Schema.ObjectId, ref: 'patient', required: true},
    rating : { type: Number , required: true},
    review : { type: String, required: true},
    is_active : {type: Boolean, required: true},
    is_deleted : {type: Boolean, required: true},
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var review = restful.model(collectionName, reviewSchema, collectionName);

module.exports = review;