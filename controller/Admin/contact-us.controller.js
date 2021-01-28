var mongoose = require('mongoose');
const ContactUsSchema = require('../../models/Admin/contact-us.model');

exports.doctorContactUs = async (req, res) => {
    try {
        
        const details = new ContactUsSchema({
            contact_id: 'Contact'+Date.now(),
            name: req.body.name,
            message: req.body.message,
            is_active: true
        });
          
        await details.save((errors, result) => {
            if (errors) {
                return res.status(400).send(errors);
            } else {
               return res.status(200).json({
                    "message": "Contact added successfully",
                    "success": true,
                    "data": details
                });
            }
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}