// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'medicine_details';

// Schema
var medicineDetailsSchema = new mongoose.Schema({
    medicineDetails_id: { type: String },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicine' },
    prescriptionId: {type: mongoose.Schema.Types.ObjectId, ref: 'prescription'},
    medicineScheduleId: {type: mongoose.Schema.Types.ObjectId, ref: 'medicine_schedule'},
    medicine_instruction : { type: String },
    day: {type: String},
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, medicineDetailsSchema, collectionName);

module.exports = timing;