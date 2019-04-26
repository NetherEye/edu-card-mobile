<template>
	<div class="pub">
		<van-nav-bar title="围栏设置" left-arrow @click-left="$router.go(-1)" @click-right="$router.push({name: '围栏操作'})" fixed>
			<div class="sort" slot="right">
				<span>添加</span>
			</div>
		</van-nav-bar>
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<div class="message-item van-hairline--bottom" v-for="(item, index) in list" :key="index">
				<van-swipe-cell :right-width="100">
					<div class="cel-item">
						<div class="p van-ellipsis">
							<p>{{item.fenceName}}</p>
						</div>
						<!--<div class="time">{{item.time}}</div>-->
					</div>
					<div slot="right" class="leftSide">
						<span @click="$router.push({name: '围栏修改', params: {id: item.id}})">修改</span>
						<span @click="del(item)">删除</span>
					</div>
				</van-swipe-cell>

			</div>
		</div>



	</div>
</template>

<script>
	import weilanApi from '../../assets/api/parents/weilan.js'
	export default {
		data() {
			return {
				list: [

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
			this.getList()
		},
		methods: {
			getList() {
				this.$http.rq({
					url: weilanApi.weilan
				}).then(res => {
					if (res.code === 200) {
						this.list = res.data
					} else {
						this.list = []
						this.$toast(res.message)
					}
				})
			},
			del(item) {
				this.$dialog.confirm({
					title: '提示',
					message: '是否删除' + item.fenceName + '？'
				}).then(() => {
					this.$http.rq({
						method: 'DELETE',
						url: weilanApi.weilan + '/' + item.id
					}).then(res => {
						this.$toast(res.message)
						if (res.code === 200) {
							this.getList()
						} else {

						}
					})
				}).catch(() => {
					// on cancel
				});
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

		.wrap {
			background: #f0f0f0;
		}

		.message-item {
			.van-swipe-cell {
				width: 100%;
			}

			.cel-item {
				width: 100%;
				padding-left: 23px;
				background-color: #FFFFFF;
				height: 50px;

				display: flex;
				align-items: center;
				box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
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

				&>p:nth-child(1) {
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

			.leftSide {
				width: 100px;
				height: 100%;
				display: flex;

				span {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 12px;
					letter-spacing: 1px;
					height: 100%;
					width: 50px;
					color: #ffffff;
				}

				span:nth-child(1) {
					background-color: #1496ef;
				}

				span:nth-child(2) {
					background-color: #f7a426;

				}
			}
		}
	}
</style>
