<template>
	<div class="pub">
		<van-nav-bar title="表扬卡管理" left-arrow @click-left="goBack" @click-right="$router.push({name: '教师表扬榜表扬卡'})" fixed>
			<div class="sort" slot="right">
				<span class="jj"></span>
			</div>
		</van-nav-bar>
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="tabber">
			<div class="t-left" :class="activeT == 'left' ? 'activeTab' : ''" @click="handleTab('left')">默认</div>
			<div class="t-right" :class="activeT == 'right' ? 'activeTab' : ''" @click="handleTab('right')">自定义</div>
		</div>

		<template v-if="activeT == 'left'">
			<div class="wrap" key="li1">

				<div class="message-item" v-for="(item, index) in list" :key="index" @click="$router.push({name: item.to, params: {id: item.id}})">
					<div class="bg">
						<img :src="item.cardBackUrl" />
						<div class="cap">{{item.cardName}}</div>
					</div>
					<!-- <div class="pOrTime">
						<span>{{item.teacher}}</span>
						<span>{{item.time}}</span>
					</div> -->
				</div>
			</div>
		</template>
		<template v-else>
			<div class="wrap" v-if="list2.length !== 0" key="li2">

				<div class="message-item" v-for="(item, index) in list2" :key="index" @click="$router.push({name: item.to, params: {id: item.id}})">

					<van-swipe-cell :right-width="80">
						<div class="bg">
							<img :src="item.cardBackUrl" />
							<div class="cap">{{item.cardName}}</div>
						</div>
						<span slot="right" class="cell-handle">
              <span class="edit" @click="$router.push({name: '教师表扬榜表扬卡编辑', params: {id: item.id}})">编辑</span>
						<span class="dle" @click="dle(item)">删除</span>
						</span>
					</van-swipe-cell>
				</div>
			</div>
			<div class="whiteBg" v-else key="li3">
				<div class="noList">
					<img src="../../assets/images/second/icon.png" />
					<span>还没有创建表扬卡哦</span>
				</div>

			</div>
		</template>

	</div>
</template>

<script>
	import praiseApi from '../../assets/api/teacher/praise.js'
	import { Dialog } from 'vant';
	export default {
		data() {
			return {
				list: [

				],
				list2: [],
				activeT: 'left',
				classInfo: {}
			}
		},
		components: {

		},
		created() {
			if(sessionStorage.getItem('class')) {
				this.classInfo = JSON.parse(sessionStorage.getItem('class'))
			}
			this.getList()
		},
		methods: {
			goBack() {
				if(this.goReject) {

					this.goReject = false
				} else {
					this.$router.go(-1)

				}
			},
			getList() {
				let par = {
					gradeId: this.classInfo.gradeId,
					classId: this.classInfo.classId,
					type: this.activeT === 'left' ? 1 : 2
				}
				let type = JSON.parse(JSON.stringify(par.type))
				this.$http.rq({
					url: praiseApi.getCardList,
					data: par
				}).then(res => {

					if(res.code === 200) {

						if(type === 1) {
							this.list = res.data
						} else {
							this.list2 = res.data
						}
					} else {
						this.$toast(res.message)
					}
				})
			},
			handleTab(t) {
				this.activeT = t
				this.list = []
				this.list2 = []
				this.getList()
			},
			dle(item) {
				Dialog.confirm({
					title: '标题',
					message: '是否删除'
				}).then(() => {

					let par = {
						id: item.id
					}
					this.$http.rq({
						method: 'delete',
						url: praiseApi.getCardList,
						data: par
					}).then(res => {
						this.$toast(res.message)
						if(res.code === 200) {
							this.getList()
						} else {

						}
					})

				}).catch(() => {

				});

			}

		},
		computed: {

		}

	}
</script>

<style lang="less" scoped>
	.pub {
		background: #f0f0f0;
		height: 100%;
		.whiteBg {
			position: absolute;
			top: 94px;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ffffff;
			box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
			border-radius: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.cell-handle {
			width: 80px;
			height: 100%;
			display: flex;
		}
		.edit,
		.dle {
			flex: 1;
			font-size: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			border-radius: 10px;
		}
		.edit {
			background-color: #1496ef;
			margin-right: 2px;
		}
		.dle {
			background-color: #ec4141;
		}
		.noList {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 100px;
			&>img {
				width: 191px;
				height: 154px;
				margin-bottom: 20px;
			}
			&>span {
				font-size: 15px;
				color: #b2b4bf;
			}
		}
		.wrap {
			background: #f0f0f0;
			padding-bottom: 10px;
			/*flex: 1;*/
		}
		.jj {
			display: inline-block;
			width: 16px;
			height: 16px;
			background: url(../../assets/images/second/jj.png) no-repeat;
			background-size: 100% 100%;
		}
		.tabber {
			margin: 10px 12px;
			height: 32px;
			background-color: #ffffff;
			box-shadow: 0px 7px 18px 0px rgba(0, 0, 0, 0.13);
			border-radius: 32px;
			font-size: 15px;
			color: #b2b4bf;
			display: flex;
			justify-content: space-between;
			&>div {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.t-left {
				border-top-left-radius: 32px;
				border-bottom-left-radius: 32px;
			}
			.t-center {
				border-radius: 32px;
			}
			.t-right {
				border-top-right-radius: 32px;
				border-bottom-right-radius: 32px;
			}
			.activeTab {
				color: #ffffff;
				background-color: #4091fd;
			}
		}
		.by {
			position: fixed;
			bottom: 84px;
			right: 15px;
			background: #d1eafc;
			width: 61px;
			height: 61px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			&>span {
				width: 52px;
				height: 52px;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #ffffff;
				box-shadow: 0px 0px 38px 0px rgba(20, 150, 239, 0.64);
				font-size: 15px;
				letter-spacing: 1px;
				color: #1496ef;
			}
		}
		.message-item {
			margin: 10px 12px;
			height: 120px;
			background-color: #ffffff;
			border-radius: 10px;
			box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
			.bg {
				width: 100%;
				height: 120px;
				box-shadow: 0px 6px 13px 1px rgba(23, 106, 180, 0.2);
				border-radius: 10px;
				position: relative;
				&>img {
					display: inline-block;
					max-width: 100%;
					max-height: 100%;
				}
				.cap {
					font-size: 27px;
					letter-spacing: 1px;
					color: #ffffff;
					position: absolute;
					top: 40px;
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
	}
</style>
<style>
	.dialog .van-dialog__cancel .van-button__text {
		color: #ff900d;
	}
	
	.van-nav-bar .van-nav-bar__right .sort {
		font-size: 15px;
		color: #434964;
		position: relative;
		letter-spacing: 2px;
		font-weight: bold;
	}
	
	.van-nav-bar {
		z-index: 999 !important;
	}
	
	.use-car-style .van-cell__title span {
		font-size: 15px;
		color: #6a708a;
	}
	
	.use-car-style .van-field__body .van-field__control {
		font-size: 15px;
		color: #b2b4bf;
	}
</style>