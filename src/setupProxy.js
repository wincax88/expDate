const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    '/idecompiler',
    createProxyMiddleware({
      target: 'http://www.wincax.com',
      changeOrigin: true,
    })
  )
}
