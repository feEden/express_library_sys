//import throttle from './util';

$(() => {
    // 给删除按钮绑定事件
    $('.btn-delete').on('click', function() {
        const bid = $(this).attr('id');

        if (confirm("是否删除该图书?")) {
            $.ajax({
                url: '/api/deleteBookByBid/' + bid,
                method: 'delete',
                dataType: 'json',
                success(res) {
                    if (res.code === 1) {
                        window.location.reload();
                    }
                    alert(res.message);
                }
            });
        }

        return;
    });

    // 保存/新增图书
    $('.btn-save').on('click', throttle(saveBook(e), 10));
})

function saveBook(e) {
    // 表单数据
    const formData = {
        bid: $('#bid').val() ? $('#bid').val() : '',
        bname: $('#bname').val(),
        bprice: $('#bprice').val(),
        bauth: $('#bauth').val(),
        btype: $('#btype').val(),
        bdesc: $('#bdesc').text(),
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
    // 阻止默认的表单提交

}