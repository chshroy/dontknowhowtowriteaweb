// Changed by Andrew Lin on Jan 2018.
var express = require('express')

var ejs = require('ejs')
var session = require('cookie-session')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')

var morgan = require('morgan') // 記錄http通訊時的操作日誌

// server setup
var app = express()

// 資料庫設定！！！！！
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/badblog';
mongoose.connect(mongoDB, {
    useUnifiedTopology: true, // unknown setting????
    useNewUrlParser: true,
    useFindAndModify: false
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));





// set render engine
app.engine('ejs', ejs.renderFile);
// set view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));


//啟用cookie！！！！!
app.use(session({
    key: 'node',
    secret: 'HelloExpressSESSION',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// 路由'/'是從'/views'來的
// app.use('/', express.static(path.join(__dirname, '/views')))


// 路由設定
const routes = require('./routes/index');
const users = require('./routes/users');
const apis = require('./routes/apis');

// 將路由器添加到中間件處理路徑，並指定一個'routes'的URL路徑。
app.use('/', routes);
app.use('/users', users);
app.use('/apis', apis);


app.listen(3000, () => {
    console.log('Server listing on 3000');
});

module.exports = app;