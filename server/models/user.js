var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    salt: String,
    password: String,
    roles: [String]
});

userSchema.statics.createSalt = function () {
    return crypto.randomBytes(128).toString('base64')
};

userSchema.statics.hashPassword = function (salt, pwd) {
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex');
};

module.exports = mongoose.model('user', userSchema, 'users')