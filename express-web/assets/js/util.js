// 做节流操作 点击新增按钮 要等到新增成功，在响应下一个请求
const throttle = (fn, delay) => {
    var timer;
    return (...arg) => {
        if (!timer) {
            // 在delay时间后，timer重置
            timer = setTimeout(() => timer = null, delay);
            fn.apply(this, arg);
        }
    }
}

export default throttle;