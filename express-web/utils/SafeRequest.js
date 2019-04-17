/**
 * @fileoverview 封装请求库 request 做一些容错
 * @author huangss
 */
const request = require('request');

/**
 * SafeRequest 更加安全的请求库
 * @class
 */
class SafeRequest{
    /**
     *  @constructor
     */
    constructor(){}

    /**
     *  请求方法
     * @param {Object} options
     * @example
     *  request({
     *      uri: uri,
     *      method: 'get',
     *      json: true
     * })
     */
    static request(options){
        return new Promise((resolve, reject) =>{
            let result = {
                code: -1,
                message: 'request向后端请求数据失败',
                data:[]
            }
            request(options, (error, res, body) => {
                if (error) {
                    result.message = error.message;
                    reject(result);
                }

                // 访问出错了，返回服务器提示的错误
                if(body.code === 0 && body.status === 404){
                    result.data = {code: -1, message: body.message + ',删除的图书编码不存在'};
                    resolve(result);
                }else{
                    result.code = 1;
                    result.message = 'ok';
                    result.data = body;

                    resolve(result);
                }
            });
        });
    }
}

module.exports = SafeRequest;