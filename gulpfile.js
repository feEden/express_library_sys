const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');

// 需要编译的路径
const entry = './src/server/**/*.js';
// 要进行清洗的文件
const clearEntry = './src/server/config/app.config.js';

//脚本编译 开发环境
function buildDev() {
    // 开启的watch,编译一直监听着
    return watch(entry, { ignoreInitial: false }, () => {
        gulp.src(entry)
            .pipe(babel({
                // 不使用外部的.babelrc 配置
                babelrc: false,
                // 将es6 module 编译成require
                plugins: ["@babel/plugin-transform-modules-commonjs"]
            }))
            .pipe(gulp.dest('dist'))
    });
}

//编译脚本 上线
function buildProd() {
    return gulp.src(entry)
        .pipe(babel({
            // 不使用外部的.babelrc 配置
            babelrc: false,
            // 指定不编译的文件
            ignore: [clearEntry],
            /**
             * 将es6 module 编译成require
             * 注意：使用es6的export导出模块，编译后成了exports.default = xxx
             *      所有的模块被挂载在default上。所有导出模块还是有commonJS的好点
             */
            plugins: ["@babel/plugin-transform-modules-commonjs"]
        }))
        .pipe(gulp.dest('dist'))
}

//清洗冗余配置
function buildConfig() {
    return gulp.src(entry)
        .pipe(rollup({
            plugins: [
                replace({
                    // 清除环境下不使用的变量 
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ],
            output: {
                // 输出commonJS格式
                format: 'cjs'
            },
            input: clearEntry
        }))
        .pipe(gulp.dest('dist'))
}

//代码规则校验
function buildHint() {
    return gulp.src([entry])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// 设置不同环境下的执行任务
let build = gulp.series(buildDev);
if (process.env.NODE_ENV === 'production') {
    build = gulp.series(buildProd, buildConfig);
}
if (process.env.NODE_ENV === 'hint') {
    build = gulp.series(buildHint);
}

// 导出任务
gulp.task("default", build);