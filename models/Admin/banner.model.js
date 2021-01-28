// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'banner';

// Schema
var bannerSchema = new mongoose.Schema({
    banner_title: { type: String, required: true },
    banner_category: { type: String, required: true },
    banner_image: { type: String, required: true },
    is_active: { type: Boolean, required: true },
   
}, {
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});

var location = restful.model(collectionName, bannerSchema, collectionName);
module.exports = location;