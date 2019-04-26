<template>
	<div class="pub">
		<van-nav-bar title="个人资料" left-arrow @click-left="$router.go(-1)" />
		<div class="main use-car-style">

			<van-cell-group style="margin-bottom: 10px;">
				<van-cell title="头像">
					<img slot="right-icon" src="../../assets/images/first/tou.png" class="tou"></img>
				</van-cell>
			</van-cell-group>
			<van-cell-group style="margin-bottom: 10px;">
				<van-cell title="毕业院校" value="">
				</van-cell>
			</van-cell-group>

			<van-cell-group style="margin-bottom: 10px;">
				<van-cell title="个人成就">
				</van-cell>
				<div class="cj">
					<!-- <p>2016年获得校级优秀教师称号</p>
					<p>2017年获得校级优秀教师称号</p> -->
				</div>
			</van-cell-group>
			
			<!-- <div class="btn">保存</div> -->
			
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
		.main {
			background: #F0F0F0;
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