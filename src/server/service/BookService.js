/**
 * @fileoverview  实现book模块service层
 * @author huangss
 */
import SafeRequest from '../utils/SafeRequest';

/**
 *  BookService类, 对外提供增删改查的数据接口
 * @class
 */
class BookService {
    /**
     * @constructor
     * @param
     */
    constructor() {}

    /**
     * 获取图书列表
     * @param {Object} options  请求配置参数
     * @example
     * getBookList({uri: baseURL + 'books/index',method: 'get',json: true})
     * return new Promise
     */
    getBookList(options) {
        return SafeRequest.request(options);
    };

    /**
     * 删除指定的图书
     * @param {Object} options  请求配置参数
     * @example
     * deleteBookByBid({uri: baseURL + 'books/delete&bid=' + bid,method: 'post',json: true})
     * return new Promise
     */
    deleteBookByBid(options) {
        return SafeRequest.request(options);
    };

    /**
     * 获取指定图书信息
     * @param {Object} options  请求配置参数
     * @example
     * getBookInfoByBid({uri: baseURL + 'books/view&bid=' + bid,method: 'get',json: true})
     * return new Promise
     */
    getBookInfoByBid(options) {
        return SafeRequest.request(options);
    };

    /**
     * 更新图书
     * @param {Object} options  请求配置参数
     * @example
     * updateBook({uri: baseURL + 'books/update&bid=' + bid,method: 'post',json: true})
     * return new Promise
     */
    updateBook(options) {
        return SafeRequest.request(options);
    }

    /**
     * 新增图书
     * @param {Object} options 请求配置参数
     * @example
     * addBook({uri: baseURL + 'books/create',method: 'post',json: true})
     * return new Promise
     */
    addBook(options) {
        return SafeRequest.request(options);
    }

}

module.exports = BookService;