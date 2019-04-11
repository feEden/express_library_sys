const express = require('express');
const router = express.Router();

const request = require('request');
const baseURL = 'http://localhost/yii_library_sys/web/index.php?r=book/';

//图书管理相关路由

// 获取图书列表
router.get('/getBookList', async(req, res, next) => {
    const result = await new Promise((resolve, reject) => {
        request({
            uri: baseURL + 'index',
            method: 'get',
            json: true
        }, (error, res, body) => {
            if (error) {
                reject({ code: -1, message: error.message });
            }
            resolve(body);
        });
    });
    if (result.code) {
        throw new Error(result.message);
    }

    res.render('book/index', { books: result });
});

//删除指定的图书
router.delete('/deleteBookById/:bid', async(req, res, next) => {
    // 解析参数
    const { bid } = req.params;
    const result = await new Promise((resolve, reject) => {
        request({
            uri: baseURL + 'delete&bid=' + bid,
            method: 'get',
            json: true
        }, (err, res, body) => {
            if (err) {
                reject({ code: -1, message: err.message });
            }
            resolve(body);
        });
    });

    if (result.code) {
        throw new Error(result.message);
    }

    res.redirect('/api/getBookList');
});

//修改指定的图书信息 新增图书 bid存在，修改，不存在，新增
router.post('/updateBook', async(req, res, next) => {
    // 获取表单传递的参数
    const formData = req.body;
    const bid = formData.bid;

    const result = await new Promise((resolve, reject) => {
        request({
            uri: baseURL + 'update&bid=' + bid,
            method: 'post',
            form: formData,
            json: true
        }, (err, res, body) => {
            if (err) {
                reject({ code: -1, message: err.message });
            }
            resolve(body);
        });
    });

    if (result.code) {
        throw new Error(result.message);
    }

    res.redirect('/api/getBookList');
});

module.exports = router;