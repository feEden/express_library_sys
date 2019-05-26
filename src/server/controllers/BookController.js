/**
 * @fileoverview book模块controller层
 * @author huangss
 */
import cheerio from "cheerio";
import BookService from '../service/BookService';
import { baseURL } from '../config/app.config';

const bookService = new BookService();

// 生成图书编码工具
import uuidv1 from 'uuid/v1';

/**
 * 图书管理相关路由控制类= require(
 * @class
 */
class BookController {
    /**= require(
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

            res.render('books/pages/index', { data: result });
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
     * 进入新增图书页面
     */
    actionAddBook() {
        return async(req, res, next) => {
            const {_pjax} = req.query;

            // 获取渲染页面的内容
            const html = await new Promise((resolve, reject) =>{
                res.render('books/pages/add', function(err, html){
                    if(err){
                        resolve("");
                        return;
                    }
                    resolve(html);
                }); 
            });

            // _pajx存在，可是通过站内a标签跳转，返回相应的组件，做局部刷新，不重复加载资源
            if(_pjax){
                // 将网页内容转成DOM树
                const $ = cheerio.load(html);

                //后台合成内容
                let _result = "";
                $(".add-pjax-centent").each(function () {
                    _result += $(this).html();
                });
                $(".lazyload-css").each(function () {
                    
                    _result += `<link rel="stylesheet" href="${$(this).attr("href")}"></link>`;
                });
                $(".lazyload-js").each(function () {
                    _result += `<script src="${$(this).attr("src")}"></script>`;
                });

                res.end(_result);
            }else{
                //刷新
                res.end(html);
            }
        }
    };
    /**
     * 进入更新图书页面
     */
    actionUpdateBook() {
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

            res.render('books/pages/update', { data:result.data });
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
module.exports =  BookController;