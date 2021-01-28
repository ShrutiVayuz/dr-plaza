var mongoose = require('mongoose');
const Favourite = require('../../models/Admin/favourite.model');

const Handler = require('../../Handlers/app.handler');

exports.getAll = (req, res, next)=>{
    return Favourite.find()
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
    const details = { 'userId': mongoose.Types.ObjectId(id) };
    return Favourite.find(details)
    .populate('doctorId', '_id doctorName specialization')
        .populate('clinicId')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to get favourites');
        });
};

exports.addToFav = (req, res, next)=>{
    const data = new Favourite({
        userId : req.body.userId,
        doctorId : req.body.doctorId,
        clinicId : req.body.clinicId,
    }, {
        timestamps: true,
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

exports.deleteById = (req, res, next)=>{
    const id = req.params.id;
    const details = { 'doctorId': mongoose.Types.ObjectId(id) };
    return Favourite.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to delete location');
        });
};