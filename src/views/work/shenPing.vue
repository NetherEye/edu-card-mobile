<template>
	<div class="pub">
		<van-nav-bar :title="form.applyTime" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #FFFFFF;"></div>
		<div class="reject main">
			<div class="sy" v-if="form.checkStatus !== '待审批'" :class="form.checkStatus === '已通过' ? 'tg' : form.checkStatus === '已驳回' ? 'btg' : ''	"></div>
			<div class="content">
				<div class="wrap use-car-style">
					<van-cell-group style="margin-bottom: 9px;">
					  	<van-field label="申请部门" v-model="form.department" disabled clearable placeholder="请输入" />
					  	<div class="van-hairline--bottom"></div>
					</van-cell-group>
					<van-cell-group style="margin-bottom: 9px;">
					  	<van-field label="用车事由" v-model="form.reason" disabled type="textarea" clearable placeholder="请输入" />
					</van-cell-group>
					<van-cell-group style="margin-bottom: 9px;">
					  	<van-field label="始发地点" v-model="form.originLocation" disabled clearable placeholder="请输入" />
					  	<van-field label="返回地点" v-model="form.remandLocation" disabled clearable placeholder="请输入" />
					</van-cell-group>
					
					<van-cell-group style="margin-bottom: 9px;">
					  	<van-field label="用车日期" v-model="form.useDate" disabled clearable placeholder="请输入" />
					  	<van-field label="返回日期" v-model="form.remandDate" disabled clearable placeholder="请输入" />
					</van-cell-group>
					
					<van-cell-group style="margin-bottom: 9px;">
					  	<div class="van-hairline--bottom" v-for="(item, i) in form.applyCarList" :key="'car' + i">
					  		<van-field label="车辆类型" v-model="item.carType" disabled clearable />
					  		<van-field label="车辆数量" v-model="item.carNumber" disabled clearable />
					  	</div>
					</van-cell-group>
					
					<div class="my-cell" style="margin-bottom: 9px;">
						<div class="my-cell">
							<span>图片</span>
							<div class="circle-bg" style="border-radius: initial;" v-for="(item, i) in form.filesList" :key="'img' + i">
								<img :src="item.url">
							</div>
						</div>
					</div>
					
					<van-cell-group style="margin-bottom: 9px;">
					  	<van-field label="审批人" v-model="form.checkPerson" disabled clearable placeholder="请输入" />
					  	<van-field label="抄送" v-model="form.sendPerson" disabled clearable placeholder="请输入" />
					</van-cell-group>
					<van-cell-group v-if="form.checkStatus === '待审批'">
					  	<div class="is-agree van-hairline--top">
							<div class="agree van-hairline--right" @click="agree('y')"><i></i><span>同意</span></div>
							<div class="disagree" @click="agree('n')"><i></i><span>驳回</span></div>
						</div>
					</van-cell-group>
				
				</div>
				
			</div>
		</div>
		<van-dialog
		  v-model="bhShow"
		  show-cancel-button
		  confirmButtonText="驳回"
		  cancelButtonText="手滑了"
		  className="dialog"
		  @confirm="sub"
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
				form: {}
			}
		},
		components: {

		},
		created() {
			this.getData()
		},
		methods: {
			getData(){
				this.$http.rq({
					url: carApi.apply + '/' + this.$route.params.id
				}).then(res => {
					if(res.code === 200){
						this.form = res.data
					}else{
						this.$toast(res.message)
					}
				})
			},
			agree(t){
				if(t === 'y'){
					this.$dialog.confirm({
				      	message: '同意'+this.form['applyPersonName']+'的用车申请？',
				      	confirmButtonText: '同意',
				      	cancelButtonText: '手滑了',
				      	className: 'dialog'
				    }).then(() => {
						let par = {
							id: this.form.id,
							status: 1
						}
						this.$http.rq({
							method: 'post',
							url: carApi.check,
							data: par
						}).then(res => {
							if(res.code === 200){
								this.$router.go(-1)
							}
							this.$toast(res.message)
						})
					})
				}else{
					this.bhShow = true
				}
			},
			sub(){
				if(this.value === ''){
					this.$toast('请填写驳回理由！')
					return
				}
				let par = {
					id: this.form.id,
					status: 2,
					rejectContent: this.value
				}
				this.$http.rq({
					method: 'post',
					url: carApi.check,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.$router.go(-1)
					}
					this.$toast(res.message)
				})
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
		user-select: none;
		.reject{
			.sy{
				width: 72px;
				height: 77px;
				position: absolute;
				top: 16px;
				right: 12px;
				z-index: 99;
			}
			.tg{
				background: url(../../assets/images/second/tg2.png) no-repeat;
				background-size: 100% 100%;
			}
			.btg{
				background: url(../../assets/images/second/bh2.png) no-repeat;
				background-size: 100% 100%;
			}
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
			position: relative;
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
				span{
					letter-spacing: 2px;
					color: #434964;
					font-size: 15px;
				}
			}
			.history-item-r{
				display: flex;
				align-items: center;
				span{
					display: inline-block;
					width: 50px;
					height: 52px;
				}
				.tg{
					background: url(../../assets/images/second/tg2.png) no-repeat;
					background-size: 100% 100%;
				}
				.btg{
					background: url(../../assets/images/second/bh2.png) no-repeat;
					background-size: 100% 100%;
				}
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
						margin-right: 2px;
						&>img{
							width: 100%;
							height: 100%;
						}
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
		color: black;
	}
</style>