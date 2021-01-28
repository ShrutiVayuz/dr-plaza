// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'contactUs';

// Schema
var contactUsSchema = new mongoose.Schema({
    name: { type: String },
    message: { type: String },
    is_active: { type: Boolean  },
   
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

var location = restful.model(collectionName, contactUsSchema, collectionName);
module.exports = location;