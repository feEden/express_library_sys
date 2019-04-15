const BookService = require('../service/BookService');
const bookService = new BookService();

/**
 * 图书管理相关路由控制类
 */
class BookController {
    constructor() {};

    // 获取图书列表
    actionIndex() {
        return async(req, res, next) => {
            const data = await bookService.getBookList();

            res.render('index', { data });
        }
    };

    // 删除指定的图书
    actionDeleteBookById() {
        return async(req, res, next) => {
            // 获取图书编码
            const { bid } = req.params;

            const data = await bookService.deleteBookByBid(bid);
            res.json(data);
        }
    };

    // 跳转到修改/新增图书页面
    actionSaveBook() {
        return async(req, res, next) => {
            const { bid } = req.query;
            let data = '';

            // 修改图书信息，去获取图书信息
            if (bid) {
                data = await bookService.getBookInfoByBid(bid);
            }
            res.render('book', { data });
        }
    };
    // 更新图书
    actionUpdateBookData() {
        return async(req, res, next) => {
            // 获取表单传递的参数
            const formData = req.body;
            const bid = formData.bid;

            const data = await bookService.updateBook(formData, bid);
            res.json(data);
        }
    };
    // 新增图书
    actionAddBookData() {
        return async(req, res, next) => {
            // 获取表单传递的参数
            const formData = req.body;

            const data = await bookService.addBook(formData);
            res.json(data);
        }
    };
};

module.exports = BookController;