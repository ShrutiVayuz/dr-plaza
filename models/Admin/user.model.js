// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// var userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: "Name can\'t be empty"
//     },
//     email: {
//         type: String,
//         required: "Email can\'t be empty",
//         unique: true
//     },
//     password: {
//         type: String,
//         required: "Password can\'t be empty",
//         minLength: [4, 'Password must be atleast 4 characters long']
//     },
//     role: {
//         type: String,
//         required: "Role should be Selected"
//     },
//     saltSecret: String
// });

// userSchema.path('email').validate((val) => {
//     emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     return emailRegex.test(val);
// }, 'Invalid Email Address');

// userSchema.pre('save', function (next) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//             this.saltSecret = salt;
//             next();
//         });
//     });
// });

// userSchema.methods.verifyPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

// userSchema.methods.generateJwt = function() {
//     return jwt.sign({ _id: this._id },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: process.env.JWT_EXP
//         });
// }

// mongoose.model('User', userSchema);