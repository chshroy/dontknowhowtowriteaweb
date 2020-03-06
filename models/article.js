var mongoose = require('mongoose')

var article = new mongoose.Schema({
    Username: String,
    Article: String,
    CreateDate: Date,
    // notice: ref need type
    Comments: [{ type: mongoose.Schema.ObjectId, ref: 'comment', required: true }]
});

// Compile model from schema
module.exports = mongoose.model('article', article);