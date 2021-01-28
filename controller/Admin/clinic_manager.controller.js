const ClinicMangerModel = require('../../models/Admin/clinic_manager.model');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Handler = require('../../Handlers/app.handler');
const nodemailer = require('nodemailer');

exports.addClinicManager = async (req, res) => {
    try {
        console.log(req.body)
        if( !req.body.receptionistName || !req.body.email ) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            })
        };
        let randomstring = Math.random().toString(36).slice(-3);
        let date = Date.now().toString().slice(-3);
        let password = "V^z!"+randomstring+date;
        console.log(password);
        let user = await ClinicMangerModel.findOne({ email: req.body.email });

        if(user) {
            return res.status(200).json({
                "message": "User already exist",
                "success": false
            })
        } else {
            user = new ClinicMangerModel({
                clinic_manager_name: req.body.receptionistName,
                email: req.body.email,
                password: password,
                clinicId : req.body.clinicId,
                is_active: true
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash( user.password, salt );
            await user.save( (errors, result) =>{
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
                            text: "Clinic Manager Credentials",
                            html: "<p>Here is Your Credentials :</p><b>Email:</b>" + req.body.email + "<br><b>Password : <b>" + password,
                        });

                    }
                    main().catch(console.error);
                    res.status(200).json({
                        "message": "Clinic Manager created successfully",
                        "success": true,
                        "data": user
                    });

                }
            });
            
        }
        
    } catch(err){
        res.send(err);
        res.status(500).json({ statusCode: 500});
    }
};

exports.signIn = async (req, res) => {
    try {
        console.log('hhhhhh', req.body )
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            });
        }
        const user = await ClinicMangerModel.findOne({ email: req.body.email });
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
            data : user
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.getAll = (req, res, next) => {
    return ClinicMangerModel.find()
        .populate('clinicId')
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
    return ClinicMangerModel.findOne(details)
        .populate('clinicId')
        .select('-password')
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get clinic');
        });
};
exports.create = (req, res, next) => {
    const data = new ClinicModel({
        clinicName: req.body.clinicName,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        location: req.body.location,
        comment: req.body.comment,
        status: true
    });
    return data.save()
        .then((result) => {
            Handler.createHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to create clinic');
        });
};
exports.updateById = (req, res, next)=>{
    console.log(req.body)
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.receptionistName != null) {
        data['clinic_manager_name'] = req.body.receptionistName;
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
        data['is_active'] = req.body.status;
    }
    if (req.body.clinicId != null) {
        data['clinicId'] = req.body.clinicId;
    }
    return ClinicMangerModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res,error);
        });
};

exports.deleteById = async (req, res, next) => {
    console.log(req.params)
    console.log(req.query)
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    const user = await ClinicMangerModel.findOne(details);
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
    return ClinicMangerModel.updateOne(details, { is_active : false })
    .exec()
    .then((result) => {
        console.log('deleted')
        Handler.deleteByIdHandler(res, result);
    })
    .catch((error) => {
        Handler.errorHandler(res, error, 'Failed to delete!');
    });
};


exports.getByStatus = (req, res, next) => {
    console.log('hitzzzzz')
    const id =  req.body.status;
    const details = { 'status': id };
    
    return ClinicMangerModel.find(details)
        .exec()
        .then((data) => {
            Handler.getByStatusHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get clinic');
        });
};

exports.updateDetails = (req, res, next) => {
    const details = { '_id': mongoose.Types.ObjectId(req.params.id) };
    var data = {};
    if (req.body.clinic_manager_name != null) {
        data['clinic_manager_name'] = req.body.clinic_manager_name;
    }
    return ClinicMangerModel.updateOne(details, data)
        .exec()
        .then((result) => {
            Handler.updateByIdHandler(res, data, result);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to update clinic');
        });
};



exports.ContactUs = async (req, res) => {
    try {
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
                to: 'vamshi.vayuz@gmail.com',
                subject: "Doctor Plaza : " + req.body.subject,
                text: "Clinic Manager Contact Us - Message: " + req.body.message + " From : " + req.body.name,
                html: ""
            });
        }
        main().catch(console.error);
        console.log('sending mail...')
        res.status(200).json({
            "message": "Message Sent successfully",
            "success": true
        });
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.updatePassword = async (req, res, next) => {
    const id = req.params.id;
    const user = await ClinicMangerModel.findOne({ _id: mongoose.Types.ObjectId(id) });
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
    ClinicMangerModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, data)
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