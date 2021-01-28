// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'staff';

// Schema
var staffSchema = new mongoose.Schema({
    staff_id: { type: String },
    employee_id: { type: String },
    user_name : { type: String, required: true},
    email : { type: String, required: true},
    password : { type: String, required: true},
    roles : { type: Array, required: true},
    is_active: { type: Boolean, required: true }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var staff = restful.model(collectionName, staffSchema, collectionName);
module.exports = staff;