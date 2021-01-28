const mongoose = require('mongoose');
const PrivacyModel = require('../../models/Admin/privacy_policy.model');

exports.create = async (req, res) => {
    try {
        let privacy = new PrivacyModel({
            privacy_id : "Privacy"+ Date.now(),
            title: 'Privacy Policy',
            short_description: 'short description about privacy policy',
            description: 'description about privacy policy',
            meta_data: ' privacy policy meta data',
            is_active: true,
        });

        await privacy.save( async (errs, resp) => {
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
        const privacy = await PrivacyModel.find();
        return res.status(200).json({
            "message": "get privacy policy",
            "success": true,
            "data": privacy
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
         const review = await PrivacyModel.findOneAndUpdate({_id: req.params.id}, update, 
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
         const review = await PrivacyModel.findOneAndUpdate({_id: req.params.id}, update, 
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