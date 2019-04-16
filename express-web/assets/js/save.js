/**
 * 增加或修改图书
 */
class Save{
    constructor(){}
    saveBook(){
        // 保存/新增图书 做节流
        $('.btn-save').on('click', Util.throttle(() =>{
            this.saveBookHandler();
        }, 1000));
    };
    saveBookHandler(){
        const formData = {
            bid: $('#bid').val() ? $('#bid').val() : '',
            bname: $('#bname').val(),
            bprice: $('#bprice').val(),
            bauth: $('#bauth').val(),
            btype: $('#btype').val(),
            bdesc: $('#bdesc').val()
        };
        
        let url = '/api/addBook';
        if (formData.bid !== '') {
            url = '/api/updateBook';
        }
        
        // 发送请求
        $.ajax({
            url,
            method: 'post',
            dataType: 'json',
            data: formData,
            success(res) {
                if (res.code === 1) {
                    //回到首页
                    window.location.href = '/';
                }
                alert(res.message);
            }
        });
    }
}

// 浏览器不支持模块化，需要处理
// 1. babel 处理, 加载add-bundle.js
// 2. system.js 加载
export default Save;