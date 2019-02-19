<h1 style="text-align: center;">Login Webpack Plugin</h1>

This plugin fully depends on [html-webpack-Plugin](https://github.com/jantimon/html-webpack-plugin)

<h2>Description</h2>
store remote data in localStorage.

<h2 align="center">Install</h2>

```
  npm install --save-dev login-webpack-plugin
```

<h2 align="center">Usage</h2>

```
const LoginWebpackPlugin = require('login-webpack-plugin');
module.exports = {
  plugins: [
    new LoginWebpackPlugin({
      url: 'wwww.example.com/api',
      json: {
        password: '123',
        userName: 'user',
      }
    })
  ]
}
```
<h2 algin="center">Options</h2> <br/>

| Name|Type|Default|Description|
| ------------ | :-----------: | -----: | -----: |
| url    | String | None |   path     |
| json   |  Object   | None |  sets body to JSON representation of value      |
| localStorage |   String    | 'loginInfo' |  localStorage key      |
