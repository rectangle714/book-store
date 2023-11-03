const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/naver', {
            target: 'https://nid.naver.com/oauth2.0',
            pathRewrite: {
                '^/naver':''
            },
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware(['/api/v1'], {
            target: 'http://localhost:30001',
            changeOrigin: true
        })
    )
}