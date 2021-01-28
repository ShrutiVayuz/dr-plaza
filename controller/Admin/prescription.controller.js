const PrescriptionModel = require('../../models/Admin/prescription.model');
var mongoose = require('mongoose');
const MedicineModel = require('../../models/Admin/medicine.model');
const Handler = require('../../Handlers/app.handler');
const MedicineDetailsModel = require('../../models/Admin/medicine_details.model');
const MedicineScheduleModel = require('../../models/Admin/medicine_schedule.model');
const AppointmentModel = require('../../models/Admin/appointment.model');

exports.addPrescription = async (req, res) => {
    try {
        console.log(req.body);
        const prescription = new PrescriptionModel({
            prescription_id: 'Prescription' + Date.now(),
            appointmentId: req.body.appointmentId,
            doctorId: req.body.doctorId,
            patient_note: req.body.patientNote,
            ailment_details: req.body.ailmentDetails,
            ailment_instruction: req.body.ailmentInstruction,
            complain_details: req.body.complain,
            suggestion: req.body.suggestion,
            is_active: true
        });
        await prescription.save(async (errs, reslt) => {
            if (errs) {
                return res.status(200).send(errs)
            }
            else {
                for (let i = 0; i < req.body.inputArr.length; i++) {
                    let checkMedicine = await MedicineModel.findOne({ medicine_name: req.body.inputArr[i].medicineName, medicine_type: req.body.inputArr[i].medicineType });
                    if (checkMedicine) {
                        const medicineDetails = new MedicineDetailsModel({
                            medicineDetails_id: 'MedicineDetails' + Date.now(),
                            medicineId: checkMedicine._id,
                            prescriptionId: reslt._id,
                            day: req.body.inputArr[i].days,
                            medicine_instruction: req.body.inputArr[i].medicineInstruction,
                            is_active: true,
                        });
                        await medicineDetails.save(async (errss, resltt) => {
                            if (errss) {
                                return res.status(200).send(errss);
                            }
                            else {
                                // for (let j = 0; j < req.body.inputArr[i].days.length; j++) {
                                //     const medicineSchedule = new MedicineScheduleModel({
                                //         medicineSchedule_id: 'MedicineSchedule' + Date.now(),
                                //         medicineDetailsId: resltt._id,
                                //         prescriptionId: reslt._id,
                                //         day: req.body.inputArr[i].days[j],
                                //         is_active: true
                                //     });

                                //     await medicineSchedule.save((errorss, result) => {
                                //         if (errorss) {
                                //             return res.status(200).send(errorss);
                                //         }
                                //         else {

                                //         }
                                //     });
                                // }
                            }
                        })
                    }
                    else {
                        const medicine = new MedicineModel({
                            medicine_id: 'Medicine' + Date.now(),
                            medicine_name: req.body.inputArr[i].medicineName,
                            medicine_type: req.body.inputArr[i].medicineType,
                            is_active: true
                        });

                        await medicine.save(async (error, rest) => {
                            if (error) {
                                return res.status(200).send(error);
                            }
                            else {
                                const medicineDetails = new MedicineDetailsModel({
                                    medicineDetails_id: 'MedicineDetails' + Date.now(),
                                    medicineId: rest._id,
                                    prescriptionId: reslt._id,
                                    day: req.body.inputArr[i].days,
                                    medicine_instruction: req.body.inputArr[i].medicineInstruction,
                                    is_active: true,
                                });
                                await medicineDetails.save(async (errss, resltt) => {
                                    if (errss) {
                                        return res.status(200).send(errss);
                                    }
                                    else {
                                        // for (let j = 0; j < req.body.inputArr[i].days.length; j++) {
                                        //     const medicineSchedule = new MedicineScheduleModel({
                                        //         medicineSchedule_id: 'MedicineSchedule' + Date.now(),
                                        //         medicineDetailsId: resltt._id,
                                        //         prescriptionId: reslt._id,
                                        //         day: req.body.inputArr[i].days[j],
                                        //         is_active: true
                                        //     });

                                        //     await medicineSchedule.save((errorss, result) => {
                                        //         if (errorss) {
                                        //             return res.status(200).send(errorss);
                                        //         }
                                        //         else {

                                        //         }
                                        //     });
                                        // }
                                    }
                                })
                            }
                        })
                    }
                }
                const delOpt = await AppointmentModel.findOneAndUpdate({ _id: req.body.appointmentId }, {
                    $set: { status: 'inactive' }
                }, async (eeerr, rrrr) => {
                    if(eeerr) {
                        return res.send(eeerr)
                    }
                    else {}
                });
                return res.status(200).json({
                    "message": "prescription added successfully",
                    "success": true,
                    "data": reslt
                })
            }
        });
    } catch (err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
};


exports.getPrescriptionByAppointmentId = (req, res, next) => {
    console.log('hitzzzzz')
    const details = { 'appointmentId': mongoose.Types.ObjectId(req.params.id) };
    return PrescriptionModel.findOne(details)
        .populate('appointmentId')
        .exec()
        .then((data) => {
            Handler.getByStatusHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error, 'Failed to get clinic');
        });
};



