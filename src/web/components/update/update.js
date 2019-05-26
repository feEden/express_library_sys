// 保存更新图书
class UpdateBook {
    updateBook() {
        // 保存/新增图书 做节流
        $('.btn-update').on('click', Util.throttle(() => {
            this.updateBookHandler();
        }, 1000));
    }
    updateBookHandler() {
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
            url: '/api/updateBook',
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

export default UpdateBook;