import axios from 'axios';
import { Loading, Notification } from 'element-ui';
import router from '../router';
var instance = axios.create({
	baseURL: 'http://localhost:8000',
	timeout: 10000,
	responseType: 'json',
	validateStatus(status) {
		return status === 200;
	}
});
let loading;
// 拦截请求
instance.interceptors.request.use(
	(config) => {
		if (loading) loading.close();
		loading = Loading.service({
			lock: true,
			text: '玩命加载中...',
			background: 'transparent',
			target: '.content-box'
		});
		let token = localStorage.getItem('token');
		if (token) {
			config.headers.token = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		setTimeout(() => {
			loading.close();
		}, 300);
		return response;
	},
	(error) => {
		setTimeout(() => {
			loading.close();
		}, 300);
		let errorMessage = '系统内部异常，请联系网站管理员';
		if (error.response) {
			errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message;
			switch (error.response.status) {
				case 404:
					Notification.error({
						title: '系统提示',
						message: '很抱歉，资源未找到',
						duration: 4000
					});
					break;
				case 403:
				case 401:
					Notification.error({
						title: '系统提示',
						message: errorMessage,
						duration: 4000
					});
					router.push('/login');
					break;
				default:
					Notification.error({
						title: '系统提示',
						message: errorMessage,
						duration: 4000
					});
					break;
			}
		} else {
			Notification.error({
				title: '系统提示',
				message: errorMessage,
				duration: 4000
			});
		}
		return Promise.reject(error);
	}
);
const request = {
	post(url, params = {}) {
		return instance.post(url, params, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	get(url, params) {
		let _params;
		let _paramsarr = [];
		if (Object.is(params, undefined)) {
			_params = '';
		} else {
			for (let key in params) {
				if (params.hasOwnProperty(key) && params[key] !== null) {
					_paramsarr.push(`${key}=${params[key]}`);
				}
			}
			_paramsarr.length === 0 ? (_params = '') : (_params = '?' + _paramsarr.join('&'));
		}
		return instance.get(`${url}${_params}`);
	}
};
export default request;
