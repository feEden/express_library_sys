module.exports = (app, logger) => {
    // 处理404
    app.use("*", (req, res, next) => {
        res.send('<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>');
    });

    // 处理其它错误
    app.use((err, req, res, next) => {
        logger.error(err);
        res.json({
            code: "5000",
            msg: err.message
        });
    });
}