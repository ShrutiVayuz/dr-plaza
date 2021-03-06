var mongoose = require('mongoose');
const TimingModel = require('../../models/Admin/timing.model');

const Handler = require('../../Handlers/app.handler');

exports.getAll = (req, res, next)=>{
    return TimingModel.find()
    .exec()
    .then((data) => { 
        Handler.getAllHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};

exports.getById = (req, res, next)=>{
    const id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    return TimingModel.findOne(details)
    .exec()
    .then((data) => {
        Handler.getByIdHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};
exports.create = (req, res, next)=>{
    const data = new TimingModel({
        timeSlot : req.body.timeSlot,
        status : true
    },{
        timestamps : true,
        versionKey: false // You should be aware of the outcome after set to false
    });
    return data.save()
    .then((result) => {
        Handler.createHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to create location');
    });
};
exports.updateById = (req, res, next)=>{
    const id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.timeSlot != null) {
        data['timeSlot'] = req.body.timeSlot;
    }
    if (req.body.status != null) {
        data['status'] = req.body.status;
    }
    
    return TimingModel.updateOne(details,data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update location');
    });
};
exports.deleteById = (req, res, next)=>{
    const id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    return TimingModel.deleteOne(details)
    .exec()
    .then((result) => {
        Handler.deleteByIdHandler(res, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to delete location');
    });
};