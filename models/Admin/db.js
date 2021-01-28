const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) {
        console.log("Connection Established");
    }
    else {
        console.log("Error in Connection :" + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');
