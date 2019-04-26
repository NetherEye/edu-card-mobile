import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/public.css'
import patricommon from './assets/api/common'
import 'amfe-flexible';

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.prototype.$toast.allowMultiple(); // 允许toast存在多个

import FastClick from 'fastclick'; // 300ms 延迟
FastClick.attach(document.body); // 使用 fastclick

import moment from 'moment'
moment.locale('zh-cn'); 
Vue.prototype.$moment = moment

import VueDND from 'awe-dnd'
Vue.use(VueDND)

import {$http, httpStack} from './assets/tools/http'
Vue.prototype.$http = $http

Vue.config.productionTip = false

//拦截，没有登录的时候  退回登录页
router.beforeEach((to, from, next) => {
	if(httpStack.length !== 0){
		httpStack.forEach((a, i) => {
			a.cancelToken.cancel('中断上个路由所有请求' + (i === (httpStack.length-1) ? '并重置集合' : ''))
		})
	}

	if(to.name === '404' || to.name === '无类型用户'){
		next()
		return
	}
	
	$http.rq({
		url: '/proxy/api/isLogin'
	}).then(res => {
		if(res.code === 201){
			window.location.replace(res.data)
		}else if(res.code === 209){
			Vue.prototype.$toast(res.message)
		}else if(res.code === 403){
			next({name: '无类型用户'})
				return
		}else{
			// 查看本地有没有 userInfo
			if(sessionStorage.getItem('userInfo')){
				// 因为这里重新赋值userInfo，以后可以增加res.data返回的数据与本地存的是否一致 
				sessionStorage.setItem('userInfo', JSON.stringify(res.data)) 
				// 权限判断
				if(to.meta.role && (to.meta.role.indexOf(res.data.role) === -1)){
					Vue.prototype.$toast('权限错误！')
					next({name: '404'})
					return
				}
				
			    // 这里可以加 如果存在userInfo还跳转登录的判断 让其跳首页
				if(to.name === '登录'){ // 
					next({name: res.data.role === '教师' ? '教师首页' : '家长首页'})
				}else{
					next()
					
				}
			}else{
				sessionStorage.setItem('userInfo', JSON.stringify(res.data))
				next({name: res.data.role === '教师' ? '教师首页' : '家长首页'})
			}
		}
	})
	
	// 因为教师端需要保存所属班级，所有切换路由是如果没有class 则加上去
	if(to.name != '登录'){
		if(sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).role === '教师'){
			if(sessionStorage.getItem('class')){
				
			}else{
				$http.rq({
					url: '/proxy/basic/teacher/class'
				}).then(res => {
					if(res.code === 200){
						res.data.forEach(a => {
							a.name = a.studyPhase + a.gradeName + a.className
						})
						sessionStorage.setItem('class', JSON.stringify(res.data[0]))
					}
				})
			}
		}
		
		if(sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo')).role === '家长'){
			if(sessionStorage.getItem('child')){
				
			}else{
				$http.rq({
					url: '/proxy/basic/parent/student'
				}).then(res => {
					if(res.code === 200){
						res.data.forEach(a => {
							a.name = a.gradeName + a.className
						})
						sessionStorage.setItem('child', JSON.stringify(res.data[0]))
					}
				})
			}
		}
	}
	
	
	
});


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')