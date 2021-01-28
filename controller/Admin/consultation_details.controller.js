const ConsultationSchema = require('../../models/Admin/condition.model');
const mongoose = require('mongoose');
const DoctorModel = require('../../models/Admin/doctor.model');


exports.addConsultationDetails = async ( req, res ) => {
    try {
        console.log('chekkkkk',req.body);
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}