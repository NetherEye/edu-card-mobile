<template>
	<div class="pub">
		<van-nav-bar title="考试" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 46px;background: #f0f0f0;"></div>
		<div class="wrap">
			<div v-if="list.length != 0" class="message-item" v-for="(item, index) in list" :key="index">
				<div class="cel-item">
					<div class="p van-ellipsis">
						<p>{{item.gradeName + item.className}}</p>
						<p class="van-ellipsis">考试科目：{{item.subjectName}}</p>
						<p class="van-ellipsis">考试时间：{{item.startTime}}</p>
					</div>
				</div>
			</div>
			<div class="noData" v-else>
				<span>暂无数据</span>
			</div>
		</div>
		
		

	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [
// 					{
// 						is: true,
// 						title: '七年级上期末考试',
// 						message: '考试科目：语文 ',
// 						time: '考试时间：2018年1月1日上午9:00-11:30',
// 						id: 1
// 					},
					
				],
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15,
				total: 0
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
					url: '/proxy/patriarch/examRoom'
				}).then(res => {
					if(res.code === 200){
						this.list = res.data
						
					}else if(res.code === 201){
						this.list = []
						this.$toast(res.message)
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
	height: 100%;
	background-color: #F0F0F0;
	position: relative;
	.wrap{
		position: absolute;
		top: 51px;
		bottom: 0;
		left: 0;
		right: 0;
		
		.message-item {
			.van-swipe-cell{
				width: 100%;
			}
			.cel-item{
				width: 100%;
				padding-left: 12px;
				background-color: #FFFFFF;
				height: 72.5px;
				
				display: flex;
				align-items: center;
				margin: 5px 0;
				box-shadow: 0px 0px 8px 1px 
					rgba(109, 109, 109, 0.11);
			}
			.p {
				font-size: 13px;
				color: #6a708a;
				letter-spacing: 1px;
				flex: 1;
				
				&>p:nth-child(1){
					font-size: 15px;
					letter-spacing: 2px;
					color: #434964;
				}
				p{
					margin: 2px 0;
				}
			}
			.time {
				width: 60px;
				margin-right: 12px;
				font-size: 12px;
				color: #b2b4bf;
				text-align: right;
			}
			
		}
	}
	
}
</style>