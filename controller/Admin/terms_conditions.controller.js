const mongoose = require('mongoose');
const TermsAndConditionModel = require('../../models/Admin/terms_conditions.model');

exports.create = async (req, res) => {
    try {
        let term = new TermsAndConditionModel({
            term_id: "Terms&Condition"+ Date.now(),
            title: 'Terms and Conditions',
            short_description: 'short description about terms and conditions',
            description: 'description about terms and conditos',
            meta_data: 'terms and conditions meta data',
            is_active: true,
        });

        await term.save( async (errs, resp) => {
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
        const term = await TermsAndConditionModel.find();
        return res.status(200).json({
            "message": "get terms and conditions",
            "success": true,
            "data": term
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
         const review = await TermsAndConditionModel.findOneAndUpdate({_id: req.params.id}, update, 
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
         const review = await TermsAndConditionModel.findOneAndUpdate({_id: req.params.id}, update, 
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