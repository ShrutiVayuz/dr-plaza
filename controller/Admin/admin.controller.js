

const AdminModel = require('../../models/Admin/admin.model');
var mongoose = require('mongoose');

const Handler = require('../../Handlers/app.handler');
const Payments = require('../../Handlers/payments.handler');

exports.getAll = (req, res, next)=>{
    return AdminModel.find()
    .exec()
    .then((data) => { 
        Handler.getAllHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};


exports.updateById = (req, res, next)=>{
    const id = req.params.id;
    const details = {'_id': mongoose.Types.ObjectId(id)};
    const textPassword = req.body.password;
    var data = {};
    if (req.body.fullName != null) {
        data['fullName'] = req.body.fullName;
    }
    if (req.body.email != null) {
        data['email'] = req.body.email;
    }
    if (req.body.password != null) {
        data['password'] = textPassword;
    }
    
    AdminModel.updateOne(details,data)
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, data, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update location');
    });
}
