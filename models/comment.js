var mongoose = require('mongoose')

var comment = new mongoose.Schema({
    Visitor: String,
    Comment: String,
    CreateDate: Date
});


module.exports = mongoose.model('comment', comment);
