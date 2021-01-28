var mongoose = require('mongoose');
const Handler = require('../../Handlers/app.handler');
const Review = require('../../models/Admin/review.model');


exports.addReview = async (req, res) => {
    try {
        console.log("review posting");
        console.log(req.body);
            if ( !req.body.clinicId || !req.body.userId) {
                return res.status(200).json({
                    "message": "Clinic Id and User Id not provided",
                    "success": false
                })
            };
            review = new Review({
                doctorId : req.body.doctorId,
                clinicId : req.body.clinicId,
                userId : req.body.userId,
                rating : parseInt(req.body.rating),
                review : req.body.comment,
                is_active : false,
                is_deleted : false
            });
            await review.save((errors, result) => {
                if (errors) {
                    return res.status(400).send(errors);
                } else {
                    return res.status(200).json({
                        "message": "review posted successfully",
                        "success": true,
                        "data": result
                    });
                }
            })
        }
    catch (err) {
        res.status(500).send(err);
    }
};


exports.getReviewsOfDoctor = (req, res, next)=>{
    // console.log("came here too")
    const id = req.params.id;
    const details = { 'doctorId': mongoose.Types.ObjectId(id) };
    return Review.find(details)
        .populate('userId', 'patient_name')
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to get location');
        });
};

exports.avgRatingOfDoctor = (req, res, next) => {
    const id = req.params.id;
    const details = { 'doctorId' : mongoose.Types.ObjectId(id) };
    Review.aggregate([
        { $match: details
        },
        { $group: {
            _id: '$doctorId',
            average_rating: {
                $avg: '$rating'
            }
        } }
    
    ], function (err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send(result);
    });
};

exports.getAllReview = async (req, res) => {
    try {
        const data = await Review.find()
        .populate('doctorId', 'doctorName')
        .populate('clinicId', 'clinicName')
        .populate('userId', 'patient_name');
        return res.status(200).json({
            "message": "get all review",
            "success": true,
            "data": data
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 })
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const data = await Review.findOne({ _id: req.body.id})
        .populate('doctorId', 'doctorName')
        .populate('clinicId', 'clinicName')
        .populate('userId', 'patient_name');
        return res.status(200).json({
            "message": "get review",
            "success": true,
            "data": data
        })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 })
    }
};

exports.removeReview = async ( req, res ) => {
    try {
        const update = { 
            is_active: req.body.active,
            is_deleted: req.body.deleted
         };
         const review = await Review.deleteOne({_id: req.body.id},
            async(error, result) => {
                if(error){
                    return res.status(400).send(error);
                }else {
                    return res.status(200).json({
                        "message": "deleted successfully",
                        "success": true,
                    });
                }
            })
    } catch(err) {
        res.send(err);
        res.status(500).json({ statusCode: 500 });
    }
}

exports.editActiveReview = async ( req, res ) => {
    try {
        const update = { is_active: req.body.active };
         const review = await Review.findOneAndUpdate({_id: req.body.id}, update, 
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

