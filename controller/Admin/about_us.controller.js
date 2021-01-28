const mongoose = require('mongoose');
const AboutModel = require('../../models/Admin/about_us.model');

exports.create = async (req, res) => {
    try {
        if (req.body.cmsType == 'about'){
            let about = new AboutModel({
                cms_id: "CMS"+ Date.now(),
                cms_type: 'about',
                title: 'About Us',
                short_description: 'short description about aboutUs page',
                description: 'description about aboutUs page',
                meta_data: 'aboutUs metadata',
                is_active: true,
            });
    
            await about.save( async (errs, resp) => {
                if(errs){
                    return res.status(200).send(errs);
                } else {
                    return res.status(200).json({
                        "message": "page created",
                        "success": true,
                        "data": resp
                    })
                }
            })
        }

        if (req.body.cmsType == 'cookie'){
            let about = new AboutModel({
                cms_id: "CMS"+ Date.now(),
                cms_type: 'cookie',
                title: 'Cookie Policy',
                short_description: 'short description about aboutUs page',
                description: 'description about aboutUs page',
                meta_data: 'aboutUs metadata',
                is_active: true,
            });
    
            await about.save( async (errs, resp) => {
                if(errs){
                    return res.status(200).send(errs);
                } else {
                    return res.status(200).json({
                        "message": "page created",
                        "success": true,
                        "data": resp
                    })
                }
            })
        }

        if (req.body.cmsType == 'privacy'){
            let about = new AboutModel({
                cms_id: "CMS"+ Date.now(),
                cms_type: 'privacy',
                title: 'Privacy Policy',
                short_description: 'short description about aboutUs page',
                description: 'description about aboutUs page',
                meta_data: 'aboutUs metadata',
                is_active: true,
            });
    
            await about.save( async (errs, resp) => {
                if(errs){
                    return res.status(200).send(errs);
                } else {
                    return res.status(200).json({
                        "message": "page created",
                        "success": true,
                        "data": resp
                    })
                }
            })
        }

        if (req.body.cmsType == 'refund'){
            let about = new AboutModel({
                cms_id: "CMS"+ Date.now(),
                cms_type: 'refund',
                title: 'Refund Policy',
                short_description: 'short description about aboutUs page',
                description: 'description about aboutUs page',
                meta_data: 'aboutUs metadata',
                is_active: true,
            });
    
            await about.save( async (errs, resp) => {
                if(errs){
                    return res.status(200).send(errs);
                } else {
                    return res.status(200).json({
                        "message": "page created",
                        "success": true,
                        "data": resp
                    })
                }
            })
        }

        if (req.body.cmsType == 'terms'){
            let about = new AboutModel({
                cms_id: "CMS"+ Date.now(),
                cms_type: 'terms',
                title: 'Terms and Conditions',
                short_description: 'short description about aboutUs page',
                description: 'description about aboutUs page',
                meta_data: 'aboutUs metadata',
                is_active: true,
            });
    
            await about.save( async (errs, resp) => {
                if(errs){
                    return res.status(200).send(errs);
                } else {
                    return res.status(200).json({
                        "message": "page created",
                        "success": true,
                        "data": resp
                    })
                }
            })
        }
        
       
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500});
    }
};

exports.get = async (req, res) => {
    try {
        const about = await AboutModel.find();
        return res.status(200).json({
            "message": "get about us",
            "success": true,
            "data": about
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({statusCode: 500});
    }
};

exports.getView = async (req, res) => {
    try {
        const about = await AboutModel.find({ _id: req.params.id });
        return res.status(200).json({
            "message": "get about us",
            "success": true,
            "data": about
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({statusCode: 500});
    }
};

exports.edit = async ( req, res ) => {
    try {
        const update = { 
            title: req.body.cmsTitle,
            short_description: req.body.shortDescription,
            description: req.body.description,
            meta_data: req.body.metaData,
        };
         const review = await AboutModel.findOneAndUpdate({_id: req.params.id}, update, 
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
         const review = await AboutModel.findOneAndUpdate({_id: req.params.id}, update, 
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