exports.viewPrescription = async (req, res) => {
    try {
        console.log(req.body)
        const presr = await PrescriptionModel.findOne({appointmentId : req.body.id })
        console.log('111111',presr)
       
        const details = await MedicineDetailsModel.find({ prescriptionId: mongoose.Types.ObjectId(presr._id), is_active: true })
            .populate({ path: 'prescriptionId', populate: { path: 'appointmentId', populate: { path: 'clinic_id' } } })
            .populate({ path: 'medicineId' });
            console.log('2222222',details)


        // const data = await getUniqueData(details,arr);

        return res.status(200).json({
            "length": details.length,
            "message": "get all prescription details",
            "success": true,
            "data": details
        })
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.viewAllPrescription = async (req, res) => {
    try {
        const data = await PrescriptionModel.find({ doctorId: req.body.id })
            .populate('appointmentId');
        return res.status(200).json({
            "length": data.length,
            "message": "get all prescription ",
            "success": true,
            "data": data
        })
    } catch (error) {
        res.send(error);
        res.status(500).json({ statusCode: 500 });
    }
};

exports.editPrescription = async (req, res) => {
    try {
        console.log(req.body);
        const delOpt = await MedicineDetailsModel.update({ prescriptionId: req.body.prescriptionId }, {
            $set: { is_active: false }
        }, { multi: true });

        const updPres = await PrescriptionModel.findOneAndUpdate({ _id: req.body.prescriptionId }, {
            $set: {
                patient_note: req.body.patientNote,
                ailment_details: req.body.ailmentDetails,
                ailment_instruction: req.body.ailmentInstruction,
                complain_details: req.body.complain,
                suggestion: req.body.suggestion,
            }
        }, async (err, resp) => {
            if (err) {
                return res.status(200).send(errs)
            }
            else {
                for (let i = 0; i < req.body.inputArr.length; i++) {
                    if (req.body.inputArr[i].medicineDetailsId == '') {
                        let checkMedicine = await MedicineModel.findOne({ medicine_name: req.body.inputArr[i].medicineName, medicine_type: req.body.inputArr[i].medicineType });
                        if (checkMedicine) {
                            const medicineDetails = new MedicineDetailsModel({
                                medicineDetails_id: 'MedicineDetails' + Date.now(),
                                medicineId: checkMedicine._id,
                                prescriptionId: req.body.prescriptionId,
                                day: req.body.inputArr[i].days,
                                medicine_instruction: req.body.inputArr[i].medicineInstruction,
                                is_active: true,
                            });
                            await medicineDetails.save(async (errss, resltt) => {
                                if (errss) {
                                    return res.status(200).send(errss);
                                }
                                else {

                                }
                            })
                        }
                        else {
                            const medicine = new MedicineModel({
                                medicine_id: 'Medicine' + Date.now(),
                                medicine_name: req.body.inputArr[i].medicineName,
                                medicine_type: req.body.inputArr[i].medicineType,
                                is_active: true
                            });

                            await medicine.save(async (error, rest) => {
                                if (error) {
                                    return res.status(200).send(error);
                                }
                                else {
                                    const medicineDetails = new MedicineDetailsModel({
                                        medicineDetails_id: 'MedicineDetails' + Date.now(),
                                        medicineId: rest._id,
                                        prescriptionId: req.body.prescriptionId,
                                        day: req.body.inputArr[i].days,
                                        medicine_instruction: req.body.inputArr[i].medicineInstruction,
                                        is_active: true,
                                    });
                                    await medicineDetails.save(async (errss, resltt) => {
                                        if (errss) {
                                            return res.status(200).send(errss);
                                        }
                                        else {

                                        }
                                    })
                                }
                            })
                        }
                    }
                    else {
                        const updMedicineDetails = await MedicineDetailsModel.findOneAndUpdate({ _id: req.body.inputArr[i].medicineDetailsId }, {
                            $set: {
                                day: req.body.inputArr[i].days,
                                medicine_instruction: req.body.inputArr[i].medicineInstruction,
                                is_active: true,
                            }
                        }, async (errr, ress) => {
                            if(errr){
                                return res.status(200).send(errr);
                            }
                            else {
                                await MedicineModel.findOneAndUpdate({_id: req.body.inputArr[i].medicineId._id},{
                                    $set: {
                                        medicine_name: req.body.inputArr[i].medicineName,
                                        medicine_type: req.body.inputArr[i].medicineType,
                                    }
                                }, async (errrrs, rees) => {
                                    if(errrrs){
                                        return res.status(200).send(errrrs);
                                    }
                                    else {
                                        console.log('updated succesfully');
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
        res.status(200).json({ "message": "Prescription updated successfully", "success": true })
    } catch (error) {
        res.send(error);
        res.status(500).json({ statusCode: 500 });
    }
}