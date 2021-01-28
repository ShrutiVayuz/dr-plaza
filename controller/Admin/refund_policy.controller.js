const mongoose = require('mongoose');
const RefundModel = require('../../models/Admin/refund_policy.model');

exports.create = async (req, res) => {
    try {
        let refund = new RefundModel({
            refund_id:"Refund"+ Date.now(),
            title: 'Refund Policy',
            short_description: 'short description about refund policy',
            description: ' description about refund policy',
            meta_data: ' refund policy meta data',
            is_active: true,
        });

        await refund.save( async (errs, resp) => {
            if(errs){
                return res.status(200).send(errs);
            } else {
                return res.status(200).json({
                    "message": "term and condition created",
                    "success": true,
                    "data": resp
                })
            }
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500});
    }
};

exports.get = async (req, res) => {
    try {
        const refund = await RefundModel.find();
        return res.status(200).json({
            "message": "get terms and conditions",
            "success": true,
            "data": refund
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({statusCode: 500});
    }
};

exports.edit = async ( req, res ) => {
    try {
        const update = { 
            title: req.body.title,
            short_description: req.body.short_description,
            description: req.body.description,
            meta_data: req.body.meta_data,
        };
         const review = await RefundModel.findOneAndUpdate({_id: req.params.id}, update, 
            async(error, result) => {
                if(error){
                    return res.status(400).send(error);
                }else {
                    return res.status(200).json({
                        "message": "updated successfully",
                        "success": true,
                        "data": result
                    });
                }
            })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.editActive = async ( req, res ) => {
    try {
        const update = { is_active: req.body.active };
         const review = await RefundModel.findOneAndUpdate({_id: req.params.id}, update, 
            async(error, result) => {
                if(error){
                    return res.status(400).send(error);
                }else {
                    return res.status(200).json({
                        "message": "updated successfully",
                        "success": true,
                        "data": result
                    });
                }
            })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}