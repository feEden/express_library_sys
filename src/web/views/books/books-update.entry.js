// 更新/新增图书页面入口文件
import UpdateBook from "@/update/update.js";
import list from "@/list/list.js";

const update = new UpdateBook();

// 修改图书
update.updateBook();
list.deleteBook();