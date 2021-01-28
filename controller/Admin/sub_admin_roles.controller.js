var mongoose = require('mongoose');
const SubAdminRole = require('../../models/Admin/sub_admin_roles.model');

exports.createRole = async (req, res) => {
    try{
        const role = await SubAdminRole.findOne({ role_name: req.body.name });

        if(role) {
            return res.status(200).json({
                "message": "Role already exist",
                "success": false
            })
        } 
        else {
            const addRole = new SubAdminRole({
                role_id: 'Role'+ Date.now(),
                role_name: req.body.name,
                is_active: true
            });
            
            await addRole.save(async (errs, ress) =>{
                if(errs){
                return res.status(200).send(errs)
                }
                else{
                    return res.status(200).json({
                        "message": "Role added!",
                        "success": true,
                        'data': ress
                    })
                }
            })
        }
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.viewAllRole = async (req, res) => {
    try{
        let role = await SubAdminRole.find();
        return res.status(200).json({
            "message": "get all role",
            "success": true,
            'data': role
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.viewRoleById = async (req, res) => {
    try{
        let role = await SubAdminRole.findOne({ _id: req.body.id});
        return res.status(200).json({
            "message": "get role",
            "success": true,
            'data': role
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.editActiveRole = async ( req, res ) => {
    try {
        const update = { is_active: req.body.active };
         const review = await SubAdminRole.findOneAndUpdate({_id: req.body.id}, update, 
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

exports.editRole = async ( req, res ) => {
    try {
        const update = { role_name: req.body.name };
         const review = await SubAdminRole.findOneAndUpdate({_id: req.body.id}, update, 
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