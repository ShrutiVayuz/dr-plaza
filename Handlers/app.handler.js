

exports.errorHandler = (res, error, message, code)=>{
    console.log("ERROR: " + error.message);
    response = {
        "error": error.message,
        "details" : error,
        "message" : message
    };
    return res.status(code || 500).json(response);
};



exports.getAllHandler = (res, data)=>{
    response = {
        count : data.length,
        data: data,
        status: res.statusCode,
    };
    return res.status(200).json(response);
};

exports.getByIdHandler = (res, data)=>{
    response = {
        data: data,
        status: res.statusCode,
    };
    return res.status(200).json(response);
};

exports.getByStatusHandler = (res, data)=>{
    response = {
        data: data,
        status: res.statusCode,
    };
    return res.status(200).json(response);
};

exports.createHandler = (res, data, result)=>{
    response = {
        data: data,
        result: result,
        status: res.statusCode,
        message: 'Data added successfully'
    };
    res.status(201).json(response);
};

exports.updateByIdHandler = (res, data, result)=>{
    var response;
    if (result.n === 0) {
        response = {
            status: res.statusCode,
            message: 'Entered id is invalid'
        };
    }
    else {
        response = {
            data: data,
            result: result,
            status: 200,
            message: 'Data updated successfully'
        };
    }

    return res.json(response);
};

exports.deleteByIdHandler = (res, result)=>{
    var response;
    if (result.n === 0) {
        response = {
            status: res.statusCode,
            message: 'Entered id is invalid'
        };
    }
    else {
        response = {
            result: result,
            status: res.statusCode,
            message: 'Data deleted successfully'
        };
    }

    return res.json(response);
};

