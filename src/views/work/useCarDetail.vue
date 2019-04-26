<template>
	<div class="pub">
		<van-nav-bar title="用车历史详情" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;"></div>
		<div class="wrap use-car-style">
			<div class="sy" v-if="form.checkStatus !== '待审批'" :class="form.checkStatus === '已通过' ? 'tg' : form.checkStatus === '已驳回' ? 'btg' : ''	"></div>
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

		</div>
	</div>
</template>

<script>
	import carApi from '../../assets/api/teacher/car.js'
	export default {
		data() {
			return {
				form: {
					
				},
				Vehicleid: '', //用车id
			}
		},
		created() {
			if(this.$route.params.id != undefined) {
				this.Vehicleid = this.$route.params.id
			} else {

			}
			this.getData();

		},
		methods: {
			onSort() {

			},
			getData() {
				this.$http.rq({
					url: carApi.apply + '/' + this.Vehicleid
				}).then(res => {
					if(res.code === 200) {

						this.form = res.data
					}
				})
			},
		}

	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background-color: #F0F0F0;
		.wrap {
			background-color: #F0F0F0;
			padding-bottom: 20px;
			position: relative;
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
			.custItem {
				height: 45px;
				display: flex;
				align-items: center;
				justify-content: center;
				&>span {
					font-size: 15px;
					color: #b2b4bf;
					margin-left: 3px;
				}
			}
			.my-cell {
				height: 90px;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				.my-cell>span {
					width: 70px;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #6a708a;
					font-size: 15px;
					margin-right: 16px;
				}
				.circle-bg {
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
		.add {
			display: inline-block;
			width: 20px;
			height: 20px;
			background: url(../../assets/images/second/spr.png) no-repeat;
			background-size: 100% 100%;
		}
		.sub-btn {
			height: 45px;
			font-size: 15px;
			letter-spacing: 2px;
			color: #ffffff;
			margin: 20px 12px;
			margin-bottom: 0;
			background-color: #1496ef;
			border-radius: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
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
		z-index: 999!important;
	}
	
	.use-car-style .van-cell__title span {
		font-size: 15px;
		color: #6a708a;
	}
	
	.use-car-style .van-field__body .van-field__control {
		font-size: 15px;
		color: black;
	}
</style>