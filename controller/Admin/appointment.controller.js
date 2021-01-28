var mongoose = require('mongoose');
const Handler = require('../../Handlers/app.handler');
const Appointment = require('../../models/Admin/appointment.model');
var ObjectId = require('mongodb').ObjectID;
const RoomModel = require('../../models/Admin/room.model');


exports.hasAnyAppointments = (req, res, next) => {
    const id = req.params.id;
    const details = { 'user_id': mongoose.Types.ObjectId(id), status : 'inactive' };
    return Appointment.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

const limit_ = 2
exports.AppointmentsOfPatient = async (req, res, next) => {
    const id = req.params.id;
    const details = { 'user_id': mongoose.Types.ObjectId(id) };
    // let aggregate_options = [];

    // let page = parseInt(req.query.page) || 1;
    // let limit = parseInt(req.query.limit) || limit_;

    // const options = {
    //     page, limit,
    //     collation: {locale: 'en'},
    //     customLabels: {
    //         totalDocs: 'totalResults',
    //         docs: 'appointments'
    //     }
    // };

    // const myAggregate = Appointment.aggregate(aggregate_options);
    // const result = await Appointment.aggregatePaginate(myAggregate, options);
    // return res.status(200).json(result);
    return Appointment.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.AppointmentsOfClinic = (req, res, next) => {
    const id = req.params.id;
    const details = { 'clinic_id': mongoose.Types.ObjectId(id) };
    return Appointment.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.TodaysAppointmentsOfClinic = (req, res, next) => {
    const id = req.params.id;
    const details = { 'clinic_id': mongoose.Types.ObjectId(id),
    date: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59))
         } };
    // console.log(new Date(new Date().setHours(00, 00, 00)));
    // console.log(new Date(new Date().setHours(23, 59, 59)));
    return Appointment.find(details)
        .populate('user_id', '_id email')
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.AppointmentsOfDate = (req, res, next) => {
    const id = req.params.id;
    // console.log(req.query.date);
    const start = new Date(new Date(req.query.date).setHours(05, 30, 00));
    const end = new Date(new Date(req.query.date).setHours(28, 89, 59));
    const details = { 'user_id': mongoose.Types.ObjectId(id),
    date: {
        $gte: start,
        $lt: end
         }};
    return Appointment.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getAppointmentsOfPatient = (req, res, next) => {
    const details = { 
        'user_id': mongoose.Types.ObjectId(req.query.patientId),
        'clinic_id': mongoose.Types.ObjectId(req.query.clinicId),
    };
    return Appointment.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.bookAppointment = async (req, res) => {
    var clinic_id;
    if ( !req.body.date || !req.body.patient_id) {
        return res.status(200).json({
            "message": "please provide all information",
            "success": false
        })
    };
    await RoomModel.findOne({ doctorData : req.body.doctor_id })
    .select('_id clinicData')
    .exec()
    .then((data)=>{
        this.clinic_id = data.clinicData
    });
    console.log(req.body);
    appointment = new Appointment({
        gender : req.body.gender,
        departmentname : req.body.departmentname,
        doctorname : req.body.doctorname,
        problem : req.body.problem,
        status : req.body.status,
        payment_status : req.body.payment_status,
        mode_of_payment : req.body.mode_of_payment,
        date : new Date(req.body.date),
        consultation_fee : req.body.consultation_fee,
        user_id : req.body.user_id,
        patient_id : req.body.patient_id,
        doctor_id : req.body.doctor_id,
        patientname: req.body.patientname,
        clinic_id : this.clinic_id,
        booked_as : req.body.booked_as,
        age : req.body.age,
        payment_id : req.body.payment_id,
    });
    await appointment.save((errors, result) => {
        if (errors) {
            return res.status(400).send(errors);
        } else {
            return res.status(200).json({
                "message": "appointment created successfully",
                "success": true,
                "data": result
            });
        }
    })
}


exports.cancelAppointment = async (req, res, next)=>{
    const id = req.params.id;
    console.log('came')
    console.log(req.body)
    const details = {'_id': mongoose.Types.ObjectId(id) };
    var paymentId ; 
    const apmt = await Appointment.findOne(details);
    data = {}
    data['status'] = 'inactive';
    if (req.body.by != null) {
        data['cancelledBy'] = req.body.by;
    }
    Appointment.updateOne(details, data)
    .exec()
    .then((result) => {
        return res.json({
            "message": "appointment deleted successfully",
            "success": true,
            status : 200,
            "data": apmt
        });
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to delete location');
    });
};


exports.updateAppointmentDate = async (req, res, next)=>{

    var id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    var apmt = await Appointment.findOne(details);
    var data = {};
    if (req.body.date != null) {
        data['date'] = req.body.date;
    }
    if (req.body.by != null) {
        data['rescheduledBy'] = req.body.by;
        data['rescheduledFrom'] = apmt.date;
        data['rescheduledTo'] = req.body.date;
    }
    return Appointment.updateOne(details,data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update location');
    });
};

exports.changePaymentStatus = (req, res, next)=>{
    var id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.payment_status != null) {
        data['payment_status'] = req.body.payment_status;
    }
    return Appointment.updateOne(details,data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update location');
    });
};

