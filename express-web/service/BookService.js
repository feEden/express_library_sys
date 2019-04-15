const request = require('request');
const { baseURL } = require('../config/app.config');

// 图书管理service层
class BookService {
    constructor() {}

    /**
     * 获取图书列表
     */
    async getBookList() {
        const result = await new Promise((resolve, reject) => {
            request({
                uri: baseURL + 'books/index',
                method: 'get',
                json: true
            }, (error, res, body) => {
                if (error) {
                    reject({ code: -1, message: error.message });
                }

                resolve(body);
            });
        });

        return result;
    };

    /**
     * 删除指定的图书
     * @param {String} bid 图书编码
     */
    async deleteBookByBid(bid) {
        const result = await new Promise((resolve, reject) => {
            request({
                uri: baseURL + 'books/delete&bid=' + bid,
                method: 'post',
                json: true
            }, (err, res, body) => {
                if (err) {
                    reject({ code: -1, message: err.message });
                }
                resolve(body);
            });
        });

        return result;
    };

    /**
     * 获取指定图书信息
     * @param {String} bid 图书编码 
     */
    async getBookInfoByBid(bid) {
        const result = await new Promise((resolve, reject) => {
            request({
                uri: baseURL + 'books/view&bid=' + bid,
                method: 'get',
                json: true
            }, (error, res, body) => {
                if (error) {
                    reject({ code: -1, message: error.message });
                }
                resolve(body);
            });
        });

        return result;
    };

    /**
     * 更新图书
     * @param {Object} formData 表单提交数据
     * @param {String} bid 修改图书信息传入的图书编码
     */
    async updateBook(formData, bid) {
        const result = await new Promise((resolve, reject) => {
            request({
                uri: baseURL + 'books/update&bid=' + bid,
                method: 'post',
                form: formData,
                json: true
            }, (error, res, body) => {
                if (error) {
                    reject({ code: -1, message: error.message });
                }
                resolve(body);
            });
        });

        return result;
    }

    /**
     * 新增图书
     * @param {Object} formData 表单提交数据
     */
    async addBook(formData, bid) {
        const result = await new Promise((resolve, reject) => {
            request({
                uri: baseURL + 'books/create',
                method: 'post',
                form: formData,
                json: true
            }, (error, res, body) => {
                if (error) {
                    reject({ code: -1, message: error.message });
                }
                resolve(body);
            });
        });

        return result;
    }

}

module.exports = BookService;