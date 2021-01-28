const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.generatePassword = () => {

    // Generate a random number.
    var number = Math.random()

    // Convert this number into a string.
    var string = number.toString(36)

    // Grab a section of the string as the password
    var password = string.substr(2, 10)

    // Return the password back!
    return password;
}

exports.encryptPassword = (textPassword)=>{
    let hashPassword;
    bcrypt.hash(textPassword, saltRounds), (err, hash)=> {
        hashPassword = hash;
    };
    return hashPassword;
}