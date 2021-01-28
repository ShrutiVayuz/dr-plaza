// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'clinic_manager';

// Schema
var clinicManagerSchema = new mongoose.Schema({
    clinic_manager_name: { type: String, required: true },
    email: { type: String, required: true },
    password:{ type: String },
    clinic_manager_image: { type: String },
    is_active: { type: Boolean, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room'},
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'clinic'},
   
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'},
    versionKey: false // You should be aware of the outcome after set to false
});

var location = restful.model(collectionName, clinicManagerSchema, collectionName);
module.exports = location;