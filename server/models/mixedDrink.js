var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mixedDrinkSchema = new Schema({
    name: String,
    creator: {type: String, ref: 'users'},
    description: String,
    instructions: String,
    dbIngredients: [{
        drink: {type: String, ref: 'drink'},
        amount: Number
    }],
    userIngredients: [{
        drink: String,
        amount: Number
    }],
    reviews: [{
        userId: {type: String, ref: 'users'},
        rating: Number,
        text: String
    }],    
    approved: {type: Boolean, default: false},
    review: {type: Boolean, default: false}
});

var autoPop = function (next) {
    this.populate('simpleComponents.id');
    this.populate('complexComponents.id');
    next();
};

mixedDrinkSchema.pre('findOne', autoPop);
mixedDrinkSchema.pre('find', autoPop);

module.exports = mongoose.model('mixedDrink', mixedDrinkSchema, 'mixedDrinks');