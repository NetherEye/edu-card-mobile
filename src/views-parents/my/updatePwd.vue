<template>
	<div class="pub">
		<van-nav-bar title="修改密码" left-arrow @click-left="$router.go(-1)" />
		<div class="main use-car-style">
			<div class="red-title">
				<span>请输入旧密码，在输入6-16位字母和数字组合的新密码</span>
			</div>
			<van-cell-group>
			  	<van-field label="旧密码" type="password" v-model.trim="oldPassword" placeholder="请输入旧密码" />
			</van-cell-group>
			<van-cell-group>
			  	<van-field label="新密码" type="password" v-model.trim="newPassword" placeholder="请输入新密码" />
			</van-cell-group>
			<van-cell-group>
			  	<van-field label="确认密码" type="password" v-model.trim="againNewPassword" placeholder="请再次输入新密码" />
			</van-cell-group>
			<div class="btn van-hairline--top-bottom" @click="sub">保存</div>
			<!-- <div class="btn1" @click="$router.push({name: '找回密码'})">忘记密码</div> -->
			
		</div>

	</div>
</template>

<script>
	import myApi from '../../assets/api/parents/my.js'
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				againNewPassword: ''
			}
		},
		components: {

		},
		created() {

		},
		methods: {
			sub(){
				let par = {
					oldPassword: this.oldPassword,
					newPassword: this.newPassword,
					againNewPassword: this.againNewPassword
				}
				this.$http.rq({
					method: 'post',
					url: myApi.updatePwd,
					data: par
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.oldPassword = '';
						this.newPassword = '';
						this.againNewPassword = '';
					}else{
						
					}
				})
			}
		},
		computed: {

		}

	}
</script>

<style lang="less" scoped>
	.pub {
		background: #F0F0F0;
		height: 100%;
		.main {
			background: #F0F0F0;
			.red-title{
				height: 32px;
				display: flex;
				align-items: center;
				padding-left: 14px;
				span{
					letter-spacing: 1px;
					color: #f73131;
					font-size: 12px;
				}
			}
			.onOff{
				width: 33.5px;
				height: 21px;
				margin-top: 2px;
			}
			.tou {
				display: inline-block;
				width: 31px;
				height: 31px;
			}
			.cj{
				background: #FFFFFF;
				font-size: 15px;
				color: #b2b4bf;
				height: 150px;
				&>p{
					height: 14px;
					line-height: 12px;
					padding-left: 12px;
					margin: 15px 0;
				}
			}
			.btn{
				height: 45px;
				background-color: #1496ef;
				border-radius: 5px;
				letter-spacing: 2px;
				color: #ffffff;
				margin: 0 12px;
				font-size: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				margin-top: 44px;
			}
			.btn1{
				height: 45px;
				color: #1496ef;
				margin: 0 12px;
				font-size: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
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
		z-index: 999!important;
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