<template>
	<div class="pub">

		<div class="header">
			<span>教学</span>
			<div class="swtClass" @click="show = true"><span>{{className.studyPhase + className.gradeName + className.className}}</span><i></i></div>
		</div>

		<div style="height: 10px;background: #f0f0f0;"></div>

		<div class="app-item" v-if="isTeacher">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>班主任助手</span>

				</div>
			</div>
			<div class="bottom-app">
				<div class="item" v-for="item in c_apps" :key="item.name" @click="goToPage(item.to)">
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>

		<div style="height: 10px;background: #f0f0f0;" v-if="isTeacher"></div>

		<div class="app-item">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>教学助手</span>

				</div>
			</div>
			<div class="bottom-app">
				<div class="item" v-for="item in c_apps1" :key="item.name" @click="goToPage(item.to)">
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<div style="height: 10px;background: #f0f0f0;"></div>

		<div style="height: 48px;"></div>

		<my-tabbar :active="active">
		</my-tabbar>

		<van-actionsheet v-model="show" :actions="actions" @select="onSelect" cancel-text="取消" />

	</div>
</template>

<script>
	import myTabbar from '@/components/myTabbar'
	import commonApi from '../../assets/api/common.js'
	export default {
		data() {
			return {
				active: 1,
				className: {},
				show: false,
				userInfo: '',
				actions: [

				],
				isTeacher: false, // 是否班主任 默认不是该班班主任
				apps: [{
						name: '班级考勤',
						to: '班级考勤',
						icon: require("../../assets/images/first/bjkq.png")
					},
					{
						name: '请假审批',
						to: '教师请假审批',
						icon: require("../../assets/images/first/qjsp.png")
					},
					{
						name: '班级值日',
						to: '班级值日',
						icon: require("../../assets/images/first/zr1.png")
					},
					{
						name: '调查问卷',
						to: 'parentquestion',
						icon: require("../../assets/images/first/wjdc.png")
					},
					{
						name: '班级通讯',
						to: '班级通讯录',
						icon: require("../../assets/images/first/bjtx.png")
					},
					{
						name: '表扬榜',
						to: '教师表扬榜',
						icon: require("../../assets/images/first/byb.png")
					},
					{
						name: '班级课表',
						to: '班级课表',
						icon: require("../../assets/images/first/bjkb.png")
					},
					{
						name: '班级成绩',
						to: '班级成绩',
						icon: require("../../assets/images/first/bjcj.png")
					},
					{
						name: '班级圈',
						to: 'classcircle',
						icon: require("../../assets/images/first/bjq.png")
					},

				],
				apps1: [{
						name: '成绩',
						to: '成绩',
						icon: require("../../assets/images/first/cj.png")
					},
					{
						name: '点评',
						to: 'comment',
						icon: require("../../assets/images/first/dp.png")
					},
					{
						name: '打卡',
						to: 'punchclock',
						icon: require("../../assets/images/first/dk.png")
					},
					{
						name: '作业',
						to: 'homework',
						icon: require("../../assets/images/first/zy.png")
					}
				]

			}
		},
		created() {
			if(sessionStorage.getItem('userInfo')) {
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			}
			// 获取存入本地的选中班级
			if(sessionStorage.getItem('class')) {
				this.className = JSON.parse(sessionStorage.getItem('class'))
				this.getTeacher(this.className.classId)
				
			}

			this.getClass()
		},
		methods: {
			onSelect(item) {
				// 点击选项时默认不会关闭菜单，可以手动关闭
				this.show = false;
				sessionStorage.setItem('class', JSON.stringify(item))
				this.className = JSON.parse(sessionStorage.getItem('class'))
				this.getTeacher(item.classId)
			},
			getTeacher(id) {
				this.$http.rq({
					url: '/proxy/basic/judge/master',
					data: {
						classId: id
					}
				}).then(res => {
					if(res.code === 200) {
						this.isTeacher = true
					} else {
						this.isTeacher = false
					}
				})
			},
			getClass() {
				this.$http.rq({
					url: commonApi.getClassByTeacher
				}).then(res => {
					if(res.code === 200) {
						res.data.forEach(a => {
							a.name = a.studyPhase + a.gradeName + a.className
						})
						this.actions = res.data

						if(Object.keys(this.className).length === 0) { // 如果className === '' 默认取第一个
							this.className = res.data[0]
						}
					} else {
						this.actions = []
						this.$toast(res.message)
					}
				})
			},
			goToPage(to){
				let arr = ['comment', 'homework', 'parentquestion', 'punchclock', 'growthdata', 'classcircle'];
				if(arr.indexOf(to) !== -1){
					let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
					var par;
					if(userInfo.role === '家长'){
						par = {
							source: JSON.stringify({
								to: to,
								back: window.location.href
							})
						}
					}else{
						par = {
							source: JSON.stringify({
								to: to,
								back: window.location.href,
								classId: JSON.parse(sessionStorage.getItem('class')).classId
							})
						}
					}
					this.$http.rq({
						url: '/proxy/dock/encrypt',
						data: par
					}).then(res => {
						if(res.code === 200){
							window.location.href = res.data
						}else{
							
						}
						
					})
				}else{
					this.$router.push({name: to})
				}
			}
		},
		components: {
			'my-tabbar': myTabbar
		},
		computed: {
			c_apps() {
				let arr = []
				if((this.apps.length % 4) != 0) {
					arr = this.apps;
					for(let i = 1, len = 4 - (this.apps.length % 4); i <= len; i++) {
						arr.push({})
					}
				} else {
					arr = this.apps
				}
				return arr
			},
			c_apps1() {
				let arr = []
				if((this.apps1.length % 4) != 0) {
					arr = this.apps1;
					for(let i = 1, len = 4 - (this.apps1.length % 4); i <= len; i++) {
						arr.push({})
					}
				} else {
					arr = this.apps1
				}
				return arr
			}
		}

	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background: #f0f0f0;
		.header {
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff;
			position: relative;
			&>span {
				font-size: 18px;
				letter-spacing: 2px;
				color: #434964;
				font-weight: bold;
			}
			.swtClass {
				position: absolute;
				right: 12px;
				font-size: 15px;
				font-weight: bold;
				color: #434964;
				display: flex;
				align-items: center;
				&>span {
					height: 15px;
					line-height: 20px;
				}
				&>i {
					display: inline-block;
					width: 9px;
					height: 6px;
					background: url(../../assets/images/second/xl.png) no-repeat;
					background-size: 100% 100%;
					margin-left: 5px;
					margin-top: 4px;
				}
				.slectI {
					display: inline-block;
					width: 9px;
					height: 6px;
					background: url(../../assets/images/second/sl.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.banner-img {
			width: 100%;
			height: 150px;
			display: block;
		}
		.app-item {
			padding-bottom: 10px;
			background-color: #ffffff;
			box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
			.top-header {
				height: 45px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				/*border-bottom: .5px solid #d7d7d7;*/
				.left {
					display: flex;
					align-items: center;
					span {
						color: #434964;
						font-size: 15px;
						letter-spacing: 1px;
						margin-left: 11px;
					}
				}
				.right {
					width: 60.5px;
					height: 25.5px;
					background-color: #429ef4;
					border-top-left-radius: 26px;
					border-bottom-left-radius: 26px;
					display: flex;
					align-items: center;
					justify-content: center;
					.edit {
						display: flex;
						align-items: center;
						justify-content: center;
						span {
							font-size: 12px;
							color: #ffffff;
						}
					}
				}
				.more {
					display: flex;
					align-items: center;
					padding-left: 6px;
					span:nth-child(1) {
						font-size: 12px;
						color: #434964;
					}
				}
			}
			.bottom-app {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					margin: 10px 12px 0px 12px;
					img {
						width: 65px;
						height: 65px;
					}
					span {
						font-size: 13px;
						color: #6a708a;
					}
				}
				.message-item {
					padding-left: 12px;
					width: 100%;
					display: flex;
					align-items: center;
					margin: 10px 0;
					.i {
						width: 5px;
						height: 5px;
						background-color: #e34000;
						border-radius: 50%;
						margin-right: 3px;
					}
					.p {
						font-size: 12px;
						color: #6a708a;
						flex: 1;
					}
					.time {
						width: 60px;
						margin-right: 12px;
						font-size: 12px;
						color: #b2b4bf;
						text-align: right;
					}
					.goCmt {
						width: 55px;
						height: 25px;
						background-image: linear-gradient(-45deg, #0d90e9 0%, #27a8ff 100%);
						border-radius: 2px;
						font-size: 12px;
						color: #ffffff;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-right: 11px;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>

<style>
	.van-tabbar-item {
		color: #8a8c9a;
	}
	
	.van-tabbar-item--active {
		color: #0284dc;
	}
</style>