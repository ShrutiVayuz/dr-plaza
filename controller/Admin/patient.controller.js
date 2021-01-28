var mongoose = require('mongoose');
const PatientController = require('../../models/Admin/patient.model');

const Handler = require('../../Handlers/app.handler');

const PasswordGenerator = require('../../Handlers/password.handler');
const newPassword = PasswordGenerator.generatePassword();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');



exports.sendOtp = async (req, res) => {
    console.log(req.query);
    try {
        const random = Math.random().toString().slice(-4);
        const update = {
            otp: random
        }
        const patient_otp = await PatientController.findOneAndUpdate({ patient_id: user.patient_id }, update, {
            new: true
        }, async (error, result) => {
            if (error) {
                return res.status(400).send(error);
            } else {
                async function main() {
                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        port: 4000,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "ankit.vayuz@gmail.com",
                            pass: "knvvwvluttcrdxhk"
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let info = await transporter.sendMail({

                        from: 'ankit.vayuz@gmail.com',
                        to: req.body.email,
                        subject: "Doctor Plaza ",
                        text: "Otp for Change Password ",
                        html: "<p>Otp :</p>" + random,
                    });

                }
                main().catch(console.error);
            }
        })
        res.status(200).json({
            "message": "Otp send Succesfully",
            "success": true,
            "data": patient_otp
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.addPatient = async (req, res) => {
    console.log('adding patient')
    try {
        // console.log(req.body)
        if (req.body.is_admin) {
            if (!req.body.patient_name || !req.body.email) {
                return res.status(200).json({
                    "message": "please provide all information",
                    "success": false
                })
            };
            let randomstring = Math.random().toString(36).slice(-3);
            let date = Date.now().toString().slice(-3);
            let password = "V^z!" + randomstring + date;
            console.log(password);
            let user = await PatientController.findOne({ email: req.body.email });

            if (user) {
                return res.status(200).json({
                    "message": "User already exist",
                    "success": false
                })
            } else {
                user = new PatientController({
                    patient_id: 'Patient'+Date.now(),
                    patient_name: req.body.patient_name,
                    email: req.body.email,
                    password: password,
                    contact_number: req.body.contactNumber,
                    age: req.body.age,
                    is_active: false,
                    signup_details: false,
                });
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save((errors, result) => {
                    if (errors) {
                        return res.status(400).send(errors)
                    } else {
                        async function main() {
                            let transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                port: 4000,
                                secure: false, // true for 465, false for other ports
                                auth: {
                                    user: "ankit.vayuz@gmail.com",
                                    pass: "knvvwvluttcrdxhk"
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            });
                            let info = await transporter.sendMail({

                                from: 'ankit.vayuz@gmail.com',
                                to: req.body.email,
                                subject: "Doctor Plaza ",
                                text: "Patient Credentials",
                                html: "<p>Here is Your Credentials :</p><b>Email:</b>" + req.body.email + "<br><b>Password : <b>" + password,
                            });

                        }
                        main().catch(console.error);
                        res.status(200).json({
                            "message": "Patient created successfully",
                            "success": true,
                            "data": user
                        });

                    }
                });

            }
        } else {
            if (!req.body.patientName || !req.body.email || !req.body.password) {
                return res.status(200).json({
                    "message": "please provide all information",
                    "success": false
                })
            };
            let patient = await PatientController.findOne({ email: req.body.email });

            if (patient) {
                return res.status(200).json({
                    "message": "User already exist",
                    "success": false
                })
            } else {
                patient = new PatientController({
                    patient_id: 'Patient'+Date.now(),
                    patient_name: req.body.patientName,
                    email: req.body.email,
                    password: req.body.password,
                    blood_group: req.body.blood_group,
                    gender: req.body.gender,
                    address: req.body.address,
                    age: req.body.age,
                    contact_number: req.body.contact_number,
                    is_active: false,
                    signup_details:true,
                    clinicId: req.body.clinicId
                });
                const salt = await bcrypt.genSalt(10);
                patient.password = await bcrypt.hash(patient.password, salt);
                await patient.save((errors, result) => {
                    if (errors) {
                        return res.status(400).send(errors);
                    } else {
                       return res.status(200).json({
                            "message": "patient created successfully",
                            "success": true,
                            "data": patient
                        });
                    }
                })
            }
        }

    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.patientDetails = async (req, res) => {
    const id = req.body.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    const data = {
        patient_name: req.body.patient_name,
        blood_group: req.body.blood_group,
        gender: req.body.gender,
        address: req.body.address,
        contact_number: req.body.phoneNo,
        age: req.body.age,
        signup_details: true,
    }
    return PatientController.updateOne(details, data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error);
    });
}

exports.signInPatient = async (req, res) => {
    try {
        // console.log('hhhhhh', req.body )
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            });
        }
        const user = await PatientController.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({
                "message": "Invalid email or password",
                "success": false
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(200).json({
                "message": "Invalid email or password",
                "success": false
            })
        }
         res.status(200).json({
            "message": "User login succesfully",
            "success": true,
            "data": user
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.getAll = (req, res, next) => {
    return PatientController.find()
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return PatientController.findOne(details)
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};
exports.create = (req, res, next) => {
    const data = new PatientController({
        patient_name: req.body.patient_name,
        email: req.body.email,
        password: newPassword,
        active: false,
        //   approvalStatus : res.body.doctorName,
        contact_number: req.body.contactNumber,       
    }, {
        timestamps: true,
        versionKey: false // You should be aware of the outcome after set to false
    });
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};
exports.updateById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.patient_name != null) {
        data['patient_name'] = req.body.patient_name;
    }
    if (req.body.email != null) {
        data['email'] = req.body.email;
    }
    if (req.body.password != null) {
        data['password'] = req.body.password;
    }
    if (req.body.active != null) {
        data['active'] = req.body.active;
    }
    if (req.body.contact_number != null) {
        data['contact_number'] = req.body.contact_number;
    }
    if (req.body.blood_group != null) {
        data['blood_group'] = req.body.blood_group;
    }
    if (req.body.gender != null) {
        data['gender'] = req.body.gender;
    }
    if (req.body.address != null) {
        data['address'] = req.body.address;
    }
    if (req.body.age != null) {
        data['age'] = req.body.age;
    }
    return PatientController.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.updatePassword = async (req, res, next) => {
    const id = req.params.id;
    const user = await PatientController.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (!user) {
        return res.status(200).json({
            "message": "Invalid user",
            "success": false
        });
    }
    const validPassword = await bcrypt.compare(req.body.old_password, user.password);
    if (!validPassword) {
        return res.status(200).json({
            "message": "Password Incorrect",
            "success": false
        })
    }
    let pass = req.body.new_password;
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass, salt);
    var data = {
        password : pass
    }
    PatientController.updateOne({ _id: mongoose.Types.ObjectId(id) }, data)
        .exec()
        .then((result) => {
            return res.status(200).json({
                "message": "Password Updated successfully",
                "success": true
            });
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to update password');
        });
};


exports.addFavClinic = (req, res, next) => {
    // const id = req.params.id;
    // const details = { 'clinicId': mongoose.Types.ObjectId(req.body.clinicId) };
    return PatientController.updateOne({'_id' : mongoose.Types.ObjectId(req.params.id)},
            {$push: {favClinics: mongoose.Types.ObjectId(req.body.clinicId)}})
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};


exports.deleteById = async (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    const user = await PatientController.findOne(details);
    if (!user) {
        return res.status(200).json({
            "message": "Invalid email or password",
            "success": false
        })
    }
    const validPassword = await bcrypt.compare(req.query.password, user.password);
    if (!validPassword) {
        return res.status(200).json({
            "message": "Invalid Password",
            "success": false,
        })
    }
    return PatientController.updateOne(details, { is_active : false })
    .exec()
    .then((result) => {
        console.log('deleted')
        Handler.deleteByIdHandler(res, result);
    })
    .catch((error) => {
        Handler.errorHandler(res, error, 'Failed to delete!');
    });
};

exports.getRegisteredPatient = async( req, res )=> {
    try {
        //  var start = new Date();
        // start.setHours(0, 0, 0, 0);

        // var end = new Date();
        // end.setHours(23, 59, 59, 999);
        
        const data = await PatientController.find().countDocuments();
        return res.status(200).json({
            "message": "get today patients",
            "success": true,
            "data": data
        })
    } catch(error) {
        res.status(500).send(error);
    }
}

exports.PatientSignUpCountLastWeek = async( req, res )=> {
    try {
        var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
            , day = beforeOneWeek.getDay()
            , diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
        var lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
        var lastSunday = new Date(beforeOneWeek.setDate(diffToMonday + 6));
        lastMonday = new Date(lastMonday.setHours(05, 30, 00));
        lastSunday = new Date(lastSunday.setHours(28,89,59));
        // console.log(lastMonday, lastSunday);
        const data = await PatientController.find({
            createdAt : {
                $gte: lastMonday,
                $lt: lastSunday
            } 
        }).countDocuments();
        return res.status(200).json({
            "message": "signup patient count for last week",
            "success": true,
            "data": data
        })
    } catch(error) {
        res.status(500).send(error);
    }
}

exports.PatientSignUpCountLastMonth = async( req, res )=> {
    try {
        var nowdate = new Date();
        var monthStartDay = new Date(nowdate.getFullYear(), nowdate.getMonth() - 1 , 1);
        var monthEndDay = new Date(nowdate.getFullYear(), nowdate.getMonth() , 0);
        monthStartDay = new Date(monthStartDay.setHours(05, 30, 00));
        monthEndDay = new Date(monthEndDay.setHours(28,89,59));
        const data = await PatientController.find({
            createdAt : {
                $gte: monthStartDay,
                $lt: monthEndDay
            } 
        }).countDocuments();
        return res.status(200).json({
            "message": "signup patient count for last month",
            "success": true,
            "data": data
        })
    } catch(error) {
        res.status(500).send(error);
    }
}

exports.PatientSignUpCountMonthly = async( req, res )=> {
    try {
        const FIRST_MONTH = 1
        const LAST_MONTH = 12
        const MONTHS_ARRAY = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

        let TODAY = new Date()
        let YEAR_BEFORE = new Date((new Date("2020-01-01T00:00:00")).setHours(05, 30, 00))
        
    PatientController.aggregate( [
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
                "message": "signup patient count for monthly",
                "success": true,
                "data": data
            })
        })
        .catch(error => {
            console.log(error)
        })
    } catch(error) {
        res.send(error);
        res.status(500).json();
    }
}

// exports.getRegisteredPatient = async( req, res )=> {
//     try {
//          var start = req.body.startDate;
//         start.setHours(0, 0, 0, 0);

//         var end = req.body.endDate;
//         end.setHours(23, 59, 59, 999);
        
//         const data = await PatientController.find({ createdAt: {$gte: start, $lt: end }}).countDocuments();
//         return res.status(200).json({
//             "message": "get today patients",
//             "success": true,
//             "data": data
//         })
//     } catch(error) {
//         res.send(error);
//         res.status(500).json({ statusCode: 500 });
//     }
// }

