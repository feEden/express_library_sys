const Mocha = require('mocha');

// 配置测试文件存放位置
var mocha = new Mocha({
    reporter       : 'mochawesome',
    reporterOptions: {
        reportDir: '../../docs/mochawesome-report',
        // 不生成json测试结果文件
        json: false,
        // 生成网页测试文件
        html: true,
        //控制控制台的打印信息
        quiet: true
    }
});

// 这里将所有写的测试用例添加到mocha管理
mocha.addFile("./book.spec.js");

// 开始测试
mocha.run(() =>{
    // 测试玩自动退出
    process.exit();
})