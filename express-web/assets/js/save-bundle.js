"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Save;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      /**
       * 增加或修改图书
       */
      Save =
      /*#__PURE__*/
      function () {
        function Save() {
          _classCallCheck(this, Save);
        }

        _createClass(Save, [{
          key: "saveBook",
          value: function saveBook() {
            var _this = this;

            // 保存/新增图书 做节流
            $('.btn-save').on('click', Util.throttle(function () {
              _this.saveBookHandler();
            }, 1000));
          }
        }, {
          key: "saveBookHandler",
          value: function saveBookHandler() {
            var formData = {
              bid: $('#bid').val() ? $('#bid').val() : '',
              bname: $('#bname').val(),
              bprice: $('#bprice').val(),
              bauth: $('#bauth').val(),
              btype: $('#btype').val(),
              bdesc: $('#bdesc').val()
            };
            var url = '/api/addBook';

            if (formData.bid !== '') {
              url = '/api/updateBook';
            } // 发送请求


            $.ajax({
              url: url,
              method: 'post',
              dataType: 'json',
              data: formData,
              success: function success(res) {
                if (res.code === 1) {
                  //回到首页
                  window.location.href = '/';
                }

                alert(res.message);
              }
            });
          }
        }]);

        return Save;
      }(); // 浏览器不支持模块化，需要处理
      // 1. babel 处理, 加载add-bundle.js
      // 2. system.js 加载


      _export("default", Save);
    }
  };
});
