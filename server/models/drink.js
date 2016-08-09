var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    }],
    creator: {type: String, ref: 'users'},
    approved: {type: Boolean, default: false},
    review: {type: Boolean, default: true}
});

module.exports = mongoose.model('drink', drinkSchema, 'drinks');