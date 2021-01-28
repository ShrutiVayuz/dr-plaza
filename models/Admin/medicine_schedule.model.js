// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'medicine_schedule';

// Schema
var medicineScheduleSchema = new mongoose.Schema({
    medicineSchedule_id: { type: String },
    medicineDetailsId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicine_details' },
    prescriptionId: {type: mongoose.Schema.Types.ObjectId, ref: 'prescription'},
    day: { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, medicineScheduleSchema, collectionName);

module.exports = timing;