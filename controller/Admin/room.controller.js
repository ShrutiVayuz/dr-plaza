const RoomModel = require('../../models/Admin/room.model');
var mongoose = require('mongoose');
const DoctorModel = require('../../models/Admin/doctor.model');
const Handler = require('../../Handlers/app.handler');
const defaultVariables = '_id createdAt UpdatedAt';
const RoomSchedule = require('../../models/Admin/room_schedule.model');
const allowedVariables = 'doctorId clinicId roomId rentPerMonth status paidOn';
//{path: 'category_id', select: 'name'}

exports.assignRoomToDoctor = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            });
        }
        const user = await DoctorModel.findOne({ email: req.body.email, is_approved: true });
        if (!user) {
            return res.status(200).json({
                "message": "Invalid email ",
                "success": false
            })
        }
        const add_room = { roomId: req.body.room_id }
        const doctor_room = await DoctorModel.findOneAndUpdate({ doctor_id: user.doctor_id }, add_room, {
            new: true
        }, async (error, result) => {
            if (error) {
                return res.status(400).send(error);
            } else {
                const room_add = { doctorData: user._id }
                const room_doctor = await RoomModel.findOneAndUpdate({ _id: req.body.room_id }, room_add, {
                    new: true
                }, async (errors, result) => {
                    if (errors) {
                        return res.status(400).send(errors);
                    } else {

                    }
                });
            }
        });
        return res.status(200).json({
            "message": "Doctor details added successfully",
            "success": true,
            "data": doctor_room
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.getAll = (req, res, next) => {
    // console.log(req.params.id)
    return RoomModel.find()
        .populate({ path: 'clinicData', select: ['clinicName', 'state'] })
        .populate({ path: 'doctorData', select: 'doctorName' })
        .populate({ path: 'clinicManagerId', select: 'clinic_manager_name' })
        .exec((error, data) => {
            if (error) {
                Handler.errorHandler(res, error);
            }
            else {
                Handler.getAllHandler(res, data);
            }
        })
};

exports.getAllRoom = (req, res, next) => {
    // console.log(req.params.id)
    return RoomModel.find({ clinicData: req.params.id })
        .populate({ path: 'clinicData', select: ['clinicName', 'state'] })
        .populate({ path: 'doctorData', select: 'doctorName' })
        .populate({ path: 'clinicManagerId', select: 'clinic_manager_name' })
        .exec((error, data) => {
            if (error) {
                Handler.errorHandler(res, error);
            }
            else {
                Handler.getAllHandler(res, data);
            }
        })
};


exports.createRoom = async (req, res) => {
    try {
        console.log(req.body)
        for (let i = 0; i < req.body.inputArr.length; i++) {
            const rooms = new RoomModel({
                room_id: 'Room' + Date.now(),
                roomNumber: req.body.inputArr[i].roomNumber,
                floor: req.body.inputArr[i].floor,
                roomName: req.body.inputArr[i].roomName,
                specialization: req.body.inputArr[i].specialization,
                roomStartTime: req.body.inputArr[i].startTime,
                roomEndTime: req.body.inputArr[i].endTime,
                clinicData: req.body.clinicData,
                rentPerMonth: req.body.inputArr[i].rentPerMonth,
                paidStatus : false
            });
            await rooms.save(async (err, resps) => {
                if (err) {
                    console.log('errrrrrrrrrrlllll', err)
                    return res.status(200).send(err);
                }
                else {
                    console.log(resps)
                    for (let j = 0; j < req.body.inputArr[i].days.length; j++) {
                        const roomSchedule = new RoomSchedule({
                            roomSchedule_id: 'room_schedule' + Date.now(),
                            roomId: resps._id,
                            day: req.body.inputArr[i].days[j],
                            is_active: true
                        })
                        await roomSchedule.save(async (errs, resp) => {
                            if (errs) {
                                return res.status(200).send(errs);
                            } else {
                                console.log('added' + i + j)
                            }
                        })
                    }

                }
            })
        }
        return res.status(200).json({
            "message": "room added!",
            "success": true
        })
    } catch (error) {
        // res.send(error);
        res.status(500).send(error);
    }
}

exports.editRoom = async (req, res) => {
    try {
        // console.log(req.body)
        await RoomSchedule.deleteMany({roomId : req.body.id});
        const update = {
            roomNumber: req.body.roomNumber,
            floor: req.body.floor,
            roomName: req.body.roomName,
            specialization: req.body.specialization,
            roomStartTime: req.body.startTime,
            roomEndTime: req.body.endTime,
            rentPerMonth: req.body.rentPerMonth
        }
        const room_update = await RoomModel.findOneAndUpdate({ _id: req.body.id }, update, {
            new: true
        }, async (error, result) => {
            if (error) {
                return res.status(400).send(errors);
            } else {
                for (let j = 0; j < req.body.days.length; j++) {
                    const roomSchedule = new RoomSchedule({
                        roomSchedule_id: 'room_schedule' + Date.now(),
                        roomId:req.body.id,
                        day: req.body.days[j],
                        is_active: true
                    })
                    await roomSchedule.save(async (errs, resp) => {
                        if (errs) {
                            return res.status(200).send(errs);
                        } else {
                            console.log('added' + i + j)
                        }
                    })
                }

            }

        });
        return res.status(200).json({
            "message": "updated successfully",
            "success": true,
            "data": room_update
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getRoomById = async (req, res) => {
    try {
        const myClinic = await RoomSchedule.find({ roomId: req.params.id }).populate('roomId');
        return res.status(200).json({
            "message": " Get room ",
            "success": true,
            "data": myClinic
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.getMyClinic = async (req, res) => {
    try {
        const myClinic = await RoomModel.find({ doctorData: req.body.id }).populate('clinicData');
        return res.status(200).json({
            "message": " Get my clinic ",
            "success": true,
            "data": myClinic
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}


exports.RoomsOfClinic = (req, res, next) => {
    const id = req.params.id;
    const details = { 'clinicData': mongoose.Types.ObjectId(id) };
    return RoomModel.find(details)
        .populate('doctorData', '_id doctorName specialization')
        .populate('clinicData')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getById = (req, res, next) => {
    console.log(req.params)
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return RoomModel.findOne(details)
        .populate({ path: 'clinicData' })
        .populate({ path: 'doctorData' })
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getDoctorsOfClinic = (req, res, next) => {
    const id = req.params.id;
    const details = { 'clinicData': mongoose.Types.ObjectId(id) };
    return RoomModel.find(details)
        .populate('doctorData', '-password')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getDoctorOfClinic = (req, res, next)=>{
    const id = req.params.id;
    const details = { 'doctorData': mongoose.Types.ObjectId(id) };
    return RoomModel.findOne(details)
        .populate('doctorData', '-password')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.create = (req, res, next)=>{
    const data = new RoomModel({
        room_id: 'Room' + Date.now(),
        clinicData: req.body.clinicData,
        roomNumber: req.body.roomNumber,
        is_available: true,
        paidStatus: req.body.paidStatus,
    }, {
        timestamps: true,
        versionKey: false // You should be aware of the outcome after set to false
    });
    if (req.body.paidStatus == true) {
        data['paidOn'] = new Date().getTime() + '';
    }
    if (req.body.paidStatus != null && req.body.paidStatus != '') {
        data['rentPerMonth'] = req.body.rentPerMonth;
    }
    if (req.body.doctorData != null && req.body.doctorData != '') {
        data['doctorData'] = req.body.doctorData;
    }
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.updateAvailability = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {
        is_available: req.body.is_available
    };
    return RoomModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.doctorData != null) {
        data['doctorData'] = req.body.doctorData;
    }
    if (req.body.clinicData != null) {
        data['clinicData'] = req.body.clinicData;
    }
    if (req.body.roomNumber != null) {
        data['roomNumber'] = req.body.roomNumber;
    }
    if (req.body.rentPerMonth != null) {
        data['rentPerMonth'] = req.body.rentPerMonth;
    }
    if (req.body.paidStatus != null) {
        data['paidStatus'] = req.body.paidStatus;
    }
    if (req.body.paidStatus == true) {
        data['paidOn'] = new Date().getTime() + '';
    }
    if (req.body.is_available == true) {
        data['is_available'] = req.params.is_available
    }
    return RoomModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};



exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return RoomModel.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.searchDocsBySpec = (req, res, next) => {
    console.log(req.query)
    return RoomModel.find()
        .populate({
            path: 'clinicData', match: {
                coords: {
                    $near: {
                        $maxDistance: 1000 * 100,
                        $geometry: {
                            type: "Point",
                            coordinates: [req.query.latitude, req.query.longitude]
                        }
                    }
                },
            },
        })
        .populate({
            path: 'doctorData',
            match: {
                specialization: req.query.dept
            },
            select: '_id doctorName specialization'
        })
        .exec()
        .then((data) => {
            data = data.filter(function (ele) {
                return ele.clinicData;
            });
            data = data.filter(function (ele) {
                return ele.doctorData;
            });
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get doctors');
        });
};


exports.getNear = (req, res, next) => {
    console.log(req.query)
    return RoomModel.find()
        .populate({
            path: 'clinicData', match: {
                coords: {
                    $near: {
                        $maxDistance: 1000*100,
                        $geometry: {
                            type: "Point",
                            coordinates: [req.query.latitude, req.query.longitude]
                        }
                    }
                },
                // pincode : req.params.pincode,
                // state : req.params.state ,
                // city : req.params.city
            },
        })
        .populate('doctorData', '_id doctorName specialization')
        .exec()
        .then((data) => {
            data = data.filter(function (ele) {
                // console.log(data)
                return ele.clinicData;
            });
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.search = (req, res, next) => {
    if (req.params.city !== 'null' || req.params.state !== 'null' || req.params.pincode !== 'null') {
        if (req.params.city !== 'null' && req.params.state === 'null' && req.params.pincode === 'null') {
            return RoomModel.find({ city: req.params.city })
                .populate({
                    path: 'clinicData', match: {
                        city: req.params.city
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
        if (req.params.city === 'null' && req.params.state !== 'null' && req.params.pincode === 'null') {
            return RoomModel.find()
                .populate({
                    path: 'clinicData', match: {
                        state: req.params.state
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
        if (req.params.city === 'null' && req.params.state === 'null' && req.params.pincode !== 'null') {
            return RoomModel.find()
                .populate({
                    path: 'clinicData', match: {
                        pincode: req.params.pincode
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
        if (req.params.city !== 'null' && req.params.state !== 'null' && req.params.pincode === 'null') {
            return RoomModel.find()
                .populate({
                    path: 'clinicData', match: {
                        state: req.params.state,
                        city: req.params.city
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
        if (req.params.city === 'null' && req.params.state !== 'null' && req.params.pincode !== 'null') {
            return RoomModel.find()
                .populate({
                    path: 'clinicData', match: {
                        pincode: req.params.pincode,
                        state: req.params.state
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
        if (req.params.city !== 'null' && req.params.state === 'null' && req.params.pincode !== 'null') {
            return RoomModel.find()
                .populate({
                    path: 'clinicData', match: {
                        pincode: req.params.pincode,
                        city: req.params.city
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
        if (req.params.city !== 'null' && req.params.state !== 'null' && req.params.pincode !== 'null') {
            return RoomModel
                .find()
                .populate({
                    path: 'clinicData', match: {
                        pincode: req.params.pincode,
                        state: req.params.state,
                        city: req.params.city
                    },
                })
                .populate('doctorData', '_id doctorName specialization')
                .exec()
                .then((data) => {
                    data = data.filter(function (data) {
                        return data.clinicData;
                    });
                    Handler.getAllHandler(res, data);
                })
                .catch((error) => {
                    Handler.errorHandler(res, error, 'Failed to get clinic');
                });
        }
    }
    else {
        return Handler.errorHandler(res, error, 'No field specified');
    }
    return Handler.errorHandler(res, error, 'Failed to get clinic');
}