var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var autoPop = function (next) {
    this.populate('simpleComponents.id');
    this.populate('complexComponents.id');
    next();
};

mixedDrinkSchema.pre('findOne', autoPop);
mixedDrinkSchema.pre('find', autoPop);

module.exports.mixedDrink = mongoose.model('mixedDrink', mixedDrinkSchema, 'mixedDrinks');