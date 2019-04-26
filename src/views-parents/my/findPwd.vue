<template>
	<div class="pub">
		<van-nav-bar title="找回登录密码" left-arrow @click-left="$router.go(-1)" />
		<div class="main use-car-style" v-show="step === 1">
			<div class="red-title">
				<span>请输入你注册时用的手机号</span>
			</div>
			<van-cell-group>
				<van-cell title="国家/地区">
					<div slot="right-icon" class="custom-icon">
						<span class="right-font">中国</span>
						<van-icon name="arrow-down" />
					</div>
				</van-cell>
			</van-cell-group>
			<van-cell-group>
				<van-field label="手机号" placeholder="请输入手机号" v-model="value">
					<van-button slot="button" size="small" type="primary">获取验证码</van-button>
				</van-field>
			</van-cell-group>
			<van-cell-group>
				<van-field label="新密码" placeholder="请输入新密码" v-model="value">

				</van-field>
			</van-cell-group>

			<div class="btn" @click="step = 2">下一步</div>

		</div>
		<div class="main use-car-style" v-show="step === 2">
			<van-password-input :value="value1" info="输入验证码" style="margin-top: 20px;" @focus="showKeyboard = true" />

			<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
			<div class="btn" @click="step = 1">下一步</div>

		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				step: 1,
				showKeyboard: false,
				value: '',
				value1: '',
				message: ''
			}
		},
		components: {

		},
		created() {

		},
		methods: {
			onInput(key) {
				this.value1 = (this.value1 + key).slice(0, 6);
			},
			onDelete() {
				this.value1 = this.value1.slice(0, this.value1.length - 1);
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
			.red-title {
				height: 32px;
				display: flex;
				align-items: center;
				padding-left: 14px;
				span {
					letter-spacing: 1px;
					color: #f73131;
					font-size: 12px;
				}
			}
			.tou {
				display: inline-block;
				width: 31px;
				height: 31px;
			}
			.cj {
				background: #FFFFFF;
				font-size: 15px;
				color: #b2b4bf;
				height: 150px;
				&>p {
					height: 14px;
					line-height: 12px;
					padding-left: 12px;
					margin: 15px 0;
				}
			}
			.btn {
				height: 45px;
				margin: 0 12px;
				background-color: #1496ef;
				border-radius: 5px;
				letter-spacing: 2px;
				color: #ffffff;
				font-size: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				margin-top: 50px;
			}
			.right-font {
				color: #434964;
				font-size: 15px;
				margin-right: 3px;
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