import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		{
			path: '/',
			component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
			meta: { title: '自述文件' },
			children: [
				{
					path: '/index',
					component: () => import(/* webpackChunkName: "dashboard" */ '../page/Index/Index.vue'),
					meta: { title: '首页' }
				},
				{
					path: '/supplier',
					component: () => import(/* webpackChunkName: "dashboard" */ '../page/Supplier/Supplier.vue'),
					meta: { title: '供应商管理' }
				},
				{
					path: '/product',
					component: () => import(/* webpackChunkName: "dashboard" */ '../page/Product/Product.vue'),
					meta: { title: '货品管理' }
				},
				{
					path: '/customer',
					component: () => import(/* webpackChunkName: "dashboard" */ '../page/Customer/Customer.vue'),
					meta: { title: '客户管理' }
				},
				{
					path: '/404',
					component: () => import(/* webpackChunkName: "404" */ '../page/404.vue'),
					meta: { title: '404' }
				}
			]
		},
		{
			path: '/login',
			component: () => import(/* webpackChunkName: "login" */ '../page/Login/Login.vue')
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
});
