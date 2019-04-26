<template>
	<div class="pub">
		
		<div class="header">
			<span>办公</span>
		</div>
		
		<div style="height: 10px;background: #f0f0f0;"></div>

		
		<div class="app-item">
			<div class="top-header van-hairline--bottom">
				<div class="left">
					<span>办公助手</span>
					
				</div>
			</div>
			<div class="bottom-app">
				<div class="item" v-for="item in c_apps" :key="item.name" @click="$router.push({name: item.to})">
					<img :src="item.icon" v-if="item.icon" />
					<div v-else style="width: 65px;height: 65px;"></div>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
		
		<div style="height: 10px;background: #f0f0f0;"></div>
		<div style="height: 48px;"></div>

		<my-tabbar :active="active">
		</my-tabbar>

	</div>
</template>

<script>
	import myTabbar from '@/components/myTabbar'
	export default {
		data() {
			return {
				active: 2,
				apps: [
					{
						name: '用车申请',
						to: '用车申请',
						icon: require("../../assets/images/first/ycsq.png")
					},
					{
						name: '场地预约',
						to: '场地预约',
						icon: require("../../assets/images/first/wdyy.png")
					},
					{
						name: '设备报修',
						to: '设备报修',
						icon: require("../../assets/images/first/sbbx.png")
					},
					{
						name: '通讯录',
						to: '通讯录',
						icon: require("../../assets/images/first/txl.png")
					},
					{
						name: '我的审批',
						to: '我的审批',
						icon: require("../../assets/images/first/wdsp.png")
					},
					
					
				],
			
				
			}
		},
		methods: {
			
		},
		components: {
			'my-tabbar': myTabbar
		},
		computed: {
			c_apps(){
				let arr = []
				if((this.apps.length % 4) != 0){
					arr = this.apps;
					for (let i = 1, len = 4 - (this.apps.length % 4); i <= len; i++) {
						arr.push({})
					}
				}else{
					arr = this.apps
				}
				return arr
			}
		}
		
	}
</script>

<style lang="less" scoped>
.pub{
	height: 100%;
	background: #f0f0f0;
	.header{
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		span{
			font-size: 18px;
			letter-spacing: 2px;
			color: #434964;
			font-weight: bold;
		}
	}
	.banner-img{
		width: 100%;
		height: 150px;
		display: block;
	}
	.app-item{
		padding-bottom: 10px;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 8px 1px 
		rgba(109, 109, 109, 0.11);
		
		
		.top-header{
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			/*border-bottom: .5px solid #d7d7d7;*/
			.left{
				display: flex;
				align-items: center;
				span{
					color: #434964;
					font-size: 15px;
					letter-spacing: 1px;
					margin-left: 11px;
				}
			}
			.right{
				width: 60.5px;
				height: 25.5px;
				background-color: #429ef4;
				border-top-left-radius: 26px;
				border-bottom-left-radius: 26px;
				display: flex;
				align-items: center;
				justify-content: center;
				.edit{
					display: flex;
					align-items: center;
					justify-content: center;
					span{
						font-size: 12px;
						color: #ffffff;
					}
				}
			}
			.more{
				display: flex;
				align-items: center;
				padding-left: 6px;
				span:nth-child(1){
					font-size: 12px;
					color: #434964;
				}
			}
		}
		.bottom-app{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				margin: 10px 12px 0px 12px;
				img{
					width: 65px;
					height: 65px;
				}
				span{
					font-size: 13px;
					color: #6a708a;
				}
			}
			.message-item{
				padding-left: 12px;
				width: 100%;
				display: flex;
				align-items: center;
				
				margin: 10px 0;
				.i{
					width: 5px;
					height: 5px;
					background-color: #e34000;
					border-radius: 50%;
					margin-right: 3px;
				}
				.p{
					font-size: 12px;
					color: #6a708a;
					flex: 1;
				}
				.time{
					width: 60px;
					margin-right: 12px;
					font-size: 12px;
					color: #b2b4bf;
					text-align: right;
				}
				.goCmt{
					width: 55px;
					height: 25px;
					background-image: linear-gradient(-45deg, 
						#0d90e9 0%, 
						#27a8ff 100%);
					border-radius: 2px;
					font-size: 12px;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 11px;
					cursor: pointer;
				}
			}
		}
	}
}


</style>

<style>
	.van-tabbar-item{
		color: #8a8c9a;
	}
	.van-tabbar-item--active{
		color: #0284dc;
	}
	
</style>