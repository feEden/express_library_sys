/**
 * 自定义插件，完成以下功能：
 *  1.将html中引入资源的路径修改成正确路径
 *  2.将打包生成的静态文件插入指定的位置
 */
const pluginName = 'HtmlAfterWebpackPlugin';

// 拼接静态资源
const appendAssets = (data) =>{
    const {js, css} = data;

    const jsData = [];
    const cssData = [];

    const appendScript = {
        js: item => `<script class="lazyload-js" src="${item}"></script>`,
        css:item => `<link rel="stylesheet" class="lazyload-css" href="${item}">`
    };
    //拼接js
    for(const jsItem of js){
        jsData.push(appendScript.js(jsItem));
    }
    //拼接js
    for(const cssItem of css){
        jsData.push(appendScript.css(cssItem));
    }
    return {
        js:jsData,
        css:cssData
    }
}
class HtmlAfterWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
            // 将页面中的简写路径修正
            let _html = htmlPluginData.html;
            _html = _html.replace(/pages:/g, "../../");
            _html = _html.replace(/components:/g, "../../../components/");
            // 将静态资源(js,css)插入到指定位置
            const assets = htmlPluginData.assets;
            const assetDatas = appendAssets(assets);
            _html = _html.replace("<!-- injectjs -->", assetDatas.js.join(""));
            _html = _html.replace("<!-- injectcss -->", assetDatas.css.join(""));
            htmlPluginData.html = _html;
        });
    });
  }
}

module.exports = HtmlAfterWebpackPlugin;