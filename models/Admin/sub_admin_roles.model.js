// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'roles';

// Schema
var subAdminRoleSchema = new mongoose.Schema({
    role_id: { type: String },
    role_name: { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var roles = restful.model(collectionName, subAdminRoleSchema, collectionName);

module.exports = roles;