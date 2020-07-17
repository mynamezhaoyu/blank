module.exports = {
	lintOnSave: process.env.NODE_ENV !== 'production',
	publicPath: './',
	assetsDir: 'static',
	productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
	parallel: true, // 多核编译，加快编译、打包速度
	configureWebpack: (config) => {
		config['externals'] = {
			vue: 'Vue',
			vuex: 'Vuex',
			axios: 'axios',
			'vue-router': 'VueRouter',
			'element-ui': 'ELEMENT'
		};
	},
	devServer: {
	  port: '8888',
	  open: true
	}
};
