<template>
	<div class="pub">

		<div class="header">
			<span>首页</span>
		</div>
		<!--<div class="notice">
			<div class="icon"></div>
			<marquee>【警告】您的孩子王子杰于09-18 16:29走出围栏1</marquee>
		</div>-->

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
			</div>
			<div class="bottom-app">
				<div class="item" v-for="item in c_apps" :key="item.name" @click="goToPage(item.to)">
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.name}}</span>
					<div class="bj" v-if="item.to === '通知' && counts.notice !== 0">
						{{counts.notice}}
					</div>
				</div>
			</div>
		</div>

		<div style="height: 10px;background: #f0f0f0;"></div>

		<div class="app-item" style="padding-bottom: 0;padding: 5px 0;">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<img src="../../assets/img/zuoyeic.png" style="width: 18px;height: 18px;" />
					<span>今日作业</span>

				</div>
				<div class="more">
					<span @click="goToPage('homework')">更多>></span>
				</div>
			</div>
			<div class="bottom-app">
				<div class="message-item" v-for="item in messages" :key="item.message">
					<div class="i" v-if="item.is"></div>
					<span class="p van-ellipsis">{{item.message}}</span>
					<div class="time">{{item.time}}</div>
				</div>
			</div>
		</div>
		<div style="height: 10px;background: #f0f0f0;"></div>
		<div class="app-item" style="padding-bottom: 0;padding: 5px 0;">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<img src="../../assets/img/lsdp.png" style="width: 16px;height: 17px;" />
					<span>今日点评</span>

				</div>
				<div class="more">
					<span @click="goToPage('comment')">详情>></span>
				</div>
			</div>
			<div class="bottom-app">
				<div class="message-item" v-for="item in tasks" :key="item.message">
					<div class="i1" :class="item.is ? 'i1Y' : 'i1N'"></div>
					<div class="van-ellipsis" :class="item.is ? 'pY' : 'pN'">{{item.message}}</div>
					<div class="goCmt">{{item.name}}</div>
				</div>
			</div>
		</div>
		<div style="height: 10px;background: #f0f0f0;"></div>
		<div class="app-item" style="padding-bottom: 0;padding: 5px 0;">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<img src="../../assets/img/muzhi.png" style="width: 15px;height: 15.5px;" />
					<span>表扬榜</span>

				</div>
				<div class="more">
				</div>
			</div>
			<div class="bottom-app">
				<div style="width: 100%;">
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item, index) in list" :key="index">
							<div class="swiper-item">
								<div class="bg">
									<img :src="item.cardBackUrl" />
									<div class="tou"><img :src="item.src" v-if="item.src" /></div>
									<div class="name">{{item.stuName}}</div>
									<div class="cap">{{item.cardName}}</div>
								</div>
								<div class="pOrTime">
									<span>{{item.teacherName}}</span>
									<span>{{item.inputTime}}</span>
								</div>
							</div>
						</swiper-slide>
					</swiper>

				</div>
			</div>
		</div>

		<!--<div style="height: 10px;background: #f0f0f0;"></div>-->

		<div style="height: 48px;"></div>

		<my-tabbar :active="active">
		</my-tabbar>

	</div>
</template>

