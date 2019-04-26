<template>
	<div class="pub">
		<van-nav-bar title="我的应用" left-arrow @click-left="$router.go(-1)" />
		<div style="height: 10px;background: #f0f0f0;"></div>

		<div class="app-item fast">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>我的快捷</span><span class="hint">（按住滑动可变换顺序）</span>
				</div>
				<div class="right" @click="save">
					<span>保存</span>
				</div>
			</div>

			<!--<div class="bottom-app drag">
				<div class="item" v-for="(item, i) in apps" :key="i" @touchstart.stop="selectApp(i, $event)">
					<i class="handle" v-if="item.icon" @click="handleApp('sub', i)"></i>
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.name}}</span>
				</div>
				<div class="item-stance" v-for="(item, i) in c_apps">
					<div style="width: 65px;height: 65px;"></div>
				</div>
				
				<div class="item-drage" v-if="dragDom.isShow">
					<i class="handle" v-if="item.icon"></i>
					<img :src="dragDom.data.icon" />
					<span>{{drageDom.data.name}}</span>
				</div>
				
			</div>-->

			<div class="bottom-app">
				<div class="item" v-for="(item, i) in apps" v-dragging="{ item: item, list: apps, group: 'item.icon'}" :key="item.id">
					<i class="handle" v-if="item.icon" @click="handleApp('sub', i)"></i>
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.shortcutName}}</span>
				</div>
				<div class="item-stance" v-for="(item, i) in c_apps">
					<div style="width: 65px;height: 65px;"></div>
				</div>
			</div>

		</div>

		<div style="height: 10px;background: #f0f0f0;"></div>

		<div class="app-item all">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>所有应用</span>

				</div>
			</div>
			<div class="bottom-app">
				<div class="item" v-for="(item, i) in c_apps1" :key="item.id">
					<i class="handle" v-if="item.icon" @click="handleApp('add', i)"></i>
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.shortcutName}}</span>
				</div>
			</div>
		</div>
		<div style="height: 10px;background: #f0f0f0;"></div>

	</div>
</template>

