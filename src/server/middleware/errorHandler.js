module.exports = (app, logger) => {
    process.on("uncaughtException", (e) => {
        logger.error(e);
    });
    process.on("unhandledRejection", (e) =>{
        logger.error(e);
    });
    // 处理404
    app.use("*", (req, res, next) => {
        res.send("404，Not Found");
    });
    // 处理其它错误
    app.use((e, req, res, next) => {
        logger.error(e);
        res.json({
            code: "5000",
            msg: e.message
        });
    });
}