exports.changeStatus = (req, res, next)=>{
    var id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if(req.body.status === 'active'){
        data['status'] = 'inactive';
    }
    if(req.body.status === 'inactive'){
        data['status'] = 'active';
    }

    return Appointment.updateOne(details,data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update status');
    });
};


exports.getAll = (req, res, next) => {
    return Appointment.find()
        .sort({ date: 'asc'}) 
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
    return Appointment.findOne(details)
        .populate('user_id', '_id gender contact_number')
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get appointment');
        });
};
exports.getDoctorAppointement = async (req, res) => {
    try {
        const id = req.body.id;
        const cancelData = await Appointment.find({doctor_id: id, status: 'inactive'}).countDocuments();
        console.log('ccccccc',id,cancelData)
        const data = await Appointment.find({ doctor_id: id}).sort({ createdAt: -1});
        return res.status(200).json({
            "message": " Get Doctors Appointment ",
            "success": true,
            "data": data,
            "cancel_data": cancelData
        })
    } catch (err){
        res.status(500).send(err);
    }
};

exports.getCancelledAppointmentCount = async (req, res) => {
    try {
        const data = await Appointment.find({doctor_id: req.body.id, cancelledBy: {$exists: true} }).countDocuments();
        const admin = await Appointment.find({doctor_id: req.body.id, cancelledBy: 'admin' }).countDocuments();
        const patient = await Appointment.find({doctor_id: req.body.id, cancelledBy: 'patient' }).countDocuments();

        return res.status(200).json({
            "message": " Get Cancel Appointment Count",
            "success": true,
            "data": data,
            "admin": admin,
            "patient": patient,
            // "cancel_data": cancelData
        })
    } catch(error) {
        return res.status(500).send(error);
    }
};

exports.getAppointementById = async (req, res) => {
    try {
        const id = req.body.id;
        const details = await Appointment.findOne({ _id: id}).populate('user_id')
        .populate({ path: 'clinic_id' });
        return res.status(200).json({
            "message": " Get Doctors Appointment ",
            "success": true,
            "data": details
        })
    } catch (err){
        res.status(500).send(err);
    }
}

exports.AppointmentsCountLastWeek = async( req, res )=> {
    try {
        var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
            , day = beforeOneWeek.getDay()
            , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
        var lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
        var lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));
        lastMonday = new Date(lastMonday.setHours(05, 30, 00));
        lastSunday = new Date(lastSunday.setHours(28,89,59));
        // console.log(lastMonday, lastSunday);
        const data = await Appointment.find({
            createdAt : {
                $gte: lastMonday,
                $lt: lastSunday
            } 
        }).countDocuments();
        return res.status(200).json({
            "message": "appointment count for last week",
            "success": true,
            "data": data
        })
    } catch(error) {
        res.status(500).send(error);
    }
}

