const ClinicModel = require('../../models/Admin/clinic.model');
var mongoose = require('mongoose');
const PatientController = require('../../models/Admin/patient.model');
const ClinicManager = require('../../models/Admin/clinic_manager.model');
const Handler = require('../../Handlers/app.handler');

exports.getAll = (req, res, next) => {
    return ClinicModel.find().sort({ createdAt: -1 })
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get clinic');
        });
};
exports.getById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return ClinicModel.findOne(details)
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get clinic');
        });
};

// exports.getNear = (req, res, next)=>{
//     console.log(req.query);
//     return ClinicModel.find({
//         coords: {
//          $near: {
//           $maxDistance: 1000,
//           $geometry: {
//            type: "Point",
//            coordinates: [req.query.latitude, req.query.longitude]
//           }
//          }
//         }
//        }).find((error, results) => {
//         if (error) console.log(error);
//         Handler.getAllHandler(res, results);
//         // console.log(results);
//         // console.log(JSON.stringify(results, 0, 2));
//        });
// };

exports.create = (req, res, next) => {
    var cords = { type: 'Point', coordinates: [req.body.latitude, req.body.longitude] };
    const data = new ClinicModel({
        clinicName: req.body.clinicName,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        location: req.body.location,
        comment: req.body.comment,
        floorCount : req.body.floorCount,
        status: true,
        vicinity: req.body.vicinity,
        coords: cords
    });
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to create clinic');
        });
};

exports.updateById = (req, res, next) => {
    console.log(req.body);
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.clinicName != null) {
        data['clinicName'] = req.body.clinicName;
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
    if (req.body.comment != null) {
        data['comment'] = req.body.comment;
    }
    if (req.body.status != null) {
        data['status'] = req.body.status;
    }
    if (req.body.vicinity != null) {
        data['vicinity'] = req.body.vicinity;
    }
    if (req.body.floorCount != null) {
        data['floorCount'] = req.body.floorCount;
    }
    if(req.body.latitude && req.body.longitude){
        var cords = { type: 'Point', coordinates: [req.body.latitude, req.body.longitude] };
        if (cords != null) {
            data['coords'] = cords;
        }
    }
    
    return ClinicModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to update clinic');
        });
};

exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return ClinicModel.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to delete location');
        });
};


exports.getByStatus = (req, res, next) => {
    console.log('hitzzzzz')
    const id = req.body.status;
    const details = { 'status': id };
    return ClinicModel.find(details)
        .exec()
        .then((data) => {
            Handler.getByStatusHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get clinic');
        });
};

exports.stateNames = (req, res, next) => {
    console.log('getting state names..')
    return ClinicModel.distinct('state', { "state": { $nin: ["", null] } })
        .then(function (data) {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get state names');
        });
}

exports.cityNames = (req, res, next) => {
    console.log('getting citynames..')
    return ClinicModel
        .distinct('city', { "city": { $nin: ["", null] } })
        .then(function (data) {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get city names');
        });
}

exports.pincodeNames = (req, res, next) => {
    console.log('getting  ppincodes..')
    return ClinicModel.distinct('pincode', { "pincode": { $nin: ["", null] } })
        .then(function (data) {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get pincodes');
        });
}

exports.getPatientsAddedByClinic = (req, res, next) => {
    const id = req.params.id;
    const details = { 'clinicId': mongoose.Types.ObjectId(id) };
    return PatientController.find(details)
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get patients of Clinic');
        });
};

exports.getRegisteredClinic = async (req, res) => {
    try {
        // var start = new Date();
        // start.setHours(0, 0, 0, 0);

        // var end = new Date();
        // end.setHours(23, 59, 59, 999);
        
        // const data = await ClinicModel.find({ createdAt: {$gte: start, $lt: end }});
        const clinicCount = await ClinicModel.find().countDocuments();
        return res.status(200).json({
            "message": "get all registered clinic",
            "success": true,
            "data": clinicCount,
            // 'dataa': data
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getTodayRegisteredClinic = async( req, res )=> {
    try {
         var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);
        
        const data = await ClinicModel.find({ createdAt: {$gte: start, $lt: end }}).countDocuments();
        return res.status(200).json({
            "message": "get registered clinic",
            "success": true,
            "data": data,
        })
    } catch(error) {
        res.send(error);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.assignClinicManager = async ( req, res ) => {
    try {
        if (!req.body.email ) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            });
        }
        var manager = await ClinicManager.findOne({ email: req.body.email })
        await ClinicModel.findOneAndUpdate({ '_id' : mongoose.Types.ObjectId(req.body.clinicId) }, {
            'clinicManagerId' : mongoose.Types.ObjectId(manager._id)
        }, async(errors, resp) => {
            if(errors){
                return res.status(200).json({
                    "message": "Unable to assign",
                    "success": false
                });
            }
        })
        await ClinicManager.findOneAndUpdate({ email: req.body.email }, {
            clinicId : mongoose.Types.ObjectId(req.body.clinicId)
        },async (errors, result) => {
            if(errors){
              return res.status(400).send(errors);
            }else {
                return res.status(200).json({
                    "message": "assigned clinic manager",
                    "success": true,
                    "data": result,
                })
            }
        });

    } catch (err) {
        res.status(500).send(err);
    }
}