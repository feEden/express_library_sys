function Util(){}
Util.version = '1.0.0';

// 做节流操作，等到一次响应结束在发送下一次的请求
Util.throttle =  (fn, delay) => {
    var timer;
    return (...arg) => {
        if (!timer) {
            // 在delay时间后，timer重置
            timer = setTimeout(() => timer = null, delay);
            fn.apply(this, arg);
        }
    }
}