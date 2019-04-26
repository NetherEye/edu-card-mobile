<template>
	<div class="pub">
		<van-nav-bar title="故障报修详情" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;"></div>
		<div class="wrap use-car-style">
			<van-cell-group style="margin-bottom: 9px;">
			  	<van-field label="故障设备" v-model="form.device" clearable disabled />
			  	<div class="van-hairline--bottom"></div>
			</van-cell-group>
			<van-cell-group style="margin-bottom: 9px;">
			  	<van-field label="故障地点" v-model="form.faultAddress" clearable disabled />
			  	<div class="van-hairline--bottom"></div>
			</van-cell-group>
			<van-cell-group style="margin-bottom: 9px;">
			  	<van-field label="报修类别" v-model="form.faultType" clearable disabled />
			</van-cell-group>
			<van-cell-group style="margin-bottom: 9px;">
			  	<van-field label="故障描述" v-model="form.describe" type="textarea" disabled clearable />
			</van-cell-group>
			
			<div class="my-cell">
				<span>图片</span>
				<div class="circle-bg" style="border-radius: initial;" v-for="(item, i) in form.photos" :key="'img' + i">
					<img :src="item.url">
				</div>
			</div>
			<van-cell-group style="margin-bottom: 9px;">
			  	<van-field label="处理状态" v-model="form.handleStatus" type="textarea" disabled clearable />
			</van-cell-group>
			<van-cell-group style="margin-bottom: 9px;">
			  	<van-field label="处理人" v-model="form.maintainPerson" type="textarea" disabled clearable />
			</van-cell-group>
			
		</div>
	</div>
</template>

<script>
	import repairsApi from '../../assets/api/teacher/repairs.js'
	export default {
		data() {
			return {
				vId: '',
				form: {}
			}
		},
		created(){
			if(this.$route.params.id){
				this.vId = this.$route.params.id
			}
			this.getData()
		},
		methods: {
			getData(){
				let par = {
					id: this.vId
				}
				this.$http.rq({
					url: repairsApi.repairsDetail,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.form = res.data
					}else{
						this.$toast(res.message)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.pub{
	height: 100%;
	background-color: #F0F0F0;
	.wrap{
		background-color: #F0F0F0;
		padding-bottom: 20px;
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
		.my-cell {
			height: 90px;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
		
			span {
				width: 70px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #6a708a;
				font-size: 15px;
				margin-right: 16px;
			}
		
			&>p {
				font-size: 12px;
				color: #6a708a;
				margin-right: 2px;
			}
		
			.circle-bg {
				width: 46px;
				height: 46px;
				background-color: #f0f0f0;
				border-radius: 23px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				margin-right: 4px;
		
				.fileInput {
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0;
		
				}
		
				&>img {
					width: 100%;
					height: 100%;
		
				}
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
	.sub-btn{
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