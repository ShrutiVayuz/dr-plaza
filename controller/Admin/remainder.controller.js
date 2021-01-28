const mongoose = require('mongoose');
const Remainder = require('../../models/Admin/remainder.model');
const Handler = require('../../Handlers/app.handler');
const schedule = require('node-schedule');


exports.create = (req, res) => {
    let remainder = new Remainder({
        userId : req.body.id,
        title : req.body.title,
        date : new Date(req.body.date),
        type : req.body.type,
        is_active: true,
    });
    return remainder.save()
        .then(async (data) => {
            setReminder(data)
            Handler.createHandler(res, remainder, data);
        })
        .catch((error) => {
            console.log(error);
            Handler.errorHandler(res,error,'Failed to create remainder');
    });
};

function setReminder(data) {
    console.log(data);
    var x = data._id
    var date = new Date(data.date);
    var min = date.getMinutes();
    var hrs = date.getHours();
    var day = date.getDate()
    var month = date.getMonth();
    var dayWeek = date.getDay();
    var year = date.getFullYear();

    if(data.type === 'one-time'){
        var reqDate = new Date(year, month, day, hrs, min, 0);
        console.log(reqDate)
        this.x = schedule.scheduleJob(reqDate, function(){
            console.log('This is One Time Reminder');
        });
    }
    if(data.type === 'daily'){
        var rule = new schedule.RecurrenceRule();
        rule.hour = hrs;
        rule.minute = min;
        this.x = schedule.scheduleJob(rule, function(){
            console.log('This is daily Reminder');
        });
    }
    if(data.type === 'weekly'){
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = dayWeek;
        rule.hour = hrs;
        rule.minute = min;
        this.x = schedule.scheduleJob(rule, function(){
            console.log('This is weekly Reminder');
        });
    }
    if(data.type === 'monthly'){
        var rule = new schedule.RecurrenceRule();
        rule.date = day;
        rule.hour = hrs;
        rule.minute = min;
        this.x = schedule.scheduleJob(rule, function(){
            console.log('This is monthly Reminder');
        });
    }
    console.log(x);
}

exports.getAll = (req, res, next)=>{
    return Remainder.find()
        .exec()
        .then((data) => { 
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to get remainder');
        });
};

exports.getById = (req, res, next)=>{
    const id = req.params.id;
    const details = { '_id': mongoose.Types.ObjectId(id) };
    return Remainder.findOne(details)
        .exec()
        .then((data) => {
            Handler.getByIdHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to get remainder');
        });
};

exports.getByUserId = (req, res, next)=>{
    const id = req.params.id;
    const details = { 'userId': mongoose.Types.ObjectId(id) };
    return Remainder.find(details)
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res,error,'Failed to get remainders');
        });
};

exports.updateStatus = async ( req, res ) => {
    try {
        const update = { is_active: req.body.is_active };
         const review = await Remainder.findOneAndUpdate({_id: req.params.id}, update, 
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
        res.status(500).send(err);
    }
}

exports.updateReminder = async ( req, res ) => {
    try {
        // console.log(req.body);
        // const update = { is_active: req.body.is_active };
         const review = await Remainder.findOneAndUpdate({_id: req.params.id}, req.body, 
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
        res.status(500).send(err);
    }
}

exports.RemindersOfDate = (req, res, next) => {
    const id = req.params.id;
    const start = new Date(new Date(req.query.date).setHours(05, 30, 00));
    const end = new Date(new Date(req.query.date).setHours(28, 89, 59));
    const details = { 'userId': mongoose.Types.ObjectId(id),
    date: {
        $gte: start,
        $lt: end
         }};
    return Remainder.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};

exports.filterType = (req, res, next) => {
    const id = req.params.id;
    const details = {}
    details['userId'] = mongoose.Types.ObjectId(id)
    if(!(req.query.date === 'undefined')){
        const start = new Date(new Date(req.query.date).setHours(05, 30, 00));
        const end = new Date(new Date(req.query.date).setHours(28, 89, 59));
        details['date'] = {
            $gte: start,
            $lt: end
             }
    }
    if(!(req.query.types === '')){
        const types = req.query.types.split(',');
        details['type'] = { $in: types }
    }
    return Remainder.find(details)
        .sort({ date: 'asc'}) 
        .exec()
        .then((data) => {
            Handler.getAllHandler(res, data);
        })
        .catch((error) => {
            Handler.errorHandler(res, error);
        });
};