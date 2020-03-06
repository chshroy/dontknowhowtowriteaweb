const Router = require('express')
const appRouter = Router()

var comment = require('../models/comment');
var article = require('../models/article');



appRouter.get('/', function(req, res) {
    res.locals.username = req.session.username;
    res.locals.authenticated = req.session.logined;
    // if((!req.session.username) || (!req.session.logined)) {
    //     res.render('home', {articles : article({})} );
    //     return;
    // }
    article.find({}, (err, articles) => {
        res.render('home', {articles : articles});
     });
    
});
// homepage

module.exports = appRouter