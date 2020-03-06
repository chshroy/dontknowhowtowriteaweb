const Router = require('express');
const appRouter = Router();

var comment = require('../models/comment');
var article = require('../models/article');

// 註冊頁面
appRouter.get('/register', function(req, res) {
    // 擋掉已登入者
    console.log(req.session.logined);
    if(req.session.logined) {
        res.redirect('/');
        return;
    }
    res.render('register');
});

// 登入頁面
appRouter.get('/signin', function(req, res) {
    // 擋掉已登入者
    if(req.session.logined) {
        res.redirect('/');
        return;
    }
    res.render('signin');
});

// 登出頁面
appRouter.get('/signout', function(req, res) {
    req.session.logined = false;
    req.session.username = null;
    res.redirect('/');
});

// 忘記密碼頁面
appRouter.get('/forget', function(req, res) {
    // 擋掉已登入者
    if(req.session.logined) {
        res.redirect('/');
        return;
    }
    res.render('forget');
});
// 使用者管理頁面 profile
appRouter.get('/profile', function(req, res) {
    res.send("profile");
});

// 新增文章頁面
appRouter.get('/add_article', function(req, res) {
    // 擋掉未登入者
    if(!req.session.logined) {
        res.redirect('/');
        return;
    }
    res.render('add_article');
});

// 修該文章頁面
appRouter.get('/modify/:id', function(req, res) {
    // 擋掉未登入者
    if(!req.session.logined) {
        res.redirect('/');
        return;
    }

    res.locals.articleID = req.params.id;
    article.find({ _id: req.params.id }, function(err, articles, count) {
        res.render('modify', { articles: articles });
    });

});

// 訪客留言頁面
appRouter.get('/add_comment/:id', function(req, res) {
    res.render('add_comment', { articleID: req.params.id });
});


 module.exports = appRouter