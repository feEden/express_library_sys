const superagent  = require('supertest');
const should = require('should');

const app = require('../app');

function request(){
    return superagent(app.listen())
}

describe("Book模块增删改查接口测试", () =>{
    it("查询接口 /api/getBookList测试", (done) =>{
        request()
            .get('/api/getBookList')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) =>{
                if(err){
                    done(err);
                }
                const result = res.body;
                // 返回的数据应该是一个数组
                should(result).be.a.Array();
                done();
            })
    }),
    it("删除接口 /api/deleteBookById/:bid测试", (done) => {
        request()
            .delete('/api/deleteBookById/99f67a4ca515085f70ebf803698931f6')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) =>{
                if(err){
                    done(err);
                }
                const result = res.body;
                console.log(result);

                // 返回的数据应该是一个对象
                //should(result).be.a.Object();
                //should(result).should.have.property('code', '1');
                //should(result).should.have.property('msg', '删除图书[99f67a4ca515085f70ebf803698931f6]成功');
                done();
            })
    })
})