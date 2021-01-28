const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
var { Userdoctor } = require('../../models/Users/userdoctor');


router.get('/', (req, res) => {
    Userdoctor.find((err, docs) => 
    {
        if (!err) { res.send(docs); }
        else { console.log("Error in fetching employees : " + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given Id : ${req.params.id}`); 
    
        Userdoctor.findById(req.params.id, (err, doc) => {
        if(!err) { res.send(doc);}
        else { console.log('Error in Retreiving Userdoctor: ' + JSON.stringify(err, undefined, 2)); }
    });
    });

router.post('/', (req, res) => {
    var emp = new Userdoctor({
        doctor_id: req.body.doctor_id,
        name: req.body.name,
        ph_no: req.body.ph_no,
        email: req.body.email,
        specialization: req.body.specialization,
        profile_image: req.body.profile_image,
        signature_image: req.body.signature_image,
        // created_at: req.body.created_at,
        // updated_at: req.body.updated_at,
        // is_active: req.body.is_active
    });
    emp.save((err, doc) => {
        console.log(req.body);
        if (!err) { res.send(doc); }
        else { console.log('Error in Userdoctor Save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        doctor_id: req.body.doctor_id,
        name: req.body.name,
        ph_no: req.body.ph_no,
        email: req.body.email,
        specialization: req.body.specialization,
        profile_image: req.body.profile_image,
        signature_image: req.body.signature_image,
        // created_at: req.body.created_at,
        // updated_at: req.body.updated_at,
        // is_active: req.body.is_active
    };
    Userdoctor.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Userdoctor Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given Id : ${req.params.id}`);

    Userdoctor.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Userdoctor Delete Fn :' +JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;