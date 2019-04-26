<template>
	<div class="pub">
		<van-nav-bar title="通知公告" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 46px;background: #f0f0f0;"></div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="message-item" v-for="item in list" :key="item.id" @click="$router.push({name: '通知公告详情', params: {id: item.id}})">
				<div class="i" v-if="!item.isRead"></div>
				<div class="p van-ellipsis">{{item.noticeName}}</div>
				<div class="time">{{$moment(item.publishTime, "YYYY-MM-DD hh:mm:ss").fromNow()}}</div>
			</div>
		</van-list>

	</div>
</template>

<script>
	import indexApi from '../../assets/api/teacher/index.js'
	export default {
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15,
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
					url: indexApi.notice,
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
		height: auto;
		user-select: none;
		.message-item {
			padding-left: 12px;
			background-color: #FFFFFF;
			height: 50px;
			
			display: flex;
			align-items: center;
			margin: 5px 0;
			box-shadow: 0px 0px 8px 1px 
				rgba(109, 109, 109, 0.11);
			.i {
				width: 5px;
				height: 5px;
				background-color: #e34000;
				border-radius: 50%;
				margin-right: 5px;
			}
			.p {
				font-size: 15px;
				color: #6a708a;
				letter-spacing: 2px;
				
				flex: 1;
			}
			.time {
				width: 60px;
				margin-right: 12px;
				font-size: 12px;
				color: #b2b4bf;
				text-align: right;
			}
			.goCmt {
				width: 55px;
				height: 25px;
				background-image: linear-gradient(-45deg, #0d90e9 0%, #27a8ff 100%);
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
</style>