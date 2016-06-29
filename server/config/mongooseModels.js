var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// Mongoose Model

var drinkSchema = new Schema({
    name: String,
    category: String,
    type: String,
    subTypes: [String],
    description: String,
    glassware: String,
    manufacturer: String,
    countryOfOrigin: String,
    abv: Number,
    viewCount: Number,
    tags: [String],
    reviews: [{
        userId: {type: String, ref: 'users'},
        rating: Number,
        text: String
    }]
});

var mixerSchema = new Schema({
    name: String,
    viewCount: Number,
    tags: [String],
    reviews: [{
        userId: {type: String, ref: 'users'},
        rating: Number,
        text: String
    }]
});

var mixedDrinkSchema = new Schema({
    name: String,
    description: String,
    simpleComponents: [{
        id: {type: String, ref: 'drink'},
        amount: Number
    }],
    complexComponents: [{
        id: {type: String, ref: 'mixedDrink'},
        amount: Number
    }]
});

var userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    salt: String,
    password: String,
    roles: [String]
});

var autoPop = function (next) {
    this.populate('simpleComponents.id');
    this.populate('complexComponents.id');
    next();
};

userSchema.statics.createSalt = function () {
    return crypto.randomBytes(128).toString('base64')
};

userSchema.statics.hashPassword = function (salt, pwd) {
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex');
};

mixedDrinkSchema.pre('findOne', autoPop);
mixedDrinkSchema.pre('find', autoPop);

module.exports = {
    user: mongoose.model('user', userSchema, 'users'),
    drink: mongoose.model('drink', drinkSchema, 'drinks'),
    mixer: mongoose.model('mixer', mixerSchema, 'mixers'),
    mixedDrink: mongoose.model('mixedDrink', mixedDrinkSchema, 'mixedDrinks')
};