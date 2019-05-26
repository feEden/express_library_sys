const superagent = require("supertest");
const should = require("should");

const app = require("../app");

function request() {
  return superagent(app.listen());
}

describe("Book模块增删改查接口测试", () => {
    it("查询接口 getBookList 测试", done => {
        request()
        .get("/")
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
            if (err) {
            done(err);
            }
            const result = res.body;
            should(result).be.a.Object();
            should(result).has.property("code", 1);
            should(result).has.property("message", "ok");
            should(result)
            .has.property("data")
            .and.be.a.Array();
            done();
        });
    }),
    it("删除接口 /api/deleteBookByBid/:bid 测试", done => {
      request()
        .delete("/api/deleteBookByBid/c8dc8830601011e9b1a2317af92e48a2aaa")
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          const result = res.body;
          should(result).has.property("code", -1);
          should(result).has.property(
            "message",
            "请求错误,删除的图书编码不存在"
          );
          done();
        });
    }),
    it("更新图书接口 /api/updateBook 测试", done => {
      request()
        .post("/api/updateBook")
        .send({
          bid: "79084ce0602e11e99100cbf517dae0cc",
          bname: "test",
          bprice: 23,
          bauth: "james",
          btype: "js",
          bdesc: "test 跟选的"
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          const result = res.body;
          should(result).has.property("code", 1);
          should(result).has.property(
            "message",
            "更新图书[79084ce0602e11e99100cbf517dae0cc]信息成功"
          );
          done();
        });
    }),
    it("新增图书接口 /api/addBook 测试", done => {
        request()
            .post("/api/addBook")
            .send({
                bname: "test",
                bprice: 23,
                bauth: "test",
                btype: "jstest",
                bdesc: "test"
            })
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
            if (err) {
                done(err);
            }
            const result = res.body;
            should(result).has.property("code", 1);
            should(result).has.property(
                "message",
                "新增图书成功"
            );
            done();
        }); 
    })
});
