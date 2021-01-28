var mongoose = require('mongoose');
const DoctorController = require('../../models/Admin/doctor.model');
const PatientController = require('../../models/Admin/patient.model');
const Handler = require('../../Handlers/app.handler');
const Appointment = require('../../models/Admin/appointment.model');

const PasswordGenerator = require('../../Handlers/password.handler');
const newPassword = PasswordGenerator.generatePassword();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
exports.addDoctor = async (req, res) => {
    try {
        if (req.body.is_admin) {
            if (!req.body.doctorName || !req.body.email) {
                return res.status(200).json({
                    "message": "please provide all information",
                    "success": false
                })
            };
            let randomstring = Math.random().toString(36).slice(-3);
            let date = Date.now().toString().slice(-3);
            let password = "V^z!" + randomstring + date;
            let user = await DoctorController.findOne({ email: req.body.email });

            if (user) {
                return res.status(200).json({
                    "message": "User already exist",
                    "success": false
                })
            } else {
                user = new DoctorController({
                    doctor_id: 'Doctor' + Date.now(),
                    doctorName: req.body.doctorName,
                    email: req.body.email,
                    password: password,
                    contactNumber: req.body.contactNumber,
                    specialization : req.body.departmentName,
                    is_active: true,
                    is_approved: false
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
                                text: "Doctor Credentials",
                                html: "<p>Here is Your Credentials :</p><b>Email:</b>" + req.body.email + "<br><b>Password : <b>" + password,
                            });

                        }
                        main().catch(console.error);
                        res.status(200).json({
                            "message": "Doctor created successfully",
                            "success": true,
                            "data": user
                        });

                    }
                });

            }
        } else {
            if (!req.body.doctorName || !req.body.email || !req.body.password) {
                return res.status(200).json({
                    "message": "please provide all information",
                    "success": false
                })
            };
            let doctor = await DoctorController.findOne({ email: req.body.email });

            if (doctor) {
                return res.status(200).json({
                    "message": "User already exist",
                    "success": false
                })
            } else {
                doctor = new DoctorController({
                    doctor_id: 'Doctor' + Date.now(),
                    doctorName: req.body.doctorName,
                    email: req.body.email,
                    password: req.body.password,
                    specialization: req.body.departmentName,
                    state: req.body.state,
                    city: req.body.city,
                    pincode: req.body.pincode,
                    address: req.body.address,
                    contactNumber: req.body.phoneNo,
                    is_active: true,
                    is_approved: false
                });
                const salt = await bcrypt.genSalt(10);
                doctor.password = await bcrypt.hash(doctor.password, salt);
                await doctor.save((errors, result) => {
                    if (errors) {
                        return res.status(400).send(errors);
                    } else {
                        return res.status(200).json({
                            "message": "Doctor created successfully",
                            "success": true,
                            "data": doctor
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

exports.signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            });
        }
        const user = await DoctorController.findOne({ email: req.body.email, is_approved: true, is_active: true });
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

exports.doctorDetails = async (req, res) => {
    try {
        const update = {
            specialization: req.body.departmentName,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            address: req.body.address,
            contactNumber: req.body.phoneNo
        }
        const doctor_detail = await DoctorController.findOneAndUpdate({ doctor_id: req.body.id }, update, {
            new: true
        }, async (error, result) => {
            if (error) {
                return res.status(400).send(errors);
            } else {

            }

        });
        return res.status(200).json({
            "message": "Doctor details added successfully",
            "success": true,
            "data": doctor_detail
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.doctorPersonalDetails = async (req, res) => {
    try {
        const update = {

            specialization: req.body.departmentName,
            doctorName: req.body.doctorName,
            email: req.body.email,
            profileImage: req.body.profileImage,
            contactNumber: req.body.contactNumber,
            signaturelImage: req.body.signaturelImage
        }
        const doctor_detail = await DoctorController.findOneAndUpdate({ _id: req.body.id }, update, {
            new: true
        }, async (error, result) => {
            if (error) {
                return res.status(400).send(errors);
            } else {

            }

        });
        return res.status(200).json({
            "message": "Doctor details added successfully",
            "success": true,
            "data": doctor_detail
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.getAll = (req, res, next) => {
    return DoctorController.find().sort({ createdAt: -1 })
        .select('-password')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};


exports.getDoctorApproval = async (req, res) => {
    try {
        if (req.body.not_approved) {
            const update = {
                not_approved: true,
                is_approved: false
            }

            const doctor_detail = await DoctorController.findOneAndUpdate({ _id: req.body.id }, update, {
                new: true
            }, async (error, result) => {
                if (error) {
                    return res.status(400).send(error);
                } else {

                }

            });
            return res.status(200).json({
                "message": "Doctor details added successfully",
                "success": true,
                "data": doctor_detail
            });
        } else {
            const update = {
                is_approved: true,
            }
            const doctor = await DoctorController.findOne({ _id: req.body.id });
            const doctor_detail = await DoctorController.findOneAndUpdate({ _id: req.body.id }, update, {
                new: true
            }, async (error, result) => {
                if (error) {
                    return res.status(400).send(errors);
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
                            to: doctor.email,
                            subject: "Doctor Plaza ",
                            text: "You are Approved ",
                            html: "<p>Hi Doctor your request is approved :</p>",
                        });

                    }
                    main().catch(console.error);

                }

            });
            return res.status(200).json({
                "message": "Doctor details added successfully",
                "success": true,
                "data": doctor_detail
            });
        }
        // const doctor = DoctorController.find({ doctor_id: req.body.doctor_id })
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}
// {path: 'questionId',populate:{path: 'optionId',match:{is_active: true}}}
exports.doctorsOfState = (req, res, next) => {
    const id = req.params.id;
    const details = { 'state' : req.params.state };
    return DoctorController.find(details).populate({ path: 'roomId', populate: { path: 'clinicData' } })
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.doctorsOfCity = (req, res, next) => {
    const id = req.params.id;
    const details = { 'city' : req.params.city };
    return DoctorController.find(details).populate({ path: 'roomId', populate: { path: 'clinicData' } })
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.doctorsOfSpec = (req, res, next) => {
    const id = req.params.id;
    const details = { 'specialization' : req.params.spec };
    return DoctorController.find(details).populate({ path: 'roomId', populate: { path: 'clinicData' } })
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};


exports.getById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return DoctorController.findOne(details).populate({ path: 'roomId', populate: { path: 'clinicData' } })
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.create = (req, res, next) => {
    const data = new DoctorController({
        doctorName: req.body.doctorName,
        email: req.body.email,
        password: newPassword,
        active: true,
        //   approvalStatus : res.body.doctorName,
        contactNumber: req.body.contactNumber,
        locationData: req.body.locationData,
        clinicData: req.body.clinicData,
        specializationData: req.body.specializationData,
        roomData: req.body.roomData,
        daysOfWorking: req.body.daysOfWorking,
        hoursPerDay: req.body.hoursPerDay,
        hoursPerPatient: req.body.hoursPerPatient,
        consultancyFee: req.body.consultancyFee,
        paidAccount: req.body.paidAccount,
        amountPaid: req.body.amountPaid,
        amountPaidOn: req.body.amountPaidOn,
        signature: req.body.signature,
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
    if (req.body.doctorName != null) {
        data['doctorName'] = req.body.doctorName;
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
    if (req.body.contactNumber != null) {
        data['contactNumber'] = req.body.contactNumber;
    }
    if (req.body.locationData != null) {
        data['locationData'] = req.body.locationData;
    }
    if (req.body.clinicData != null) {
        data['clinicData'] = req.body.clinicData;
    }
    if (req.body.roomData != null) {
        data['roomData'] = req.body.roomData;
    }
    if (req.body.daysOfWorking != null) {
        data['daysOfWorking'] = req.body.daysOfWorking;
    }
    if (req.body.hoursPerDay != null) {
        data['hoursPerDay'] = req.body.hoursPerDay;
    }
    if (req.body.hoursPerPatient != null) {
        data['hoursPerPatient'] = req.body.hoursPerPatient;
    }
    if (req.body.consultancyFee != null) {
        data['consultancyFee'] = req.body.consultancyFee;
    }
    if (req.body.paidAccount != null) {
        data['paidAccount'] = req.body.paidAccount;
    }
    if (req.body.amountPaid != null) {
        data['amountPaid'] = req.body.amountPaid;
    }
    if (req.body.amountPaidOn != null) {
        data['amountPaidOn'] = req.body.amountPaidOn;
    }
    if (req.body.signature != null) {
        data['signature'] = req.body.signature;
    }
    if (req.body.address != null) {
        data['address'] = req.body.address;
    }
    if (req.body.departmentName != null) {
        data['specialization'] = req.body.departmentName;
    }

    return DoctorController.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.deptNames = (req, res, next) => {
    return DoctorController.distinct('specialization', { "specialization": { $nin: ["", null] } })
        .then(function (depts) {
            res.status(200).send(depts);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get dept names');
        });
}

exports.distinctStates = (req, res, next) => {
    return DoctorController.distinct('state', { "state": { $nin: ["", null] } })
        .then(function (states) {
            res.status(200).send(states);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get dept names');
        });
}

exports.distinctCities = (req, res, next) => {
    return DoctorController.distinct('city', { "city": { $nin: ["", null] } })
        .then(function (cities) {
            res.status(200).send(cities);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get dept names');
        });
}

exports.deleteById = (req, res, next) => {
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return DoctorController.deleteOne(details)
        .exec()
        .then((result) => {
            Handler.deleteByIdHandler(res, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.getUserDetail = async (req, res) => {
    try {
        if (req.body.user == 'doctor') {
            const user = await DoctorController.findOne({ email: req.body.email });
            return res.status(200).json({
                "message": "Doctor details ",
                "success": true,
                "data": user
            });
        }
        return res.status(200).json({
            "message": "Admin",
            "success": true,
        })
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.forgotPasswordOtpLink = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.name == "doctor") {
            const user = await DoctorController.findOne({ email: req.body.email, is_approved: true });
            if (!user) {
                return res.status(200).json({
                    "message": "Invalid email Id",
                    "success": false
                })
            }
            else {
                const random = Math.random().toString().slice(-4);
                const update = {
                    otp: random
                }
                const doctor_otp = await DoctorController.findOneAndUpdate({ doctor_id: user.doctor_id }, update, {
                    new: true
                }, async (error, result) => {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    else {
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
                    "data": doctor_otp
                });

            }
        }
        else {
            console.log(req.body);
            const user = await PatientController.findOne({ email: req.body.email });
            if (!user) {
                return res.status(200).json({
                    "message": "Invalid email Id",
                    "success": false
                })
            }
            else {
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

            }
        }
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.otpMatch = async (req, res) => {
    try {
        if (req.body.name == "doctor") {
            const user = await DoctorController.findOne({ otp: req.body.otp, doctor_id: req.body.id });
            if (!user) {
                return res.status(200).json({
                    "message": "Invalid otp",
                    "success": false
                })
            }

            res.status(200).json({
                "message": "otp succesfully",
                "success": true,
                "data": user
            });
        }
        else {
            const user = await PatientController.findOneAndUpdate({ otp: req.body.otp, patient_id: req.body.id }, { is_active: true });
            if (!user) {
                return res.status(200).json({
                    "message": "Invalid otp",
                    "success": false
                })
            }

            res.status(200).json({
                "message": "otp succesfully",
                "success": true,
                "data": user
            });
        }
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        if (req.body.name == "doctor") {
            let pass = req.body.user_password;
            const salt = await bcrypt.genSalt(10);
            pass = await bcrypt.hash(pass, salt);
            const user = await DoctorController.findOneAndUpdate({ doctor_id: req.body.id }, {
                $set: { password: pass }
            }, async (err, result) => {
                if (err) {
                    res.status(400).json({
                        "message": "something went wrong",
                        "success": false
                    })
                } else {
                    res.status(200).json({
                        "message": "User updated successfully",
                        "success": true,

                    })
                }
            })
        }
        else {
            let pass = req.body.user_password;
            const salt = await bcrypt.genSalt(10);
            pass = await bcrypt.hash(pass, salt);
            const user = await PatientController.findOneAndUpdate({ patient_id: req.body.id }, {
                $set: { password: pass }
            }, async (err, result) => {
                if (err) {
                    res.status(400).json({
                        "message": "something went wrong",
                        "success": false
                    })
                } else {
                    res.status(200).json({
                        "message": "User updated successfully",
                        "success": true,

                    })
                }
            });
        }

    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 })
    }
}

const limit_ = 5;
exports.getDoctorsForUser = async (req, res, next) => {
    let aggregate_options = [];

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || limit_;

    const options = {
        page, limit,
        collation: { locale: 'en' },
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'doctors'
        }
    };
    let match = {};
    if (req.query.q) match.doctorName = { $regex: req.query.q, $options: 'i' };
    aggregate_options.push({ $match: match });
    const myAggregate = DoctorController.aggregate(aggregate_options);
    const result = await DoctorController.aggregatePaginate(myAggregate, options);
    // return res.status(200).json(result);
    return DoctorController.find()
        .select('-password')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.doctorsByDept = (req, res, next)=>{
    const details = { 'specialization': req.body.dept };
    if(req.body.city){
        details['city'] = req.body.city
    }
    return DoctorController.find(details)
        .select('-password')
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.cityNames = (req, res, next) => {
    return DoctorController
        .distinct('city', { "city": { $nin: ["", null] } })
        .then(function (data) {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get city names');
        });
}

exports.changePassword = async (req, res) => {
    try {
        const user = await DoctorController.findOne({ _id: req.params.id });

        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!validPassword) {
            return res.status(200).json({
                "message": "Invalid  password",
                "success": false
            })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            let userPassword = await bcrypt.hash(req.body.confirmPassword, salt);

            const update = {
                password: userPassword
            }

            const doctorDetail = await DoctorController.findOneAndUpdate({ _id: user._id }, update, {
                new: true
            }, async (error, result) => {
                if (error) {
                    return res.status(400).send(error);
                } else {
                    return res.status(200).json({
                        "message": "Updated password!",
                        "success": true,
                        "data": result
                    });
                }
            });

        }
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const user = await DoctorController.findOne({ '_id': mongoose.Types.ObjectId(req.params.id) });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(200).json({
                "message": "Invalid  password",
                "success": false
            })
        }
        else {
            const update = {
                delete_description: req.body.description,
                is_active: false,
            }
            const doctorDetail = await DoctorController.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(user._id) }, update, {
                new: true
            }, async (error, result) => {
                if (error) {
                    return res.status(400).send(error);
                } else {
                    return res.status(200).json({
                        "message": "Deleted account!",
                        "success": true,
                        "data": result
                    });
                }
            });

        }
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getRegisteredDoctor = async( req, res )=> {
    try {
        //  var start = new Date();
        // start.setHours(0, 0, 0, 0);

        // var end = new Date();
        // end.setHours(23, 59, 59, 999);
        
        const data = await DoctorController.find().countDocuments();
        return res.status(200).json({
            "message": "get today doctors",
            "success": true,
            "data": data
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.doctorDayOff = async (req, res) => {
    try {
        var start = new Date();
        start.setHours(0, 0, 0, 0);

        var end = new Date();
        end.setHours(23, 59, 59, 999);
        let details = await Appointment.find({ doctor_id: req.body.id, date: { $gte: start, $lt: end } });
        for (let i = 0; i < details.length; i++) {
            console.log(details[i].user_id)

            let patientEmail = await PatientController.findOne({ _id: details[i].user_id });
            console.log(patientEmail.email)
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
                    to: patientEmail.email,
                    subject: "Doctor Plaza ",
                    text: "Your today appointment Cancelled ",
                    html: "<p>Sorry for inconveinent</p>",
                });

            }
            main().catch(console.error);
        }
        return res.status(200).json({
            "message": " mail send",
            "success": true
        })
        // console.log(details);
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

// exports.getRegisteredDoctor = async (req, res) => {
//     try {
//         var start = req.body.startDate;
//         start.setHours(0, 0, 0, 0);
//         var end = req.body.endDate;
//         end.setHours(23, 59, 59, 999);

//         const data = await DoctorController.find({ createdAt: { $gte: start, $lt: end } }).countDocuments();
//         return res.status(200).json({
//             "message": "get today doctors",
//             "success": true,
//             "data": data
//         })
//     } catch (error) {
//         res.send(error);
//         res.status(500).json({ statusCode: 500 });
//     }
// }


