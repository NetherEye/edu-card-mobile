<template>
	<div class="pub">
		<van-nav-bar title="设备报修历史" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="history-item" v-for="(item, i) in list" :key="i" @click="$router.push({name: '设备报修详情', params: {id: item.id}})">
					<div class="history-item-l">
						<span>{{item.applyTime}}</span>
					</div>
					<div class="history-item-r">
						<!--<span v-if="item.state !== 0" :class="item.state === 1 ? 'tg' : 'btg'"></span>-->
					</div>
				</div>
			</van-list>
		</div>

	</div>
</template>

<script>
	import repairsApi from '../../assets/api/teacher/repairs.js'
	export default {
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15
			}
		},
		components: {

		},
		created() {
		},
		methods: {
			onLoad() {
				let par = {
					pageNumber: this.currentPage,
					pageSize: this.pageSize
				}
				this.$http.rq({
					url: repairsApi.repairsHistory,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.list = this.list.concat(res.data)
					}else{
						this.finished = true
					}
					this.loading = false;
					if(this.list.length >= res.total){
						this.finished = true
					}else{
						this.currentPage++
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
		background: #f0f0f0;
		height: 100%;
		.wrap{
			background: #f0f0f0;
		}
		.history-item{
			height: 60px;
			background-color: #ffffff;
			box-shadow: 0px 0px 8px 1px 
				rgba(109, 109, 109, 0.11);
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 41px 0 24px;
			margin-bottom: 10px;
			.history-item-l{
				span{
					letter-spacing: 2px;
					color: #434964;
					font-size: 15px;
				}
			}
			.history-item-r{
				display: flex;
				align-items: center;
				span{
					display: inline-block;
					width: 50px;
					height: 52px;
				}
				.tg{
					background: url(../../assets/images/second/tg2.png) no-repeat;
					background-size: 100% 100%;
				}
				.btg{
					background: url(../../assets/images/second/bh2.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>