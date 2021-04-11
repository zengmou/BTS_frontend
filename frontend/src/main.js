// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import ElementUI from 'element-ui'
//import $ from 'jquery'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min'
import 'element-ui/lib/theme-chalk/index.css'

import moment from 'moment'

Vue.use(ElementUI);
// Vue.use(qs);

//axios 配置
let axios = require('axios');
// Axios挂载到prototype，全局可以使用this.$axios访问
Vue.prototype.$axios = axios;

//axios.defaults.baseURL = '/api';
axios.defaults.baseURL ="http://3.208.65.202:8080";


axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";

Vue.config.productionTip = false;

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // config.withCredentials = true;
//     if(window.localStorage.getItem("token")!=null ) {
//       // 判断是否有token，若存在，每个http header加上token
//       config.headers.Authorization = 'Bearer'+window.localStorage.getItem("token");
//     }
//     else if(router.currentRoute.path === '/login' || router.currentRoute.path === '/register'){

//     }
//     else{
//       window.location.pathname = '/login'
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// );


//http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     console.log(error.response);
//     if(error) {
//       // 清除token 如果不是register/login, 跳转至login
//       store.commit('logout');
//       router.currentRoute.path !== '/login' &&
//       router.currentRoute.path !== '/register' &&
//       router.replace({
//         path: '/login',
//         query: { redirect: router.currentRoute.path }
//       })
//     }
//     return Promise.reject(error.response.data)
//   }
// );



//过滤器转换时间
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
  return moment(input).format(formatString)
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
