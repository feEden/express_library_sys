const superagent = require('supertest');
const should = require('should');

const app = require('../app');

function request() {
    return superagent(app.listen())
}

describe("Book模块增删改查接口测试", () => {
    it("查询接口 getBookList 测试", (done) => {
            request()
                .get('/getBookList')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                    console.log(res.body);
                    done();
                })
        })
        /* ,
                it("更新图书接口 /api/updateBook 测试", (done) => {
                    request()
                        .post('/api/updateBook')
                        .send({
                            bid: '99f67a4ca515085f70ebf803698931f6',
                            bname: 'test',
                            bprice: 23,
                            bauth: 'james',
                            btype: 'js',
                            bdesc: 'hahahahhaha'
                        })
                        .set('Accept', 'application/json')
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end((err, res) => {
                            if (err) {
                                done(err);
                            }
                            const result = res.body;
                            console.log(result.message)
                                // 返回的数据应该是一个对象
                            done();
                        })
                }) */
        /* it("删除接口 /api/deleteBookById/:bid 测试", (done) => {
            request()
                .delete('/api/deleteBookById/99f67a4ca515085f70ebf803698931f1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    }
                })
        }) */
})