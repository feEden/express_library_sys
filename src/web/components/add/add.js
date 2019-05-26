// 保存更新图书
class AddBook {
    constructor() { }
    template() {
        xtag.create('x-add', class extends XTagElement {
            constructor() {
                super();
            };
            '::template(true)'() {
                return `<h1>添加图书</h1>
              <form>
                  <div class="form-group">
                      <label for="bname">书名</label>
                      <input type="text" class="form-control" id="bname" name="bname" placeholder="书名" value="">
                  </div>
                  <div class="form-group">
                      <label for="bprice">价格</label>
                      <input type="text" class="form-control" id="bprice" name="bprice" placeholder="价格" value="">
                  </div>
                  <div class="form-group">
                      <label for="bauth">作者</label>
                      <input type="text" class="form-control" id="bauth" name="bauth" placeholder="作者" value="">
                  </div>
                  <div class="form-group">
                      <label for="btype">分类</label>
                      <input type="text" class="form-control" id="btype" name="btype" placeholder="分类" value="">
                  </div>
                  <div class="form-group">
                      <label for="bdesc">简介</label>
                      <textarea class="form-control" name="bdesc" id="bdesc"></textarea>
                  </div>
              </form>
              <button class="btn btn-success btn-add" id="btn-add">保存</button>`
            };
            'click::event'(e) {
                if (e.target.id === "btn-add") {
                    Util.throttle(() => {
                        const formData = {
                            bid: $('#bid').val(),
                            bname: $('#bname').val(),
                            bprice: $('#bprice').val(),
                            bauth: $('#bauth').val(),
                            btype: $('#btype').val(),
                            bdesc: $('#bdesc').val()
                        };


                        // 发送请求
                        $.ajax({
                            url: "/api/addBook",
                            method: 'post',
                            dataType: 'json',
                            data: formData,
                            success(res) {
                                if (res.data.code === 1) {
                                    //回到首页
                                    window.location.href = '/';
                                }
                                alert(res.data.message);
                            }
                        });
                    }, 1000)();
                }
            }
        });
    }
}

export default AddBook;