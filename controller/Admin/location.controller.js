var mongoose = require('mongoose');
const LocationModel = require('../../models/Admin/location.model');

const Handler = require('../../Handlers/app.handler');



exports.getAll = (req, res, next)=>{
    return LocationModel.find()
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
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return LocationModel.findOne(details)
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to get location');
        });
};
exports.create = (req, res, next)=>{
    console.log(req.body);
    var cords = { type: 'Point', coordinates: [req.body.latitude, req.body.longitude] };
    const data = new LocationModel({
        full_location: req.body.full_location,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        location: req.body.location,
        status: req.body.status,
        coords : cords
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
exports.updateById = (req, res, next)=>{
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.full_location != null) {
        data['full_location'] = req.body.full_location;
    }
    if (req.body.state != null) {
        data['state'] = req.body.state;
    }
    if (req.body.city != null) {
        data['city'] = req.body.city;
    }
    if (req.body.pincode != null) {
        data['pincode'] = req.body.pincode;
    }
    if (req.body.location != null) {
        data['location'] = req.body.location;
    }
    if (req.body.status != null) {
        data['status'] = req.body.status;
    }
    return LocationModel.updateOne(details, data)
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
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return LocationModel.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to delete location');
        });
};

exports.getState = async (req, res) => {
    try{
        const state = await LocationModel.distinct("state");
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

exports.getCity = async (req, res) => {
    try{
        const state = await LocationModel.distinct("city", {state: req.body.state});
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