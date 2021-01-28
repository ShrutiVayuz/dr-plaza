// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'cookie_policy';

// Schema
var cookiePolicySchema = new mongoose.Schema({
    cookie_id: { type: String },
    title: { type: String },
    short_description : { type: String },
    description: { type: String },
    meta_data: { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, cookiePolicySchema, collectionName);

module.exports = timing;