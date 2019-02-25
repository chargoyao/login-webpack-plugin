const request = require('request');
const colors = require('colors');

/**
 * options {object} json: 请求接口的对象 url: 接口地址 localStorageKey: 键值默认为loginInfo storageObj: 额外的localStorage对象。
 */
class LoginWebpackPlugin {
  constructor(options) {
    this.options = options;
    if (this.options.localStorageKey === undefined) {
      this.options.localStorageKey = 'loginInfo';
    }
    this.options.storageObj = options.storageObj || {};
    this.obj = {};
  }
  callLoginApi(cb) {
    request({
      url: this.options.url,
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      json: this.options.json,
    }, (err, response, body) => {
      if (err) {
        console.error(colors.red.underline(err));
      }
      this.obj = { ...body.data, ...this.options.storageObj };
      cb();
    });
  }
  apply(compiler) {
    compiler.plugin('before-compile', (compilation, cb) => {
      this.callLoginApi(cb);
    });
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-after-html-processing', (data) => {
        if (process.env.NODE_ENV !== 'production') {
          data.html += `
          <script>
            const a = ${JSON.stringify(this.obj)};
            window.localStorage.setItem(${JSON.stringify(this.options.localStorageKey)}, JSON.stringify(a)); 
          </script>`
        }
      })
    })
    compiler.plugin('done', (compilation) => {
      console.log(colors.green.bold(`\nlogin info:${JSON.stringify(this.obj)}\n`));
    });
  }
}
module.exports = LoginWebpackPlugin;
