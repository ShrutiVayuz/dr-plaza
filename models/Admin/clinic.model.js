// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'clinic';

const locationModel = require('./location.model');

// Schema
var clinicSchema = new mongoose.Schema({
    clinicName : { type: String, required: true},
    state: { type: String, required: true},
    city: { type: String, required: true},
    pincode: { type: String, required: true},
    location : { type: String, required: true},
    comment : { type: String, required: false},
    status : { type: Boolean, required: true},
    vicinity : {type: String, required: false},
    floorCount : {type: String, required: false},
    clinicManagerId : { type: mongoose.Schema.Types.ObjectId, ref: 'clinic_manager'},
    coords : { type: {
        type: String, 
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }}
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });
clinicSchema.index({ coords: '2dsphere' });
var clinic = restful.model(collectionName, clinicSchema, collectionName);
module.exports = clinic;