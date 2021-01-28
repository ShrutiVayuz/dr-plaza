var mongoose = require('mongoose');

const Handler = require('../../Handlers/app.handler');
const Payments = require('../../Handlers/payments.handler');
const PaymentsModel = require('../../models/Admin/payment.model');


exports.getAll = (req, res, next)=>{
    return Payments.find()
    .exec()
    .then((data) => { 
        Handler.getAllHandler(res, data);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to get location');
    });
};


exports.updateRefundStatus = (req, res, next)=>{
    console.log('updaing', req.body)
    PaymentsModel.updateOne({payment_id : req.body.payment_id},{payment_status : req.body.status})
    .exec()
    .then((result) => {
        Handler.updateByIdHandler(res, req.body, result);
    })
    .catch((error) => {
        Handler.errorHandler(res,error,'Failed to update Payment status');
    });
}

exports.savePayment = async (req, res) => {
    try {
        let payment = new PaymentsModel({
            order_id : req.body.order_id,
            payment_id : req.body.payment_id,
            amount : req.body.amount,
            payment_status : req.body.payment_status,
            user_id : req.body.user_id,
            doctor_id : req.body.doctor_id,
            // appointment_id : req.body.appointment_id
        });
        await payment.save( async (errs, resp) => {
            if(errs){
                return res.status(200).send(errs);
            } else {
                return res.status(200).json({
                    "message": "Payment Successful",
                    "success": true,
                    "data": resp
                })
            }
        })
    } catch(err) {
        res.send(err);
        res.status(500).json();
    }
};

exports.initiatePayment = async (req, res, next)=>{
    try {
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: '12345678',
    }
    Payments.createOrder(res, options);
    } catch (error) {
        console.log(error);
        Payments.errorHandler(res, error, 'Unabale to create order')
    }
}

exports.verify = async (req, res, next)=>{
    try {
        Payments.verifySignature(req, res);
    } catch (error) {
        console.log(error);
        Payments.errorHandler(res, error, 'Unabale to verify order')
    }
}

exports.initiateRefund = async (req, res, next)=>{
    try {
        console.log('initiating')
        console.log(req.body.payment_id);
        PaymentsModel.findOne({_id : req.body.payment_id})
        .then(resp => {
            Payments.initiateRefund(req, res, resp);
        })
    } catch (error) {
        console.log(error);
        Payments.errorHandler(res, error, 'Unabale to verify order')
    }
}