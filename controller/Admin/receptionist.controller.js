const ReceptionistModel = require('../../models/Admin/receptionist.model');
var mongoose = require('mongoose');

const Handler = require('../../Handlers/app.handler');

const PasswordGenerator = require('../../Handlers/password.handler');
const newPassword = PasswordGenerator.generatePassword();

exports.getAll = (req, res, next)=>{
    return ReceptionistModel.find()
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
    return ReceptionistModel.findOne(details)
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};
exports.create = (req, res, next)=>{
    const data = new ReceptionistModel({
        receptionistName : req.body.receptionistName,
        email : req.body.email,
        password : newPassword,
        clinicId : req.body.clinicId,
        image : req.body.image,
        status : true,
    }, {
        timestamps: true,
        versionKey: false // You should be aware of the outcome after set to false
    });
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};
exports.updateById = (req, res, next)=>{
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.receptionistName != null) {
        data['receptionistName'] = req.body.receptionistName;
    }
    if (req.body.email != null) {
        data['email'] = req.body.email;
    }
    if (req.body.password != null) {
        data['password'] = req.body.password;
    }
    if (req.body.clinicId != null) {
        data['clinicId'] = req.body.clinicId;
    }
    if (req.body.image != null) {
        data['image'] = req.body.image;
    }
    if (req.body.status != null) {
        data['status'] = req.body.status;
    }
    return ReceptionistModel.updateOne(details, data)
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
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return ReceptionistModel.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};