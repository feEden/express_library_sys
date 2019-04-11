const express = require('express');
const router = express.Router();

//跳转到首页
router.get('/', (req, res, next) => {
    res.redirect('/api/getBookList');
});
// 跳转到新增图书页面
router.get('/addBook', (req, res, next) => {
    res.render('book/addBook');
});

module.exports = router;