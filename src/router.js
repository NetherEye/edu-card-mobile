import Vue from 'vue'
import Router from 'vue-router'

import login from './components/login.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: '登录',
			component: login
		},
		{
			path: '/teacher-home',
			name: '教师首页',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/home/index.vue')
		},
		{
			path: '/my-app',
			name: '编辑应用',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/home/myApp.vue')
		},
		{
			path: '/notice',
			name: '通知公告',
			meta: {
				role: ['教师']
			},
			component: () => import('./views/home/notice.vue')
		},
		{
			path: '/notice-detail/:id',
			name: '通知公告详情',
			meta: {
				role: ['教师']
			},
			component: () => import('./views/home/noticeDetail.vue')
		},
		{
			path: '/teaching',
			name: '教学',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/index.vue')
		},
		{
			path: '/class-attendance',
			name: '班级考勤',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/classAttendance.vue')
		},
		{
			path: '/teacher-leave',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/leave/index.vue'),
			children: [{
					path: 'list',
					name: '教师请假审批',
					meta: {
						role: ['教师']
					},
					component: () =>
						import('./views/teaching/leave/list.vue')
				},
				{
					path: 'reject/:id',
					name: '教师请假审批驳回',
					meta: {
						role: ['教师']
					},
					component: () =>
						import('./views/teaching/leave/reject.vue')
				}
			]
		},
		{
			path: '/class-duty',
			name: '班级值日',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/classDuty.vue')
		},
		{
			path: '/question',
			name: '调查问卷',
			meta: {
				role: ['教师', '家长']
			},
			component: () =>
				import('./components/question.vue')
		},
		{
			path: '/address-list',
			name: '班级通讯录',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/addressList.vue')
		},
		{
			path: '/teacher-praise-list',
			name: '教师表扬榜',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/praiseList.vue')
		},
		{
			path: '/teacher-praise-mg',
			name: '教师表扬榜管理',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/praiseMg.vue')
		},
		{
			path: '/teacher-praise-add',
			name: '教师表扬榜表扬',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/praiseAdd.vue')
		},
		{
			path: '/teacher-praise-card',
			name: '教师表扬榜表扬卡',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/praiseCard.vue')
		},
		{
			path: '/teacher-praise-edit/:id',
			name: '教师表扬榜表扬卡编辑',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/praiseEdit.vue')
		},
		{
			path: '/time-table',
			name: '班级课表',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/timeTable.vue')
		},
		{
			path: '/class-grade',
			name: '班级成绩',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/classGrade.vue')
		},
		{
			path: '/grade',
			name: '成绩',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/grade.vue')
		},
		{
			path: '/teacher-grade-detail/:id/:gradeRanking/:ranking/:studentName/:semester/:schoolYear/:examType/:totalScore',
			name: '教师成绩详情',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/gradeDetail.vue')
		},
		{
			path: '/teacher-grade',
			name: '教师成绩',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/teaching/grade.vue')
		},
		{
			path: '/remark',
			name: '点评',
			meta: {
				role: ['教师', '家长']
			},
			component: () =>
				import('./components/remark.vue')
		},
		{
			path: '/clock-in',
			name: '打卡',
			meta: {
				role: ['教师', '家长']
			},
			component: () =>
				import('./components/clockIo.vue')
		},
		{
			path: '/home-work',
			name: '作业',
			meta: {
				role: ['教师', '家长']
			},
			component: () =>
				import('./components/homeWork.vue')
		},
		{
			path: '/class-circle',
			name: '班级圈',
			meta: {
				role: ['教师', '家长']
			},
			component: () =>
				import('./components/classCircle.vue')
		},
		{
			path: '/work',
			name: '办公',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/index.vue')
		},
		{
			path: '/use-car',
			name: '用车申请',
			meta: {
				role: ['教师'],
				keepAlive: true
			},
			component: () =>
				import('./views/work/useCar.vue')
		},
		{
			path: '/select',
			component: () =>
				import('./views/work/select/index.vue'),
			children: [{
					path: 'department',
					name: '选择部门',
					meta: {
						role: ['教师']
					},
					component: () =>
						import('./views/work/select/department.vue'),
				},
				{
					path: 'person/:id',
					name: '选择人',
					meta: {
						role: ['教师']
					},
					component: () =>
						import('./views/work/select/person.vue'),
				}
			]
		},
		{
			path: '/use-car-history',
			name: '用车历史',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/useCarHistory.vue')
		},
		{
			path: '/use-car-detail/:id',
			name: '用车历史详情',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/useCarDetail.vue')
		},
		{
			path: '/address',
			name: '通讯录',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/address.vue')
		},
		{
			path: '/equ-repairs',
			name: '设备报修',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/equRepairs.vue')
		},
		{
			path: '/equ-repairs-history',
			name: '设备报修历史',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/equRepairsHistory.vue')
		},
		{
			path: '/equ-repairs-detail/:id',
			name: '设备报修详情',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/equRepairsDetail.vue')
		},
		{
			path: '/shenpi',
			name: '我的审批',
			meta: {
				role: ['教师'],
			},
			component: () =>
				import('./views/work/shenPi.vue')
		},
		{
			path: '/shenping/:id',
			name: '办公进行审批',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/shenPing.vue')
		},
		{
			path: '/site',
			name: '场地预约',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/site.vue')
		},
		{
			path: '/site-history',
			name: '场地预约历史',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/siteHistory.vue')
		},
		{
			path: '/site-mark/:id',
			name: '预约场地',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/work/siteMark.vue')
		},
		{
			path: '/teacher-my',
			name: '教师我的',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/my/index.vue')
		},
		{
			path: '/teacher-person-data',
			name: '教师个人资料',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./views/my/personData.vue')
		},
		{
			path: '/about',
			name: '关于',
			meta: {
				role: ['家长', '教师']
			},
			component: () =>
				import('./components/about.vue')
		},
		{
			path: '/Changing',
			name: '修改',
			meta: {
				role: ['教师']
			},
			component: () =>
				import('./components/Changing.vue')
		},
		{
			path: '/parents-home',
			name: '家长首页',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/home/index.vue')
		},
		{
			path: '/food-menu',
			name: '菜谱',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/home/foodMenu.vue')
		},
		{
			path: '/parents-notice',
			name: '通知',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/home/notice.vue')
		},
		{
			path: '/parents-notice-detail/:id',
			name: '通知详情',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/home/noticeDetail.vue')
		},
		{
			path: '/grow-up',
			name: '成长',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/index.vue')
		},
		{
			path: '/exam',
			name: '考试',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/exam.vue')
		},
		{
			path: '/idart',
			name: '黑板报',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/idart.vue')
		},
		{
			path: '/attendance',
			name: '考勤',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/attendance.vue')
		},
		{
			path: '/parents-leave',
			name: '家长请假',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/leave.vue')
		},
		{
			path: '/parents-leave-detail/:id',
			name: '家长请假详情',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/leaveDetail.vue')
		},
		{
			path: '/grow-data',
			name: '成长数据',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/growData.vue')
		},

		{
			path: '/parents-praise-list',
			name: '家长表扬榜',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/praiseList.vue')
		},
		{
			path: '/parents-grade-detail/:examType',
			name: '家长成绩详情',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/gradeDetail.vue')
		},
		{
			path: '/parents-grade',
			name: '家长成绩',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/growUp/grade.vue')
		},
		{
			path: '/secure',
			name: '安全',
			meta: {
				role: ['家长']
			},
			component: () => import('./views-parents/secure/index.vue')
		},
		{
			path: '/fm-tel',
			name: '亲情号',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/secure/fmTel.vue')
		},
		{
			path: '/set-tel',
			name: '设置SOS号码',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/secure/setTel.vue')
		},
		{
			path: '/add-tel',
			name: '设置亲情号',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/secure/addTel.vue')
		},
		{
			path: '/weilan',
			name: '围栏',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/secure/weilan.vue')
		},
		{
			path: '/weilan-hp',
			name: '围栏操作',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/secure/weilanHp.vue')
		},
		{
			path: '/weilan-edit/:id',
			name: '围栏修改',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/secure/weilanEdit.vue')
		},

		{
			path: '/parents-my',
			name: '家长我的',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/index.vue')
		},
		{
			path: '/parents-person-data',
			name: '家长个人资料',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/personData.vue')
		},

		{
			path: '/help',
			name: '帮助与反馈',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/helpAndFeedBack.vue')
		},
		{
			path: '/pay-detail',
			name: '消费明细',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/payDetail.vue')
		},
		{
			path: '/top-up',
			name: '卡充值',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/topUp.vue')
		},
		{
			path: '/find-pwd',
			name: '找回密码',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/findPwd.vue')
		},
		{
			path: '/update-pwd',
			name: '修改密码',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/updatePwd.vue')
		},
		{
			path: '/app-set',
			name: 'APP设置',
			meta: {
				role: ['家长']
			},
			component: () =>
				import('./views-parents/my/appSet.vue')
		},
		{
			path: '/card-password',
			name: '卡密码',
			meta: {
				role: ['家长', '教师']
			},
			component: () =>
				import('./components/cardPassword.vue')
		},
		{
			path: '/upload-photo',
			name: '头像上传',
			meta: {
				role: ['家长', '教师']
			},
			component: () =>
				import('./components/uploadPhoto.vue')
		},
		{
			path: '/noType',
			name: '无类型用户',
			meta: {},
			component: () =>
				import('./components/noType.vue')
		},
		{
			path: '/otherLogin',
			name: '其他地方登陆',
			meta: {
				role: ['家长', '教师']
			},
			component: () =>
				import('./components/otherLogin.vue')
		},
		{
			path: '*',
			name: '404',
			meta: {
				role: ['家长', '教师']
			},
			component: () =>
				import('./components/404.vue')
		},

	]
})