<script>
	import indexApi from '../../assets/api/teacher/index.js'
	export default {
		data() {
			return {
				items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
				apps: [],
				apps1: [],
// 				apps: [{
// 						isDrag: false,
// 						name: '班级考勤',
// 						to: '班级考勤',
// 						icon: require("../../assets/images/first/bjkq.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '请假审批',
// 						to: '请假审批',
// 						icon: require("../../assets/images/first/qjsp.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '班级值日',
// 						to: '班级值日',
// 						icon: require("../../assets/images/first/zr1.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '调查问卷',
// 						to: '调查问卷',
// 						icon: require("../../assets/images/first/wjdc.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '班级通讯',
// 						to: '班级通讯录',
// 						icon: require("../../assets/images/first/bjtx.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '表扬榜',
// 						to: '表扬榜',
// 						icon: require("../../assets/images/first/byb.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '班级课表',
// 						to: '班级课表',
// 						icon: require("../../assets/images/first/bjkb.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '班级成绩',
// 						to: '班级成绩',
// 						icon: require("../../assets/images/first/bjcj.png")
// 					},
// 					{
// 						isDrag: false,
// 						name: '班级圈',
// 						to: '班级圈',
// 						icon: require("../../assets/images/first/bjq.png")
// 					},
// 
// 				],
// 				apps1: [{
// 						name: '成绩',
// 						to: '成绩',
// 						icon: require("../../assets/images/first/cj.png")
// 					},
// 					{
// 						name: '点评',
// 						to: '点评',
// 						icon: require("../../assets/images/first/dp.png")
// 					},
// 					{
// 						name: '打卡',
// 						to: '打卡',
// 						icon: require("../../assets/images/first/dk.png")
// 					},
// 					{
// 						name: '作业',
// 						to: '作业',
// 						icon: require("../../assets/images/first/zy.png")
// 					}
// 				],
				dragDom: {
					target: '',
					data: '',
					isShow: false
				},
				classInfo: {}

			}
		},
		components: {

		},
		created() {
			 // 获取存入本地的选中班级
			if (sessionStorage.getItem('class')) {
			  this.classInfo = JSON.parse(sessionStorage.getItem('class'))
			}
			this.getApps()
		},
		mounted() {
			this.$dragging.$on('dragged', ({
				value
			}) => {
				
			})
		},
		methods: {
			save(){
				let arr = JSON.parse(JSON.stringify(this.apps))
				arr.forEach((a, i) => {
					a['shortId'] = a.id
					a['orderNumber'] = i + 1
				})
				this.$http.rq({
					method: 'post',
					url: indexApi.addApps,
					data: {
						shortcut: JSON.stringify(arr)
					}
				}).then(res => {
					if(res.code === 200){
						this.$toast(res.message)
						this.getApps()
					}
					
				})
			},
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
				this.$http.rq({
					url: indexApi.getAllApps
				}).then(res => {
					if (res.code === 200) {
						res.data.map(a => {
							a.icon = require(`../../${a.icon}`)
						})
						this.apps1 = res.data
					} else {
						this.$toast(res.message)
					}
				})
			},
			handleApp(cap, i) {
				if (cap == 'add') {
					if (this.apps.length >= 8) {
						return
					}

					this.apps.push(this.apps1[i]);
					this.apps1.splice(i, 1)
					// 现将顶包的对象删掉
					this.apps = this.apps.filter(value => value.stance !== true);
					this.apps1 = this.apps1.filter(value => value.stance !== true);
				} else {
					if (this.apps.length <= 4) {
						return
					}

					this.apps1.push(this.apps[i]);
					this.apps.splice(i, 1)
					// 现将顶包的对象删掉
					this.apps = this.apps.filter(value => value.stance !== true);
					this.apps1 = this.apps1.filter(value => value.stance !== true);
				}
			},
			selectApp(index, e) {
				let odiv = document.querySelector('.item-drage');
				for (let i = 0, len = e.path.length; i < len; i++) {
					if (e.path[i].className == 'item') {
						odiv = e.path[i]
						break
					}
				}
				this.dragDom['data'] = JSON.parse(JSON.stringify(this.apps[index]))
				this.dragDom['isShow'] = true

				this.apps.splice(index, 1, {})

				//				return
				let parents = document.querySelector('.drag')
				//				let items = parents.querySelectorAll('.item');
				//				let index = i;
				////				let odiv = items[index]
				//				
				//				this.dragDom['target'] = items[i];
				//				this.dragDom['data'] = this.apps[i];
				//				
				//				this.apps.splice(i, 1)
				//				
				odiv.position = 'absolute'
				odiv.style.left = e.touches[0].clientX + 'px';
				odiv.style.top = e.touches[0].clientY + 'px';
				odiv.style.zIndex = 99
				//				
				//				
				//				// 给拖拽元素层级
				//				
				//				// 算出鼠标相对元素的位置
				let disX = e.touches[0].clientX - this.dragDom.target.offsetLeft;
				let disY = e.touches[0].clientY - this.dragDom.target.offsetTop;
				parents.ontouchmove = (e) => {
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
					let left = e.touches[0].clientX - disX;
					let top = e.touches[0].clientY - disY;

					//					let arrs = document.querySelector('.drag').querySelectorAll('.item');
					//
					//					for(let i = 0, len = arrs.length; i < len; i++) {
					//						if(Object.keys(this.apps[i]).length != 0 && i != index) {
					//							let aLeft = arrs[i].offsetLeft;
					//							let aTop = arrs[i].offsetTop;
					//							
					//							if(Math.abs(odiv.offsetLeft - aLeft) <= 10 && Math.abs(odiv.offsetTop - aTop) <= 20) {
					//								console.log(JSON.parse(JSON.stringify(this.apps)))
					//								this.apps = this.apps.filter(value => Object.keys(value).length !== 0); // 先干掉顶包的
					//								if(i < index){
					//									index++
					//								}
					//								this.apps.splice(i, 0, {}) // 拿到准确下标 在加个顶包的
					//								break
					//							}else{
					//								this.apps = this.apps.filter(value => Object.keys(value).length !== 0); // 先干掉顶包的
					//							}
					//						}
					//					}
					//移动当前元素
					odiv.style.position = 'absolute'
					this.dragDom.target.style.left = left + 'px';
					this.dragDom.target.style.top = top + 'px';

				};
				parents.ontouchend = (e) => {
					//					return
					//					let is = 'false'
					//					for (let i in this.apps) { // 结束时 把顶包的位置替换成拖拽的元素
					//						if(Object.keys(this.apps[i]).length == 0){ // 撞见了顶包的就要 -1
					//							is = i
					//							break
					//						}
					//					}
					//					
					//					
					//					
					////					if(!isNaN(is)){
					////						if(is === index){
					////							this.apps.splice(is, 0, result)
					////						}else if(is < index){
					////							this.apps.splice(index, 1)
					////							this.apps.splice(is, 1, result)
					////							
					////						}else if(is > index){
					////							this.apps.splice(is, 1, result)
					////							this.apps.splice(index, 1)
					////						}
					////					}
					//					this.apps = this.apps.filter(value => Object.keys(value).length !== 0); // 先干掉顶包的
					//					
					//					console.log(this.apps)
					//					
					//					odiv.style.position = 'relative'
					//					odiv.style.left = '';
					//					odiv.style.top = '';

					parents.ontouchmove = null;
					parents.ontouchend = null;
				};
			}
		},
		computed: {
			c_apps() {
				let arr = []

				if ((this.apps.length % 4) != 0) {
					for (let i = 1, len = 4 - (this.apps.length % 4); i <= len; i++) {
						arr.push({
							stance: true
						}) // 顶包对象
					}
				}
				return arr
			},
			c_apps1() {
				let arr = []
				if ((this.apps1.length % 4) != 0) {
					arr = this.apps1;
					for (let i = 1, len = 4 - (this.apps1.length % 4); i <= len; i++) {
						arr.push({
							stance: true
						})
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
	.drag {
		position: relative;

		.item {
			z-index: 9;
		}
	}

	.pub {
		height: 100%;
		background: #f0f0f0;
		user-select: none;

		.header {
			height: 44px;
			text-align: center;
			line-height: 44px;
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

		.fast {
			position: relative;

			.bottom-app {
				div {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
				}

				.item {
					position: relative;
				}

				.handle {
					cursor: pointer;
					background: url(../../assets/images/second/c.png) no-repeat;
					background-size: 100% 100%;
					width: 24px;
					height: 18px;
					position: absolute;
					right: 0px;
					top: 0px;
					box-shadow: 0px 0px 15px 0px rgba(96, 96, 96, 0.3);
					border-radius: 18px;
				}
			}
		}

		.all {
			.bottom-app {
				div {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
				}

				.item {
					position: relative;
				}

				.handle {
					cursor: pointer;
					background: url(../../assets/images/second/j.png) no-repeat center center;
					background-size: 100% 100%;
					width: 24px;
					height: 18px;
					position: absolute;
					right: 0px;
					top: 0px;
					box-shadow: 0px 0px 15px 0px rgba(96, 96, 96, 0.3);
					border-radius: 18px;
				}
			}
		}

		.app-item {
			padding-bottom: 10px;
			background-color: #FFFFFF;
			box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);

			.top-header {
				height: 45px;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					span {
						color: #434964;
						font-size: 15px;
						letter-spacing: 1px;
						margin-left: 11px;
					}

					.hint {
						font-size: 12px;
						color: #e34000;
						margin-left: 0;
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

					span {
						font-size: 12px;
						color: #FFFFFF;
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

				.item,
				.item-drage {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					margin: 10px 12px 0px 12px;

					img {
						width: 65px;
						height: 65px;
						pointer-events: none;
						user-select: none;
					}

					span {
						font-size: 13px;
						color: #6a708a;
						user-select: none;
					}
				}

				.item-stance {
					margin: 10px 12px 0px 12px;
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
