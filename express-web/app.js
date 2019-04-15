const express = require('express');
// 解析post请求的参数
const bodyParser = require('body-parser');
// 页面模板引擎
const swig = require('swig');

// 配置信息，解耦
const { staticDir, viewDir, logFileName, port } = require('./config/app.config');

// 配置日志处理器
const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: logFileName } },
    //level 记录日志级别 info debug warn error fatal
    categories: { default: { appenders: ['cheese'], level: 'warn' } }
});
const logger = log4js.getLogger('log');

const app = express();

//设置swig页面不缓存 更改为 false 将重新编译每个请求的模板的文件。正式环境建议保持true
swig.setDefaults({ cache: false });
app.set('view cache', false);
app.set('views', viewDir);
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// 所有请求都会路过这个函数
app.use((req, res, next) => {
    next();
});

// 解析application/json POST请求参数 request playard
app.use(bodyParser.json());
// 解析application/x-www-form-urlencoded POST请求参数 form data
app.use(bodyParser.urlencoded({ extended: true }));

// 设置托管的静态文件
app.use(express.static(staticDir));

// 加载所有的路由
require('./routers/router')(app);

// 错误处理
require('./middleware/errorHandler')(app, logger);

app.listen(port, () => {
    console.log(`server is running at ${port} port...`);
});

module.exports = app;