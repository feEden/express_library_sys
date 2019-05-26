// 拷贝指定资源到指定位置
const CopyPlugin = require('copy-webpack-plugin');

const { join } = require('path');

// 开发环境所需的特殊配置
module.exports = {
    mode:'development',
    output:{
        // node中配置了静态服务器路径assets
        publicPath:"/"
    },
    plugins:[
        new CopyPlugin([{
            from: join(__dirname, "../", "./src/web/components/"), 
            to: "../components/"
        }],{
            // js和css都被webpack打包啦
            ignore: ['*.js', '*.css'],
            /**
             * 使用watch或webpack-dev-server时，无论修改如何，都会复制文件。 
             * 无论此选项如何，所有文件都在第一次构建时复制。
             */
            copyUnmodified:true
        }),
        new CopyPlugin([{
            from: join(__dirname, "../", "./src/web/views/common/layout.html"),
            to: "../views/common/layout.html"
        }])
    ]
}