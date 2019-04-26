<template>
	<div class="pub">
		<van-nav-bar title="通知公告" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 46px;background: #f0f0f0;"></div>
		<div class="autoRead"><span @click="allRead">一键阅读</span></div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="message-item" v-for="(item, index) in list" :key="item.id" @click="$router.push({name: '通知详情', params: {id: item.id}})">
				<van-swipe-cell :right-width="100">
						<div class="cel-item">
							<div class="i" v-if="!item.isRead"></div>
							<div class="p van-ellipsis">
								<p>{{item.title}}</p>
								<p class="van-ellipsis">{{item.noticeName}}</p>
							</div>
							<div class="time">{{$moment(item.publishTime, "YYYY-MM-DD hh:mm:ss").fromNow()}}</div>
						</div>
					<div slot="right" class="leftSide">
						<span @click="read(item.id)">已读</span>
						<span @click="del(item.id)">删除</span>
					</div>
				</van-swipe-cell>
				
			</div>
		</van-list>
		
		

	</div>
</template>

<script>
	import indexApi from '../../assets/api/parents/index.js'
	export default {
		data() {
			return {
				list: [],
				messages: [
					{
						is: true,
						title: '提示',
						message: '赖萌萌发来请假申请 ',
						to: '通知详情',
						time: '1分钟前',
						id: 1
					},
					{
						title: '作业',
						is: true,
						message: '学校发布了《元旦放假通知》！ ',
						to: '通知详情',
						time: '5分钟前',
						id: 2
					},
					{
						title: '提示',
						is: false,
						to: '通知详情',
						message: '今天还有3名同学没签到哦！ ',
						time: '15分钟前',
						id: 3
					},
					
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
			for (let i = 1; i <= 4; i++) {
				this.messages = this.messages.concat(this.messages)
			}
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
			},
			allRead(){
				this.$http.rq({
					url: indexApi.allRead
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.currentPage = 1
						this.list = [];
						this.finished = false
					}
				})
			},
			read(id){
				this.$http.rq({
					url: indexApi.notice + '/' + id
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.currentPage = 1
						this.list = [];
						this.finished = false
					}
				})
			},
			del(id){
				this.$http.rq({
					url: indexApi.delNotice + '/' + id
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.currentPage = 1
						this.list = [];
						this.finished = false
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
		.autoRead{
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			span{
				width: 58.5px;
				height: 17.5px;
				background-color: #419dec;
				box-shadow: 0px 0px 5px 0px 
					rgba(155, 155, 155, 0.2);
				border-radius: 9px;
				color: #ffffff;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 12px;
			}
		}
		.message-item {
			.van-swipe-cell{
				width: 100%;
			}
			.cel-item{
				width: 100%;
				padding-left: 12px;
				background-color: #FFFFFF;
				height: 50px;
				
				display: flex;
				align-items: center;
				margin: 5px 0;
				box-shadow: 0px 0px 8px 1px 
					rgba(109, 109, 109, 0.11);
			}
			
			.i {
				width: 5px;
				height: 5px;
				background-color: #e34000;
				border-radius: 50%;
				margin-right: 5px;
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
			.leftSide{
				width: 100px;
				height: 100%;
				display: flex;
				span{
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 12px;
					letter-spacing: 1px;
					height: 100%;
					width: 50px;
					color: #ffffff;
				}
				span:nth-child(1){
					background-color: #cccccc;
				}
				span:nth-child(2){
					background-color: #ec4141;
					
				}
			}
		}
	}
</style>