// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios';
import QS from 'QS';
import $ from 'jquery'
import './assets/dist/js/bootstrap.min'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/dist/css/bootstrap.min.css'


Vue.use($);
Vue.use(ElementUI,{size:'small',zIndex:3000});
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = QS;

// Axios.defaults.baseURL = 'http://localhost:3000/student/';
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
		if(config.method==='post'){
			config.data=QS.stringify(config.data);
		}
		// config.url='http://localhost:3000/student/'+config.url;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