exports.AppointmentsCountLastMonth = async( req, res )=> {
    try {
        var nowdate = new Date();
        var monthStartDay = new Date(nowdate.getFullYear(), nowdate.getMonth() - 1 , 1);
        var monthEndDay = new Date(nowdate.getFullYear(), nowdate.getMonth() , 0);
        monthStartDay = new Date(monthStartDay.setHours(05, 30, 00));
        monthEndDay = new Date(monthEndDay.setHours(28,89,59));
        const data = await Appointment.find({
            createdAt : {
                $gte: monthStartDay,
                $lt: monthEndDay
            } 
        }).countDocuments();
        return res.status(200).json({
            "message": "appointment count for last month",
            "success": true,
            "data": data
        })
    } catch(error) {
        res.status(500).send(error);
    }
}

exports.AppointmentsCountMonthly = async( req, res )=> {
    try {
        const FIRST_MONTH = 1
        const LAST_MONTH = 12
        const MONTHS_ARRAY = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

        let TODAY = new Date()
        let YEAR_BEFORE = new Date((new Date("2020-01-01T00:00:00")).setHours(05, 30, 00))
        
    Appointment.aggregate( [
        { $match: { createdAt: { $gte: YEAR_BEFORE, $lte: TODAY } } },
        { $group: { _id: { "year_month": { $substrCP: [ "$createdAt", 0, 7 ] } }, count: { $sum: 1 } } },
        { $sort: { "_id.year_month": 1 } },
        { 
            $project: { 
                _id: 0, 
                count: 1, 
                month_year: { 
                    $concat: [ 
                        { $arrayElemAt: [ MONTHS_ARRAY, { $subtract: [ { $toInt: { $substrCP: [ "$_id.year_month", 5, 2 ] } }, 1 ] } ] },
                        "-", 
                        { $substrCP: [ "$_id.year_month", 0, 4 ] }
                    ] 
                }
            } 
        },
        { $group: { _id: null, data: { $push: { k: "$month_year", v: "$count" } } } },
        { 
            $addFields: { 
                start_year: { $substrCP: [ YEAR_BEFORE, 0, 4 ] }, 
                end_year: { $substrCP: [ TODAY, 0, 4 ] },
                months1: { $range: [ { $toInt: { $substrCP: [ YEAR_BEFORE, 5, 2 ] } }, { $add: [ LAST_MONTH, 1 ] } ] },
                months2: { $range: [ FIRST_MONTH, { $add: [ { $toInt: { $substrCP: [ TODAY, 5, 2 ] } }, 1 ] } ] }
            } 
        },
        { 
            $addFields: { 
                template_data: { 
                    $concatArrays: [ 
                        { $map: { 
                            input: "$months1", as: "m1",
                            in: {
                                count: 0,
                                month_year: { 
                                    $concat: [ { $arrayElemAt: [ MONTHS_ARRAY, { $subtract: [ "$$m1", 1 ] } ] }, "-",  "$start_year" ] 
                                }                                            
                            }
                        } }, 
                        { $map: { 
                            input: "$months2", as: "m2",
                            in: {
                                count: 0,
                                month_year: { 
                                    $concat: [ { $arrayElemAt: [ MONTHS_ARRAY, { $subtract: [ "$$m2", 1 ] } ] }, "-",  "$end_year" ] 
                                }                                            
                            }
                        } }
                    ] 
                }
            }
        },
        { 
            $addFields: { 
                data: { 
                    $map: { 
                        input: "$template_data", as: "t",
                        in: {   
                            k: "$$t.month_year",
                            v: { 
                                $reduce: { 
                                    input: "$data", initialValue: 0, 
                                    in: {
                                        $cond: [ { $eq: [ "$$t.month_year", "$$this.k"] },
                                                    { $add: [ "$$this.v", "$$value" ] },
                                                    { $add: [ 0, "$$value" ] }
                                        ]
                                    }
                                } 
                            }
                        }
                    }
                }
            }
        },
        {
            $project: { 
                data: { $arrayToObject: "$data" }, 
                _id: 0 
            } 
        }
        ])
        .exec()
        .then(data => {
            res.status(200).json({
                "message": "Appointments count for monthly",
                "success": true,
                "data": data
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        })
    } catch(error) {
        res.status(500).send(error);
    }
}

