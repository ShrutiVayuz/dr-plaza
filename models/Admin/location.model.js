// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'location';

// const pointSchema = new mongoose.Schema({
//     type: {
//       type: String,
//       enum: ['Point'],
//       required: true
//     },
//     coordinates: {
//       type: [Number],
//       required: true
//     }
//   });

// Schema
var locationSchema = new mongoose.Schema({
    full_location: {type: String, required: true},
    state : { type: String, required: true},
    city : { type: String, required: true},
    pincode :   { type: Number, required: true},
    location : { type: String, required: true},
    status : { type: Boolean, required: true},
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

locationSchema.index({ coords: '2dsphere' });
var location = restful.model(collectionName, locationSchema, collectionName);
module.exports = location;