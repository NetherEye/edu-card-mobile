<template>
	<div class="pub">
		<van-nav-bar title="APP设置" left-arrow @click-left="$router.go(-1)" />
		<div class="main use-car-style">

			<!-- <van-cell-group style="margin-bottom: 10px;">
				<van-cell title="消息通知">
					<img slot="right-icon" @click="swt = 0" class="onOff" v-if="swt === 1" src="../../assets/img/k.png"></img>
					<img slot="right-icon" @click="swt = 1" class="onOff" v-else src="../../assets/img/g.png"></img>
				</van-cell>
			</van-cell-group> -->
			<van-cell-group style="margin-bottom: 10px;">
				<van-cell title="修改密码" is-link @click="$router.push({name: '修改密码'})">
				</van-cell>
				<van-cell title="关于" is-link @click="$router.push({name: '关于'})">
				</van-cell>
			</van-cell-group>
			<!-- <div class="btn van-hairline--top-bottom">保存</div> -->
			
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				swt: 1
			}
		},
		components: {

		},
		created() {

		},
		methods: {

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
				background-color: #FFFFFF;
				letter-spacing: 2px;
				color: #e34000;
				font-size: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				margin-top: 31px;
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