// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

const collectionName = 'room_schedule';

// Schema
var roomScheduleSchema = new mongoose.Schema({
    roomSchedule_id: { type: String },
    // medicineDetailsId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicine_details' },
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'room'},
    day: { type: String },
    is_active : {type: Boolean }
},{
    timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });

var timing = restful.model(collectionName, roomScheduleSchema, collectionName);

module.exports = timing;