const notificationModel = require('../../models/Admin/notification.model');
var mongoose = require('mongoose');
const Handler = require('../../Handlers/app.handler');


exports.getAll = (req, res, next)=>{
    return notificationModel.find()
        .exec()
        .then((data) => { 
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.notificationsOfDoctor = (req, res, next)=>{
    return notificationModel.find({ doctor_id : req.params.id })
        .sort({ createdAt: 'desc'})
        .exec()
        .then((data) => { 
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.notificationsOfPatient = (req, res, next)=>{
    console.log('fetching notifications....');
    return notificationModel.find({ patient_id : req.params.id })
        .sort({ createdAt: 'desc'})
        .exec()
        .then((data) => { 
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.getById = (req, res, next)=>{
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return notificationModel.findOne(details)
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.createNotification = (req, res, next)=>{
    const data = new notificationModel({
        content : req.body.content,
        type : req.body.type,
        source : req.body.source,
        dest : req.body.dest,
        doctor_id : req.body.doctor_id,
        patient_id : req.body.patient_id,
        is_read : false,
        is_active : req.body.is_active
    });
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.createByPostRequest = (req, res, next)=>{
    const data = new notificationModel({
        content : req.body.content,
        type : req.body.type,
        source : req.body.source,
        dest : req.body.dest,
        doctor_id : req.body.doctor_id,
        patient_id : req.body.patient_id,
        is_read : false,
        is_active : req.body.is_active
    });
    return data.save()
        .then((result) => {
            console.log('notification created')
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.updateActiveStatus = (req, res, next)=>{
    const id = req.params.id;
    const details = { _id: mongoose.Types.ObjectId(id) };
    var data = {
        is_active : req.body.is_active
    };
    return notificationModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.updateReadStatus = (req, res, next)=>{
    const id = req.params.id;
    const details = { _id: mongoose.Types.ObjectId(id) };
    var data = {
        is_read : req.body.is_read
    };
    return notificationModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.deleteById = (req, res, next)=>{
    const id = req.params.id;
    const details = { _id: mongoose.Types.ObjectId(id) };
    return notificationModel.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};