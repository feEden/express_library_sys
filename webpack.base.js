// 合并配置文件
const merge = require('webpack-merge');
// 解析自定义参数
const argv = require('yargs-parser');
//根据传入的参数获取当前执行环境，加载相应的配置文件
const mode = argv(process.argv.slice(2)).env || 'development';
// 根据环境加载不同的配置文件
const config = require(`./config/webpack.${mode}.js`);
//glob 使用正则匹配文件
const glob = require("glob");
//拷贝入口文件相对应的html到指定位置
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 每次编译先删除dist文件夹下的打包文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//自定义插件
const HtmlAfterWebpackPlugin = require("./config/HtmlAfterWebpackPlugin");

const { join, resolve } = require('path');

//载入所有入口文件 
const entryFiles = glob.sync("./src/web/views/**/*.entry.js");

let _entry = {};
let _plugins = [];

/**
 * 遍历拿到的入口文件，配置_entry, 以及_plugins,将views下的pages
 * 通过html-webpack-plugin拷贝到指定文件夹，并注入相应的静态文件
 */
for (const entryFile of entryFiles) {
    // 正则匹配（分组）入口文件，区分views文件夹下哪个页面
    if ((/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js)$/g).test(entryFile) === true) {
        const filePrefix = RegExp.$1;
        // 解析每个入口文件 module 所属模块 page 页面名称
        const [module, page] = filePrefix.split("-");

        //配置入口文件
        _entry[filePrefix] = entryFile;

        // 拷贝入口文件匹配的html到指定位置
        _plugins.push(new HtmlWebpackPlugin({
            // 拷贝后的文件名 全路径 ../是相对于 output下的path路径
            filename: `../views/${module}/pages/${page}.html`,
            // 指定当前拷贝的html所需的静态资源以及加载顺序
            chunks:["runtime", filePrefix],
            // 拷贝的文件
            template: `./src/web/views/${module}/pages/${page}.html`,
            // 不往html中注入js
            inject: false
        }));
    }
}

//基础配置
const baseConfig = {
    entry: _entry,
    output: {
        //打包后输出到哪去
        path: join(__dirname, "./dist/assets/"),
        // 打包后的文件名 
        //[hash:5] 每次打包，将在资源文件后面跟一个hash码，不过是更新整个项目的，有的时候只修改了某一个文件，修改所有没必要
        //[chunkhash]: 只修改修改的资源以及跟该资源相关的文件的hash码
        filename: "scripts/[name].bundle.js"
    },
    resolve: {
        alias: {
            "@": resolve("./src/web/components/")
        }
    },
    // 优化
    optimization: {
        //将webpack打包资源的公用部分提取到单独的文件夹
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        ..._plugins,
        new HtmlAfterWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
};

module.exports = merge(baseConfig, config);