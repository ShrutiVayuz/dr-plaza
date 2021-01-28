// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'medicine';

// Schema
var medicineSchema = new mongoose.Schema({
    medicine_id: { type: String },
    medicine_name: { type: String },
    medicine_type : { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, medicineSchema, collectionName);

module.exports = timing;