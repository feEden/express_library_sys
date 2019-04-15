const _ = require('lodash');
const { join } = require('path');

let config = {
    // 静态文件目录
    staticDir: join(__dirname, '../', 'assets'),
    // 页面模板目录
    viewDir: join(__dirname, '../', 'views'),
    // 日志存放文件
    logFileName: join(__dirname, '../', 'logs/error.log')
};

if (process.env.NODE_ENV === 'production') {
    config = _.extend(config, { port: 8080, baseURL: '' })
}

if (process.env.NODE_ENV === 'development') {
    config = _.extend(config, { port: 3000, baseURL: 'http://localhost/yii-server/web/index.php?r=' })
}

if (process.env.NODE_ENV === 'testing') {
    config = _.extend(config, { port: 9000, baseURL: 'http://localhost/yii-server/web/index.php?r=' })
}
module.exports = config;