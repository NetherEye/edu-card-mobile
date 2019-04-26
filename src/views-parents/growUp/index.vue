<template>
	<div class="pub">
		
		<div class="header">
			<span>成长</span>
		</div>
		
		<div class="notice" v-if="notice.length != 0">
			<div class="icon"></div>
			<marquee>{{Cnotice}}</marquee>
		</div>
		<div class="app-item">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>学习助手</span>
					
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
		
		<div style="height: 10px;background: #f0f0f0;"></div>
		
		<div class="app-item">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>表现</span>
					
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
		
		<div class="app-item">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>其他</span>
					
				</div>
			</div>
			<div class="bottom-app">
				<div class="item" v-for="item in c_apps2" :key="item.name" @click="goToPage(item.to)">
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
		
		<van-actionsheet
		  v-model="show"
		  :actions="actions"
		  @select="onSelect"
		  cancel-text="取消"
		/>

	</div>
</template>

<script>
	import myTabbar from '@/components/myTabbarParents'
	import indexApi from '@/assets/api/parents/index.js'
	export default {
		data() {
			return {
				active: 1,
				className: '一年级一班',
				show: false,
				actions: [
					{
						name: '一年级一班',
					},
					{
						name: '一年级二班',
					},
					{
						name: '三年级一班',
					},
					{
						name: '五年级一班',
					},
					{
						name: '六年级一班',
					}
				],
				apps: [
					{
						name: '成绩',
						to: '家长成绩',
						icon: require("../../assets/img/cj.png")
					},
					{
						name: '作业',
						to: 'homework',
						icon: require("../../assets/img/zys.png")
					},
					{
						name: '考试',
						to: '考试',
						icon: require("../../assets/img/ks.png")
					},
					{
						name: '打卡',
						to: 'punchclock',
						icon: require("../../assets/img/dk.png")
					},
					{
						name: '黑板报',
						to: '黑板报',
						icon: require("../../assets/img/hbb.png")
					}
					
					
				],
				apps1: [
					{
						name: '表扬榜',
						to: '家长表扬榜',
						icon: require("../../assets/img/byb.png")
					},
					{
						name: '点评',
						to: 'comment',
						icon: require("../../assets/img/dp1.png")
					},
					{
						name: '考勤',
						to: '考勤',
						icon: require("../../assets/img/kq.png")
					},
					{
						name: '请假',
						to: '家长请假',
						icon: require("../../assets/img/qj.png")
					},
					
					
				],
				apps2: [
					{
						name: '家长问卷',
						to: 'parentquestion',
						icon: require("../../assets/img/jzwj.png")
					},
					{
						name: '成长数据',
						to: 'growthdata',
						icon: require("../../assets/img/czsj.png")
					},
					{
						name: '班级圈',
						to: 'classcircle',
						icon: require("../../assets/img/bjq.png")
					},
					
				],
				
				notice: []
			}
		},
		created(){
			this.getNotice()
		},
		methods: {
			// 获取滚动通知
			getNotice(){
				this.$http.rq({
					url: indexApi.notice,
					data: {
						type: 1
					}
				}).then(res => {
					if(res.code === 200){
						this.notice = res.data
					}else{
						this.notice = []
					}
				})
			},
			onSelect(item) {
			      // 点击选项时默认不会关闭菜单，可以手动关闭
			      this.show = false;
			      this.className = item.name;
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
			c_apps(){
				let arr = []
				if((this.apps.length % 4) != 0){
					arr = this.apps;
					for (let i = 1, len = 4 - (this.apps.length % 4); i <= len; i++) {
						arr.push({})
					}
				}else{
					arr = this.apps
				}
				return arr
			},
			c_apps1(){
				let arr = []
				if((this.apps1.length % 4) != 0){
					arr = this.apps1;
					for (let i = 1, len = 4 - (this.apps1.length % 4); i <= len; i++) {
						arr.push({})
					}
				}else{
					arr = this.apps1
				}
				return arr
			},
			c_apps2(){
				let arr = []
				if((this.apps2.length % 4) != 0){
					arr = this.apps2;
					for (let i = 1, len = 4 - (this.apps2.length % 4); i <= len; i++) {
						arr.push({})
					}
				}else{
					arr = this.apps2
				}
				return arr
			},
			Cnotice(){
				if(this.notice.length == 0){
					return ''
				}
				let str = ''
				this.notice.forEach(a => {
					str += a.noticeName + '：' + a.noticeContent + '; '
				})
				return str
			}
		}
		
	}
</script>

<style lang="less" scoped>
.pub{
	height: 100%;
	background: #f0f0f0;
	.notice {
		height: 30px;
		background-image: linear-gradient(90deg, #419dec 0%, rgba(1, 173, 254, 0.5) 100%), linear-gradient( #ffffff, #ffffff);
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
	.header{
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		position: relative;
		
		&>span{
			font-size: 18px;
			letter-spacing: 2px;
			color: #434964;
			font-weight: bold;
		}
		.swtClass{
			position: absolute;
			right: 12px;
			font-size: 15px;
			font-weight: bold;
			color: #434964;
			display: flex;
			align-items: center;
			&>span{
				height: 15px;
				line-height: 20px;
			}
			&>i{
				display: inline-block;
				width: 9px;
				height: 6px;
				background: url(../../assets/images/second/xl.png) no-repeat;
				background-size: 100% 100%;
				margin-left: 5px;
				margin-top: 4px;
			}
			.slectI{
				display: inline-block;
				width: 9px;
				height: 6px;
				background: url(../../assets/images/second/sl.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.banner-img{
		width: 100%;
		height: 150px;
		display: block;
	}
	.app-item{
		padding-bottom: 10px;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 8px 1px 
		rgba(109, 109, 109, 0.11);
		
		
		.top-header{
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			/*border-bottom: .5px solid #d7d7d7;*/
			.left{
				display: flex;
				align-items: center;
				span{
					color: #434964;
					font-size: 15px;
					letter-spacing: 1px;
					margin-left: 11px;
				}
			}
			.right{
				width: 60.5px;
				height: 25.5px;
				background-color: #429ef4;
				border-top-left-radius: 26px;
				border-bottom-left-radius: 26px;
				display: flex;
				align-items: center;
				justify-content: center;
				.edit{
					display: flex;
					align-items: center;
					justify-content: center;
					span{
						font-size: 12px;
						color: #ffffff;
					}
				}
			}
			.more{
				display: flex;
				align-items: center;
				padding-left: 6px;
				span:nth-child(1){
					font-size: 12px;
					color: #434964;
				}
			}
		}
		.bottom-app{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				margin: 10px 12px 0px 12px;
				img{
					width: 65px;
					height: 65px;
				}
				span{
					font-size: 13px;
					color: #6a708a;
				}
			}
			.message-item{
				padding-left: 12px;
				width: 100%;
				display: flex;
				align-items: center;
				
				margin: 10px 0;
				.i{
					width: 5px;
					height: 5px;
					background-color: #e34000;
					border-radius: 50%;
					margin-right: 3px;
				}
				.p{
					font-size: 12px;
					color: #6a708a;
					flex: 1;
				}
				.time{
					width: 60px;
					margin-right: 12px;
					font-size: 12px;
					color: #b2b4bf;
					text-align: right;
				}
				.goCmt{
					width: 55px;
					height: 25px;
					background-image: linear-gradient(-45deg, 
						#0d90e9 0%, 
						#27a8ff 100%);
					border-radius: 2px;
					font-size: 12px;
					color: #FFFFFF;
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
	.van-tabbar-item{
		color: #8a8c9a;
	}
	.van-tabbar-item--active{
		color: #0284dc;
	}
	
</style>