var mongoose = require('mongoose');
const SpecializationModel = require('../../models/Admin/specialization.model');

const Handler = require('../../Handlers/app.handler');

exports.getAll = (req, res, next)=>{
    return SpecializationModel.find()
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
    return SpecializationModel.findOne(details)
    .exec()
    .then((data) => {
        Handler.getByIdHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};
exports.create = (req, res, next)=>{
    const data = new SpecializationModel({
        specialization : req.body.specialization,
        condition : req.body.condition,
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
    const details = {'_id': mongoose.Types.ObjectId(id)};
    var data = {};
    if (req.body.specialization != null) {
        data['specialization'] = req.body.specialization;
    }
    if (req.body.condition != null) {
        data['condition'] = req.body.condition;
    }
    
    return SpecializationModel.updateOne(details,data)
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
    SpecializationModel.deleteOne(details)
    .exec()
    .then((result) => {
        Handler.deleteByIdHandler(res, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to delete location');
    });
};

exports.getDeptName = async (req, res) => {
    try{
        const state = await SpecializationModel.distinct("specialization");
        res.status(200).json({
            "message": "Get all statte",
            "success": true,
            "data": state
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}