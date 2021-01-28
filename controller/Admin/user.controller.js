// const mongoose = require('mongoose');
// const passport = require('passport');
// const _ = require('lodash');

// const User = mongoose.model('User');

// module.exports.register = (req, res, next) => {
//     console.log("hello i am inside function");
//     var user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.role = req.body.role;
//     user.save((err, doc) => {
//         if(!err) {
//             res.send(doc);
//             console.log("hello", req.body);
//         }
//         else {
//             if (err.code == 1100) {
//                 res.status(422).send(['Duplicate Email Address']);
//             }
//             else {
//                 return next(err);
//             }
//         }
//     })
// }

// module.exports.authenticate = (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if(err) {
//             return res.status(400).json(err);
//         }
//         else if(user) {
//             return res.status(200).json({"token": user.generateJwt() });
//         }
//         else {
//             return res.status(404).json(info);
//         }
//     })(req, res);
// }

// module.exports.resetPassword = (req, res, next) => {
//     console.log("In restPassword");
//     console.log(resettoken.resettoken);
//     if (!req.body.email) {
//             return res
//             .status(500)
//             .json({ message: 'Email is required' });
//         }
//         const user =  User.findOne({
//             email:req.body.email
//         });
//         if (!user) {
//             console.log(res);
//             return res
//             .status(409)
//             .json({ message: 'Email does not exist' });
//         }
//         var resettoken = new passwordResetToken({ 
//             _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') 
//         });
//         resettoken.save(function (err) {
//             if (err) {console.log("Error in reset token"); return res.status(500).send({ msg: err.message }); 
//         }
//         passwordResetToken.find({ 
//             _userId: user._id, resettoken: { $ne: resettoken.resettoken } 
//         }).remove().exec();
//         res.status(200).json({ message: 'Reset Password successfully.' });
//         var transporter = nodemailer.createTransport({
//           service: 'Gmail',
//           port: 465,
//           auth: {
//             user: 'user',
//             pass: 'password'
//           }
//         });
//         var mailOptions = {
//         to: user.email,
//         from: 'sourav.vayuz@gmail.com',
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
//         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//         'http://localhost:4200/new-password/' + resettoken.resettoken + '\n\n' +
//         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//         }
//             transporter.sendMail(mailOptions, (err, info) => {
//         })
//     })
// }


// module.exports.ValidPasswordToken = (req, res, next) => {
//     if (!req.body.resettoken) {
//             return res
//             .status(500)
//             .json({ message: 'Token is required' });
//         }
//         const user = passwordResetToken.findOne({
//             resettoken: req.body.resettoken
//         });
//         if (!user) {
//             return res
//             .status(409)
//             .json({ message: 'Invalid URL' });
//         }
//         User.findOneAndUpdate({ _id: user._userId }).then(() => {
//             res.status(200).json({ message: 'Token verified successfully.' });
//         }).catch((err) => {
//         return res.status(500).send({ msg: err.message });
//         });
// }


// module.exports.newPassword = (req, res, next) => {
//     console.log("Reset password In");
//     passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
//         if (!userToken) {
//           return res
//             .status(409)
//             .json({ message: 'Token has expired' });
//         }
  
//         User.findOne({
//           _id: userToken._userId
//         }, function (err, userEmail, next) {
//           if (!userEmail) {
//             return res
//               .status(409)
//               .json({ message: 'User does not exist' });
//           }
//           return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
//             if (err) {
//               return res
//                 .status(400)
//                 .json({ message: 'Error hashing password' });
//             }
//             userEmail.password = hash;
//             userEmail.save(function (err) {
//               if (err) {
//                 return res
//                   .status(400)
//                   .json({ message: 'Password can not reset.' });
//               } else {
//                 userToken.remove();
//                 return res
//                   .status(201)
//                   .json({ message: 'Password reset successfully' });
//               }
  
//             });
//           });
//         });
  
//       })
//   }



// module.exports.userProfile = (req, res, next) => {
//     User.findOne({ _id: req._id},
//         (err, user) => {
//             if(!user) {
//                 return res.status(404).json({ status: false, message: "User record not Found" });
//             }
//             else {
//                 return res.status(200).json({ status: true, user: _.pick(user,['name','email']) })
//             }
//         }
//         )
// }