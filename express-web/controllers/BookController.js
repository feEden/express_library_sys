/**
 * @fileoverview book模块controller层
 * @author huangss
 */
const BookService = require('../service/BookService');
const bookService = new BookService();
const { baseURL } = require('../config/app.config');

// 生成图书编码工具
const uuidv1 = require('uuid/v1');

/**
 * 图书管理相关路由控制类
 * @class
 */
class BookController {
    /**
     * @constructor
     */
    constructor() {};

    /**
     * 进入首页action，携带首页的数据
     * @method get
     */
    actionIndex() {
        return async(req, res, next) => {
            // 请求参数
            const options = {
                uri: baseURL + 'books/index',
                method: 'get',
                json: true
            }
            const result = await bookService.getBookList(options);

            res.render('index', { data: result });
        }
    };

    /**
     * 删除指定的图书
     * @method post
     * @example
     * return {code: -1, message: 删除失败, data:[]};
     */
    actionDeleteBookById() {
        return async(req, res, next) => {
            // 获取图书编码
            const { bid } = req.params;
            const options = {
                uri: baseURL + 'books/delete&bid=' + bid,
                method: 'post',
                json: true
            };
            const result = await bookService.deleteBookByBid(options);
            res.json(result);
        }
    };

    /**
     * 跳转到修改/新增图书页面
     * 跳转到修改页面，携带指定图书的信息
     * 跳转到子女增页面携带的数据为''
     * @method post
     */
    actionSaveBook() {
        return async(req, res, next) => {
            const { bid } = req.query;
            const configs = {
                uri: baseURL + 'books/view&bid=' + bid,
                method: 'get',
                json: true
            }
            let result = '';
            // 修改图书信息，去获取图书信息
            if (bid) {
                result = await bookService.getBookInfoByBid(configs);
            }
            res.render('book', { data:result.data });
        }
    };
    /**
     * 更新图书
     * @method post
     */
    actionUpdateBookData() {
        return async(req, res, next) => {
            // 获取表单传递的参数
            const formData = req.body;
            const bid = formData.bid;

            const options = {
                uri: baseURL + 'books/update&bid=' + bid,
                method: 'post',
                form: formData,
                json: true
            }
            const result = await bookService.updateBook(options);
            res.json(result);
        }
    }

    /**
     *新增图书
     *@method post
     */
    actionAddBookData() {
        return async(req, res, next) => {
            // 获取表单传递的参数
            const formData = req.body;
            // 设置图书编码
            formData.bid = uuidv1().replace(/-/g, '');

            const options = {
                uri: baseURL + 'books/create',
                method: 'post',
                form: formData,
                json: true
            }
            const result = await bookService.addBook(options);
            res.json(result);
        }
    };
};

module.exports = BookController;
