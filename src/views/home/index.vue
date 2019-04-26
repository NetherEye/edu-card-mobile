<template>
	<div class="pub">

		<div class="header">
			<span>首页</span>
		</div>

		<van-swipe :autoplay="3000" :height="150">
			<van-swipe-item v-for="(image, index) in images" :key="index">
				<img class="banner-img" :src="image" />
			</van-swipe-item>
		</van-swipe>

		<div class="app-item">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<img src="../../assets/images/first/kjyy.png" style="width: 17px;height: 18px;" />
					<span>快捷应用</span>

				</div>
				<div class="right" @click="$router.push({name: '编辑应用'})">
					<div class="edit">
						<van-icon name="edit" color="#fff" size="23px" /><span>编辑</span></div>
				</div>
			</div>

			<div class="bottom-app">
				<div class="item" v-for="item in c_apps" :key="item.id" @click="goPage(item)">
					<img :src="item.icon" v-if="item.id" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.shortcutName}}</span>
				</div>
			</div>
		</div>

		<div style="height: 10px;background: #f0f0f0;"></div>

		<div class="app-item" style="padding-bottom: 0;padding: 5px 0;">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<img src="../../assets/images/first/tz.png" style="width: 17px;height: 18px;" />
					<span>通知公告</span>

				</div>
				<div class="more">
					<span @click="$router.push({name: '通知公告'})">更多>> &nbsp;</span>
				</div>
			</div>
			<div class="bottom-app">
				<div class="message-item" v-for="item in messages" :key="item.id" @click="$router.push({name: '通知公告详情', params: {id: item.id}})">
					<div class="i" v-if="!item.isRead"></div>
					<div class="p van-ellipsis">{{item.noticeName}}</div>
					<div class="time">{{$moment(item.publishTime, "YYYY-MM-DD hh:mm:ss").fromNow()}}</div>
				</div>
			</div>
		</div>
		<div style="height: 10px;background: #f0f0f0;"></div>
		<div class="app-item" style="padding-bottom: 0;padding: 5px 0;">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<img src="../../assets/images/first/rw.png" style="width: 17px;height: 18px;" />
					<span>今日任务</span>

				</div>
				<div class="more">

				</div>
			</div>
			<div class="bottom-app">
				<div class="message-item" v-for="item in tasks" :key="item.message">
					<div class="p van-ellipsis">{{item.message}}</div>
					<div class="goCmt" @click="goPage({address: '点评'})">去点评</div>
				</div>
			</div>
		</div>

		<div style="height: 10px;background: #f0f0f0;"></div>

		<div style="height: 48px;"></div>

		<my-tabbar :active="active">
		</my-tabbar>

	</div>
</template>

<script>
	import myTabbar from '@/components/myTabbar'
	import indexApi from '../../assets/api/teacher/index.js'

	export default {
		data() {
			return {
				active: 0,
				isTeacher: false, // 是否班主任 默认不是
				images: [
					require("../../assets/images/first/banner.png"),
//					require("../../assets/images/first/banner.png")
				],
				apps: [
				],
				messages: [],
				tasks: [/* {
						is: true,
						message: '今天还没有点评班上的学生哦 '
					},
					{
						is: true,
						message: '今天还没有发布作业哦 '
					} */
				],
				icons: [{
						normal: require("../../assets/images/tabbar/first.png"),
						active: require("../../assets/images/tabbar/1xz.png")
					},
					{
						normal: require("../../assets/images/tabbar/2.png"),
						active: require("../../assets/images/tabbar/2xz.png")
					},
					{
						normal: require("../../assets/images/tabbar/3.png"),
						active: require("../../assets/images/tabbar/3xz.png")
					},
					{
						normal: require("../../assets/images/tabbar/4.png"),
						active: require("../../assets/images/tabbar/4xz.png")
					}
				]
			}
		},
		created() {
			// 获取存入本地的选中班级
			if (sessionStorage.getItem('class')) {
				this.classInfo = JSON.parse(sessionStorage.getItem('class'))
				this.getTeacher(this.classInfo.classId)
			}
			this.getApps()
			this.getNotice()
		},
		components: {
			'my-tabbar': myTabbar
		},
		methods: {
			getApps() {
				this.$http.rq({
					url: indexApi.getApps
				}).then(res => {
					if (res.code === 200) {
						res.data.map(a => {
							a.icon = require(`../../${a.icon}`)
						})
						this.apps = res.data
					} else {
						this.$toast(res.message)
					}
				})
			},
			getTeacher(id) {
				this.$http.rq({
					url: '/proxy/basic/judge/master',
					data: {
						classId: id
					}
				}).then(res => {
					if (res.code === 200) {
						this.isTeacher = true
					} else {
						this.isTeacher = false
					}
				})
			},
			getNotice() {
				this.$http.rq({
					url: indexApi.notice,
					data: {
						pageSize: 3,
						pageNumber: 1
					}
				}).then(res => {
					if (res.code === 200) {
						this.messages = res.data
					} else {
						this.messages = []
					}
				})
			},
			goPage(item) {
				if (!this.isTeacher && item.master) {
					this.$toast('不是班主任');
					return
				}
				
				let arr = ['comment', 'homework', 'parentquestion', 'punchclock', 'growthdata', 'classcircle'],
					arr1 = ['点评', '作业', '调查问卷', '打卡', '成长数据', '班级圈'];
				if(arr1.indexOf(item.address) !== -1){
					let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
					var par;
					if(userInfo.role === '家长'){
						par = {
							source: JSON.stringify({
								to: arr[arr1.indexOf(item.address)],
								back: window.location.href
							})
						}
					}else{
						par = {
							source: JSON.stringify({
								to: arr[arr1.indexOf(item.address)],
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
					this.$router.push({
						name: item.address
					})
				}
				
				
			}
		},
		computed: {
			c_apps() {
				let arr = []
				if ((this.apps.length % 4) != 0) {
					arr = this.apps;
					for (let i = 1, len = 4 - (this.apps.length % 4); i <= len; i++) {
						arr.push({})
					}
				} else {
					arr = this.apps
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
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff;

			span {
				font-size: 18px;
				letter-spacing: 2px;
				color: #434964;
				font-weight: bold;
			}
		}

		.banner-img {
			width: 100%;
			height: 100%;
			display: block;
		}

		.app-item {
			padding-bottom: 10px;
			box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
			background-color: #ffffff;

			.top-header {
				height: 45px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					img {
						margin: 0 4.5px 2px 12.5px;
					}

					span {
						color: #434964;
						font-size: 15px;
						letter-spacing: 1px;
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
						user-select: none;
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
						width: 80px;
						margin-right: 12px;
						font-size: 12px;
						color: #b2b4bf;
						text-align: right;
						letter-spacing: 0;
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
