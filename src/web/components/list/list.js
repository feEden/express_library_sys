// 给删除按钮绑定事件
const list = {
    deleteBook(){
        $('.btn-delete').on('click', function () {
            const bid = $(this).attr('id');
        
            if (confirm("是否删除该图书?")) {
                $.ajax({
                    url: '/api/deleteBookByBid/' + bid,
                    method: 'delete',
                    dataType: 'json',
                    success(res) {
                        if (res.code === 1) {
                            window.location.href = "/";
                        }
                        alert(res.message);
                    }
                });
            }
        
            return;
        });
    }
}

export default list;
