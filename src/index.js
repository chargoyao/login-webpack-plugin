const request = require('request');
const colors = require('colors');

class LoginWebpackPlugin {
  constructor(options) {
    this.options = options;
    if (this.options.localStorageKey === undefined) {
      this.options.localStorageKey = 'loginInfo';
    }
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
      this.obj = body.data;
      cb();
    });
  }
  apply(compiler) {
    compiler.plugin('before-compile', (compilation, cb) => {
      this.callLoginApi(cb);
    });
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-after-html-processing', (data) => {
        console.log(colors.green.bold(`\nlogin info:${JSON.stringify(this.obj)}\n`));
        data.html += `
          <script>
            const a = ${JSON.stringify(this.obj)};
            window.localStorage.setItem(${JSON.stringify(this.options.localStorageKey)}, JSON.stringify(a)); 
          </script>`
      })
    })
  }
}
module.exports = LoginWebpackPlugin;
