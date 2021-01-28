const mongoose = require('mongoose');
const CookieModel = require('../../models/Admin/cookie_policy.model');

exports.create = async (req, res) => {
    try {
        let cookie = new CookieModel({
            cookie_id: "Cookie"+ Date.now(),
            cms_type :'' ,
            title: 'Cookie',
            short_description: 'short description about cookie policy',
            description: ' cookie policy description',
            meta_data: ' cookie policy metadata',
            is_active: true,
        });

        await cookie.save( async (errs, resp) => {
            if(errs){
                return res.status(200).send(errs);
            } else {
                return res.status(200).json({
                    "message": "cookie created",
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
        const cookie = await CookieModel.find();
        return res.status(200).json({
            "message": "get cookie policy",
            "success": true,
            "data": cookie
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
         const review = await CookieModel.findOneAndUpdate({_id: req.params.id}, update, 
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
         const review = await CookieModel.findOneAndUpdate({_id: req.params.id}, update, 
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