const mongoose = require('mongoose');
const ATLAS_DB_URI = 'mongodb+srv://shruti:shruti@cluster0.v08jw.mongodb.net/<dr-plaza?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI || ATLAS_DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// mongoose.connect('mongodb://localhost:27017/UserDoc', (err) => {
//     if (!err)
//         console.log("MongoDB connection succeeded");
//     else
//         console.log("Error in connection : " + JSON.stringify(err, undefined, 2));
// });

module.exports = mongoose;