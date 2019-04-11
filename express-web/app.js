const express = require('express');
// 解析post请求的参数
const bodyParser = require('body-parser');
// 页面模板引擎
const swig = require('swig');

// 配置日志处理器
const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './log/cheese.log' } },
    //level 记录日志级别 info debug warn error fatal
    categories: { default: { appenders: ['cheese'], level: 'warn' } }
});

const app = express();

const logger = log4js.getLogger('cheese');

//设置swig页面不缓存
swig.setDefaults({ cache: false });
app.set('view cache', false);
app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// 所有请求都会路过这个函数
app.use((req, res, next) => {
    next();
});

// 解析application/json
app.use(bodyParser.json());
// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 设置托管的静态文件
app.use(express.static('public'))

// 加载所有的路由
const book = require('./routers/book');
const bookApi = require('./routers/bookApi');
//注册页面跳转路由
app.use(book);
//注册所有接口路由 以/api开头
app.use('/api', bookApi);

// 处理404
app.use("*", (req, res, next) => {
    res.render('error/404', { error: '页面不存在' });
});

// 处理自定义错误
app.use(function(err, req, res, next) {
    res.json({
        code: "5000",
        msg: err.message
    });
});

app.listen(3000, () => {
    console.log('server is running at 3000 port...');
});