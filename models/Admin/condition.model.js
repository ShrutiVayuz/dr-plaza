// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'condition';

// Schema
var conditionSchema = new mongoose.Schema({
    healthIssues : { type: String, required: true},
    status : { type: Boolean, required: true}
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var condition = restful.model(collectionName, conditionSchema, collectionName);

module.exports = condition;