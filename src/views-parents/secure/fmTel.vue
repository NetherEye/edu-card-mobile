<template>
	<div class="pub">
		<van-nav-bar title="关联号码" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<div class="list">
				<div class="item" @click="$router.push({name: '设置SOS号码'})">
					<div class="left">
						<img src="../../assets/img/icon/sos.png"/>
					</div>
					<div class="center">
						<span>设置SOS号码</span>
					</div>
					<div class="right"><i></i></div>
				</div>
				<div class="item" @click="$router.push({name: '设置亲情号'})">
					<div class="left">
						<img src="../../assets/img/icon/qqh.png"/>
					</div>
					<div class="center">
						<span>设置亲情号</span>
					</div>
					<div class="right"><i></i></div>
				</div>
			</div>
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
		background: #f0f0f0;
		height: 100%;
		.wrap{
			background: #f0f0f0;
			.list{
				.item{
					height: 50px;
					background-color: #ffffff;
					box-shadow: 0px 0px 8px 1px 
						rgba(109, 109, 109, 0.11);
					display: flex;
					align-items: center;
					margin-bottom: 10px;
					.left{
						width: 35px;
						height: 35px;
						border-radius: 50%;
						margin: 0 9px;
						&>img{
							width: 100%;
							height: 100%;
							display: block;
							border-radius: 50%;
						}
					}
					.center{
						flex: 1;
						display: flex;
						flex-direction: column;
						span:nth-child(1){
							font-size: 15px;
							letter-spacing: 2px;
							color: #434964;
						}
						span{
							margin: 4px 0;
							font-size: 15px;
							letter-spacing: 2px;
							color: #b2b4bf;
						}
					}
					.right{
						width: 37.5px;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						&>i{
							display: block;
							width: 7.5px;
							height: 15px;
							background: url(../../assets/img/more.png) no-repeat;
							background-size: 100% 100%;
							
						}
					}
				}
			}
		}
	}
</style>