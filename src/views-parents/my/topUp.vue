<template>
	<div class="pub">
		<van-nav-bar title="卡充值" left-arrow @click-left="$router.go(-1)" />
		<div style="height: 46px;"></div>
		<div class="wrap">
			<div class="top">
				<img src="../../assets/img/ye.png"/>
				<p class="ye">余额</p>
				<p class="money">￥1000</p>
			</div>
			<div class="btn">充值</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				
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
	position: relative;
	.wrap{
		position: absolute;
		top: 46px;
		bottom: 0;
		left: 0;
		right: 0;
		.top{
			&>img{
				display: block;
				width: 105px;
				height: 111px;
				margin: 0 auto;
				margin-top: 31px;
			}
			.ye{
				font-size: 15px;
				letter-spacing: 2px;
				color: #434964;
				text-align: center;
				margin-top: 10px;
				margin-bottom: 15px;
			}
			.money{
				height: 23px;
				font-size: 30px;
				letter-spacing: 3px;
				color: #434964;
				text-align: center;
				line-height: 20px;
				font-weight: bold;
			}
			
		}
		.btn{
			margin: 0 12px;
			margin-top: 60px;
			background-color: #1496ef;
			border-radius: 10px;
			height: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 15px;
			letter-spacing: 2px;
			color: #ffffff;
		}
	}
}
</style>