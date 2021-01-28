// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'master';

// Schema
var adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
},{
    timestamps : true,
    versionKey: false // You should be aware of the outcome after set to false
});

// adminSchema.set('toJSON', {
//     virtuals: true
// });


var adminModel = restful.model(collectionName, adminSchema, collectionName);

module.exports = adminModel;