<script>
	import praiseApi from '../../assets/api/parents/praise.js'
	import indexApi from '../../assets/api/parents/index.js'
	import myTabbar from '@/components/myTabbarParents'
	import 'swiper/dist/css/swiper.css'

	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	export default {
		data() {
			return {
				sign: { // 未读标记
					message: 6
				},
				counts: { // 计次集合
					notice: 0
				},
				active: 0,
				a: {
					name: '赖萌萌',
					teacher: '小于老师',
					time: '2018-12-24',
					id: 1,
					bgSrc: require('../../assets/images/second/xxzx.png')
				},
				images: [
					require("../../assets/images/first/banner.png")
				],
				apps: [{
						name: '通知',
						to: '通知',
						icon: require("../../assets/img/tz.png")
					},
					{
						name: '作业',
						to: 'homework',
						icon: require("../../assets/img/zy.png")
					},
					{
						name: '点评',
						to: 'comment',
						icon: require("../../assets/img/dp.png")
					},
					{
						name: '菜谱',
						to: '菜谱',
						icon: require("../../assets/img/cp.png")
					}
				],
				list: [],
				messages: [/* {
						is: true,
						message: '赖萌萌发来请假申请 ',
						to: '通知公告详情',
						time: '3分钟前'
					},
					{
						is: true,
						message: '学校发布了《元旦放假通知》！ ',
						to: '通知公告详情',
						time: '5分钟前'
					},
					{
						is: false,
						to: '通知公告详情',
						message: '今天还有3名同学没签到哦！ ',
						time: '15分钟前'
					} */

				],
				tasks: [/* {
						is: true,
						message: '上课积极发言 ',
						name: '由张鸣老师点评'
					},
					{
						is: false,
						message: '课堂纪律差 ',
						name: '由李志杰老师点评'
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
				],
				/* 直接在slide 加上 缩放.9 active-slide 缩放1 */
				swiperOption: {
					spaceBetween: -10, // silde 之间的间距   -10 是左右显示出来
					loop: false,
					slidesPerView: 1.1, // 显示1.1个silde
					centeredSlides: true // active slide 居中
				}
			}
		},
		components: {
			'my-tabbar': myTabbar,
			swiper,
			swiperSlide
		},
		created() {
			this.getSwiperPraise()
			this.getNotice()
		},
		mounted() {},
		methods: {
			getSwiperPraise() {
				let par = {
					date: '',
					pageSize: 6,
					pageNumber: 1
				}
				this.$http.rq({
					url: praiseApi.praises,
					data: par
				}).then(res => {
					if (res.code === 200) {
						this.list = res.data.row
					} else {
						this.list = []
					}
				})
			},
			getNotice(){
				this.$http.rq({
					url: indexApi.noReadCount
				}).then(res => {
					if(res.code === 200){
						this.counts.notice = res.data
					}else{
						
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
			height: 150px;
			display: block;
		}

		.notice {
			height: 30px;
			background-image: linear-gradient(90deg, #419dec 0%, rgba(1, 173, 254, 0.5) 100%), linear-gradient(#ffffff, #ffffff);
			background-blend-mode: normal, normal;
			display: flex;
			align-items: center;
			padding-left: 15px;

			.icon {
				width: 10px;
				height: 10px;
				background: url(../../assets/img/weibiaoti2.png) no-repeat;
				background-size: 100% 100%;
				margin-right: 6px;
			}

			marquee {
				flex: 1;
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				letter-spacing: 2px;
				color: #ffffff;
			}
		}

		.app-item {
			padding-bottom: 10px;
			box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
			background-color: #FFFFFF;

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
					padding-right: 15px;

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
					position: relative;

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

					.pY {
						height: 18px;
						background-color: #4dc939;
						border-radius: 9px;
						opacity: 0.75;
						font-size: 12px;
						color: #FFFFFF;
						padding: 0px 8px;
						margin-left: 10px;
						display: flex;
						align-items: center;
					}

					.pN {
						font-size: 12px;
						color: #FFFFFF;
						height: 18px;
						background-color: #de2b2b;
						padding: 0px 8px;
						border-radius: 9px;
						opacity: 0.75;
						margin-left: 10px;
						display: flex;
						align-items: center;
					}

					.time {
						width: 60px;
						margin-right: 12px;
						font-size: 12px;
						color: #b2b4bf;
						text-align: right;
					}

					.goCmt {
						flex: 1;
						border-radius: 2px;
						font-size: 12px;
						color: #b2b4bf;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						padding-right: 15px;
						cursor: pointer;
					}

					.i1 {
						display: inline-block;
						width: 18px;
						height: 18px;
					}

					.i1Y {
						background: url(../../assets/img/kaixin.png) no-repeat;
						background-size: 100% 100%;
					}

					.i1N {
						background: url(../../assets/img/nanguo.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		}

		.bj {
			width: 15px;
			height: 15px;
			background-color: #f95151;
			border-radius: 50%;
			font-size: 12px;
			color: #ffffff;
			text-align: center;
			line-height: 15px;
			position: absolute;
			right: 6px;
			top: 2px;
		}
	}

	.swiper-item {
		margin: 15px auto;
		width: 340px;
		height: 170px;
		border-radius: 10px;
		box-shadow: 0px 6px 13px 1px rgba(107, 107, 107, 0.2);
		border-radius: 10px;
		position: relative;
		.bg {
			width: 100%;
			height: 120px;
			border-radius: 10px 10px 10px 10px;
			
			&>img {
				display: inline-block;
				max-width: 100%;
				max-height: 100%;
				
			}
			
			.tou {
				position: absolute;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				position: absolute;
				top: 18px;
				left: 28px;
			
				&>img {
					width: 100%;
					height: 100%;
					display: block;
					border-radius: 50%;
				}
			}
			
			.name {
				font-size: 18px;
				letter-spacing: 1px;
				color: #ffffff;
				position: absolute;
				top: 34px;
				left: 82.5px;
			}
			
			.cap {
				font-size: 27px;
				letter-spacing: 1px;
				color: #ffffff;
				position: absolute;
				top: 70px;
				left: 30px;
			}
		}

		.pOrTime {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 21px;
			padding-right: 16px;

			&>span:nth-child(1) {
				height: 14px;
				font-size: 15px;
				line-height: 20px;
				letter-spacing: 2px;
				color: #434964;
			}

			&>span:nth-child(2) {
				height: 10px;
				font-size: 12px;
				line-height: 20px;
				letter-spacing: 1px;
				color: #b2b4bf;
			}
		}
	}

	.swiper-slide {
		transform: scale(.9);
		transition: all .5s;
	}

	.swiper-slide-active {
		transform: scale(1);
		transition: all .5s;
	}
</style>
