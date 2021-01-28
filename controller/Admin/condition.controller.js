var mongoose = require('mongoose');
const ConditionModel = require('../../models/Admin/condition.model');

const Handler = require('../../Handlers/app.handler');

exports.getAll = (req, res, next)=>{
    return ConditionModel.find()
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
    return ConditionModel.findOne(details)
    .exec()
    .then((data) => {
        Handler.getByIdHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};
exports.create = (req, res, next)=>{
    const data = new ConditionModel({
        healthIssues : req.body.healthIssues,
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
    if (req.body.healthIssues != null) {
        data['healthIssues'] = req.body.healthIssues;
    }
    if (req.body.status != null) {
        data['status'] = req.body.status;
    }
    return ConditionModel.updateOne(details,data)
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
    return ConditionModel.deleteOne(details)
    .exec()
    .then((result) => {
        Handler.deleteByIdHandler(res, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to delete location');
    });
};