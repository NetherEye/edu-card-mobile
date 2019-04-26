import Vue from 'vue'
import Vuex from 'vuex'

import { $http } from './assets/tools/http'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: null,
		pageData: [] // 所有页面数据集合 元素：object object.name // 标识是哪个页面
	},
	mutations: {
		setUserInfo(state, data) {
			state.userInfo = data
		},
		setPageData(state, data){
			for (let i = 0; i < state.pageData.length; i++) {
				if(state.pageData[i].name === data.name){
					state.pageData[i] = data
					return
				}
			}
			state.pageData.push(data)
		}
	},
	actions: {
		isLogin(ctx) {
			return new Promise((resolve, reject) => {
//				$http.rq({
//					url: '/proxy/api/isLogin'
//				}).then(res => {
//					console.log(res)
//					if(res.code === 200) {
//						ctx.commit('setUserInfo', res.data)
//						resolve()
//					}
//				})
				setTimeout(() => {
					ctx.commit('setUserInfo', {role: '教师'})
					resolve()
				}, 100)
			})

		}
	}
})