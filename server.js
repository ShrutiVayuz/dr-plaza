// const express = require('express');
// const bodyparser = require('body-parser');
// const mongoose = require('mongoose');
// var PORT = process.env.PORT || 3000;
// const cors = require('cors')
// // require('./config/config');
// // require('./models/Admin/db');
// // require('./config/passportConfig');
// // const { mongoose } = require('./db.js');
// var Router = require('./routes/router.config');

// // const rtsIndex = require('./routes/index.router');
// // const passport = require('passport');

// // var userdoctorController = require('./controller/Users/userdoctor.controller.js');

// // var app = express();
// // app.use(bodyParser.json());
// // app.use(cors());

// // app.listen(3000, () => console.log('Server started at port : 3000'));

// // app.use('/users', userdoctorController);

// // app.use(bodyParser.json());
// // app.use(cors());
// // app.use(passport.initialize());
// // app.use('/api', rtsIndex);

// // '/api/register'

// // Error handeling
// // app.use((err, req, res, next) => {
// //     if(err.name == 'ValidationError') {
// //         var valErrors = [];
// //         Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
// //         res.status(422).send(valErrors)
// //     }
// // });

// // app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

// // const localdbName = 'DoctorsAppDB';
// // const localDb = 'mongodb://localhost/'+localdbName;

//  const ATLAS_DB_URI = 'mongodb+srv://User1:user1@cluster0.gxylu.mongodb.net/DoctorsAppDB?retryWrites=true&w=majority';

// mongoose.connect(process.env.MONGODB_URI || ATLAS_DB_URI, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

// var app = express();
// app.use(bodyparser.urlencoded({extended : true}));
// app.use(bodyparser.json());
// app.use(cors());

// app.get('/',function(req,res){
//     res.send('It works');
// });

// const PasswordHandler = require('./Handlers/password.handler');
// password = "sambath";
// console.log(PasswordHandler.encryptPassword(password));

// Router.routerConfig(app);

// app.listen(PORT, ()=> {
//     console.log('server listening on port '+PORT);
//   });

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;
const cors = require('cors')

var Router = require('./routes/router.config');

//const localdbName = 'DoctorsAppDB';
//const localDb = 'mongodb://localhost/'+localdbName;

 const ATLAS_DB_URI = 'mongodb+srv://User1:user1@cluster0.gxylu.mongodb.net/DoctorsAppDB?retryWrites=true&w=majority';


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

var app = express();
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(cors());

app.get('/',function(req,res){
    res.send('It works');
});

const PasswordHandler = require('./Handlers/password.handler');
password = "sambath";
console.log(PasswordHandler.encryptPassword(password));

Router.routerConfig(app);

app.listen(PORT, ()=> {
    console.log('server listening on port '+PORT);
  });

