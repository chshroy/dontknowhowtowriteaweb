const Router = require('express');
const appRouter = Router();

var comment = require('../models/comment');
var article = require('../models/article');


// 會員註冊功能
appRouter.post('/register', function(req, res) {
    // 沒輸入資料
    if ((!req.body.user) || (!req.body.pwd)) { // from the name in the form
        
        res.redirect('/users/register');
        return;
    }
    req.session.username = req.body.user;
    req.session.password = req.body.pwd;
    req.session.logined = true;
    res.redirect('/');
});

// 會員登入頁面
appRouter.post('/login', function(req, res) {
})

// 新增文章功能
appRouter.post('/add_article', function(req, res){
    new article({
        Username: req.session.username,
        Article: req.body.article,
        CreateDate: Date.now()
      }).save().then( result => {
        res.redirect('/')
      }).catch(err => {
        res.status(400).send("Unable to save data" + err);
    });
});

// 刪除文章功能
appRouter.get('/delete/:id', function(req, res) {
    article.remove({ _id: req.params.id }, function(err) {
        if(err) {
            console.log("Fail to delete"+err);
        } else {
            console.log("Done");
        }
    })
    res.redirect('/');
});

// 更新文章功能
appRouter.post('/update/:id', function(req, res) {
    article.update({_id: req.params.id}, {Article: req.body.article}, function(err) {
        if(err) {
            console.log("Fail to update" + err);
        } else {
            console.log("Done");
        }
    });
    res.redirect('/');
});

// 文章留言功能
appRouter.post('/add_comment/:id', function(req, res) {
    // 文章id讀取失敗
    if(!req.params.id) {
        res.redirect('/');
    }
    comment.create({
        Visitor: req.session.username,
        Comment: req.body.comment,
        CreateDate: Date.now()
    }).then(newComment => {
        article.findByIdAndUpdate( req.params.id,
            { $push: newComment},
            { new: true, useFindAndModify: false }
        );
    });
    
    res.redirect('/');
});
module.exports = appRouter