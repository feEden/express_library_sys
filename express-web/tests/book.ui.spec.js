const Rize = require('rize');
// headless: false 可以观看整个测试过程
const rize = new Rize({ headless: false })

const {join} = require('path');

// 进入首页
rize.goto("http://localhost:3000")
    // 保存截图
    .saveScreenshot(join(__dirname, '../', 'docs/ui/index-list.png'))
    // 断言首页的标题
    .assertTitle("图书管理系统")
    // 断言按钮是否包含btn-add类选择器
    .assertClassHas("button", "btn-add")
    // 断言新增按钮的文字
    .assertSeeIn('.btn-add', '新增')
    // 点击新增按钮
    .click('.btn-add') 
    //断言当前页面的url
    .assertUrlIs("http://localhost:3000/saveBook")
    // 断言当前页面是否存在添加图书文本
    .assertSee('添加图书')
    .type('[name="bname"]', '你不知道的javascript(上)')
    .type('[name="bprice"]', '99.0')
    .type('[name="bauth"]', 'james')
    .type('[name="btype"]', 'js')
    .type('[name="bdesc"]', '你不知道的javascript(上)很好啊')
    // 断言页面按钮是否包含btn-save类选择器
    .assertClassHas("button", "btn-save")
    // 断言保存按钮的文字
    .assertSeeIn('.btn-save', '保存')
    // 点击保存按钮，提交表单
    .click('.btn-save')
    // 保存截图
    .saveScreenshot(join(__dirname, '../', 'docs/ui/addBook.png'))
    // 保持跳转后的状态
    .waitForNavigation()
    // 保存截图
    .saveScreenshot(join(__dirname, '../', 'docs/ui/addBook-result.png'))
    // 退出
    .end();