<template>
	<div class="pub">
		<van-nav-bar title="我的审批" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #FFFFFF;"></div>
		<div class="main">
			<div class="tabber">
				<div class="t-left" :class="activeT == 'left' ? 'activeTab' : ''" @click="handleTab('left')">待审批</div>
				<div class="t-right" :class="activeT == 'right' ? 'activeTab' : ''" @click="handleTab('right')">已审批</div>
			</div>
			<div class="content">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<div class="history-item" v-for="(item, i) in list" :key="i" @click="$router.push({name: '办公进行审批', params: {id: item.id}})">
						<div class="history-item-l">
							<span>{{item.applyPersonName}}的用车申请</span>
						</div>
						<div class="history-item-r">
							<!--<span v-if="item.state !== 0" :class="item.state === 1 ? 'tg' : 'btg'"></span>-->
							<span v-if="item.checkStatus == '待审批'">{{item.applyTime}}</span>
							<span v-else>{{item.checkDate}}</span>
						</div>
					</div>
				</van-list>
			</div>
		</div>
		
		<van-dialog
		  v-model="bhShow"
		  show-cancel-button
		  confirmButtonText="驳回"
		  cancelButtonText="手滑了"
		  className="dialog"
		>
		  <van-field
		    v-model="value"
		    label="驳回理由"
		    type="textarea"
		    placeholder="请输入"
		  />
		</van-dialog>
		
	</div>
</template>

<script>
	import carApi from '../../assets/api/teacher/car.js'
	export default {
		data() {
			return {
				value: '',
				value1: '',
				bhShow: false,
				value2: '',
				goReject: false, // 是否为驳回提交
				list: [],
				messages: [			
				],
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15,
				activeT: 'left'
			}
		},
		components: {

		},
		created() {
		},
		methods: {
			onLoad() {
				let par = {
					checkStatus: this.activeT === 'left' ? '待审批' : this.activeT === 'right' ? '已审批' : '',
					pageNumber: this.currentPage,
					pageSize: this.pageSize
				}
				this.$http.rq({
					url: carApi.applyHistory,
					data: par
				}).then(res => {
					this.loading = false;
					if(res.code === 200){
						this.list = this.list.concat(res.data)
						if(this.list.length >= res.total){
							this.finished = true
						}
					}else{
						this.finished = true
					}
				})
				
			},
			handleTab(t){
				this.activeT = t
				this.currentPage = 1
				this.finished = false
				this.list = []
				
			},
			agree(t){
				if(t === 'y'){
					this.$dialog.confirm({
				      	message: '同意 李乐 老师的用车申请？',
				      	confirmButtonText: '同意',
				      	cancelButtonText: '手滑了',
				      	className: 'dialog'
				    });
				}else{
					this.bhShow = true
				}
			},
			
		},
		computed: {

		}

	}
</script>

<style lang="less" scoped>
	.pub {
		background: #f0f0f0;
		height: 100%;
		user-select: none;
		.reject{
			.content{
				.bh{
					.title{
						height: 32px;
						color: #6a708a;
						letter-spacing: 1px;
						font-size: 12px;
						line-height: 32px;
						padding-left: 11px;
					}
				}
				.sub-btn{
					height: 45px;
					background-color: #1496ef;
					border-radius: 5px;
					text-align: center;
					line-height: 45px;
					cursor: pointer;
					margin: 0 12px;
					margin-top: 70px;
					
					span{
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 2px;
						color: #ffffff;
						font-size: 15px;
					}
				}
			}
		}
		.main{
			background: #f0f0f0;
			height: auto;
			overflow: hidden;
			.tabber{
				margin: 10px 12px;
				height: 32px;
				background-color: #ffffff;
				box-shadow: 0px 7px 18px 0px 
					rgba(0, 0, 0, 0.13);
				border-radius: 32px;
				font-size: 15px;
				color: #b2b4bf;
				display: flex;
				justify-content: space-between;
				&>div{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.t-left{
					
					border-top-left-radius: 32px;
					border-bottom-left-radius: 32px;
					
				}
				.t-center{
					border-radius: 32px;
				}
				.t-right{
					border-top-right-radius: 32px;
					border-bottom-right-radius: 32px;
				}
				.activeTab{
					color: #FFFFFF;
					background-color: #4091fd;
				}
			}
			.content{
				.is-agree{
					height: 45px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					&>div{
						flex: 1;
						height: 26px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.agree{
						&>i{
							display: inline-block;
							height: 25px;
							width: 25px;
							background: url(../../assets/images/second/ty.png) no-repeat;
							background-size: 100% 100%;
							margin-right: 5px;
						}
						&>span{
							font-size: 15px;
							color: #6a708a;
							letter-spacing: 2px;
						}
					}
					.disagree{
						&>i{
							display: inline-block;
							height: 25px;
							width: 25px;
							background: url(../../assets/images/second/bh1.png) no-repeat;
							background-size: 100% 100%;
							margin-right: 5px;
						}
						&>span{
							font-size: 15px;
							color: #6a708a;
							letter-spacing: 2px;
						}
					}
				}
				.history-item{
			height: 60px;
			background-color: #ffffff;
			box-shadow: 0px 0px 8px 1px 
				rgba(109, 109, 109, 0.11);
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 41px 0 24px;
			margin-bottom: 10px;
			.history-item-l{
				display: flex;
				align-items: center;
				span{
					letter-spacing: 1px;
					color: #434964;
					font-size: 15px;
					
				}
			}
			.history-item-r{
				display: flex;
				align-items: center;
				span{
					font-size: 12px;
					letter-spacing: 2px;
					color: #434964;
				}
// 				span{
// 					display: inline-block;
// 					width: 50px;
// 					height: 52px;
// 				}
// 				.tg{
// 					background: url(../../assets/images/second/tg2.png) no-repeat;
// 					background-size: 100% 100%;
// 				}
// 				.btg{
// 					background: url(../../assets/images/second/bh2.png) no-repeat;
// 					background-size: 100% 100%;
// 				}
			}
		}
				
				.add{
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url(../../assets/images/second/spr.png) no-repeat;
					background-size: 100% 100%;
				}
				.custItem{
					height: 45px;
					display: flex;
					align-items: center;
					justify-content: center;
					&>span{
						font-size: 15px;
						color: #b2b4bf;
						margin-left: 3px;
					}
				}
				.my-cell{
					height: 90px;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					.my-cell>span{
						width: 70px;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						color: #6a708a;
						font-size: 15px;
						margin-right: 16px;
					}
					.circle-bg{
						width: 46px;
						height: 46px;
						background-color: #f0f0f0;
						border-radius: 23px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					
				}
				
			}
			
		}
		
	}
	
</style>
<style>
	.dialog .van-dialog__cancel .van-button__text{
		color: #ff900d;
	}
	.van-nav-bar .van-nav-bar__right .sort{
		font-size: 15px;
		color: #434964;
		position: relative;
		letter-spacing: 2px;
		font-weight: bold;
	}
	.van-nav-bar{
		z-index: 999!important;
	}
	.use-car-style .van-cell__title span{
		font-size: 15px;
		color: #6a708a;
	}
	.use-car-style .van-field__body .van-field__control{
		font-size: 15px;
		color: #b2b4bf;
	}
</style>