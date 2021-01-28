var mongoose = require('mongoose');
const Handler = require('../../Handlers/app.handler');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Staff = require('../../models/Admin/staff.model');
const Roles = require('../../models/Admin/sub_admin_roles.model');


exports.getAll = (req, res, next)=>{
    return Staff.find().sort({ createdAt: -1})
    .exec()
    .then((data) => { 
        Handler.getAllHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};

exports.getRoles = (req, res, next)=>{
    return Roles.find({'is_active' : true})
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
    const details = {'_id': mongoose.Types.ObjectId(id) };
    return Staff.findOne(details)
    .exec()
    .then((data) => {
        Handler.getByIdHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};



exports.create = async (req, res) => {
    try {
        console.log(req.body)
        if( !req.body.userName || !req.body.email ) {
            return res.status(200).json({
                "message": "please provide all information",
                "success": false
            })
        };
        let user = await Staff.findOne({ email: req.body.email });
        if(user) {
            return res.status(200).json({
                "message": "User already exist",
                "success": false
            })
        }
        let date = Date.now().toString().slice(-5);
        let staffID = req.body.userName.slice(0,3).toUpperCase();
        user = await new Staff({
            staff_id: staffID+date,
            user_name : req.body.userName,
            email : req.body.email,
            password : req.body.password,
            is_active : true,
            roles : req.body.roles,
            employee_id : req.body.employeeId
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash( user.password, salt );
        await user.save( (errors, result) =>{
            if (errors) {
                return res.status(400).send(errors)
            }
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
                    text: "Staff Credentials",
                    html: "<p>Here is Your Credentials :</p><b>Email:</b>" + req.body.email + "<br><b>Password : <b>" + req.body.password,
                });
            }
            main().catch(console.error);
            res.status(200).json({
                "message": "Staff created successfully",
                "success": true,
                "data": user
            });
        });
    } catch(err){
        res.send(err);
        res.status(500);
    }
};

exports.updateById = async (req, res, next)=>{
    const id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    var data = {};
    if (req.body.userName != null) {
        data['user_name'] = req.body.userName;
    }
    if (req.body.employeeId != null) {
        data['employee_id'] = req.body.employeeId;
    }
    if (req.body.email != null) {
        data['email'] = req.body.email;
    }
    if (req.body.is_active != null) {
        data['is_active'] = req.body.is_active;
    }
    if (req.body.password != null) {
        const user = await Staff.findOne({ _id: mongoose.Types.ObjectId(id) });
        if (!user) {
            return res.status(200).json({
                "message": "Invalid user",
                "success": false
            });
        }
        // const validPassword = await bcrypt.compare(req.body.old_password, user.password);
        // if (!validPassword) {
        //     return res.status(200).json({
        //         "message": "Password Incorrect",
        //         "success": false
        //     })
        // }
        let pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        pass = await bcrypt.hash(pass, salt);
        data['password'] = req.body.password;
    }

    return Staff.updateOne(details,data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update location');
    });
};

exports.updatePassword = async (req, res, next) => {
    const id = req.params.id;
    const user = await Staff.findOne({ '_id': mongoose.Types.ObjectId(id) });
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
    Staff.updateOne({ _id: mongoose.Types.ObjectId(id) }, data)
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

exports.deleteById = (req, res, next)=>{
    const id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id) };
    return Staff.deleteOne(details)
    .exec()
    .then((result) => {
        Handler.deleteByIdHandler(res, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to delete location');
    });
};