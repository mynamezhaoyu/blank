import App from './App.vue';
import router from './router';
import http from './api/index';
import './assets/css/iconfont.css';

Vue.config.productionTip = false; // 阻止显示生产模式消息
Vue.prototype.$post = http.post;
Vue.prototype.$get = http.get;
Vue.prototype.$bus = new Vue();
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | 业务王`;
	// const role = localStorage.getItem('ms_username');
	// if (!role && to.path !== '/login') {
	//     next('/login');
	// } else if (to.meta.permission) {
	//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
	//     role === 'admin' ? next() : next('/403');
	// } else {
	//   next();
	// }
	next();
});

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app');
