<template>
	<div class="pub">
		<van-nav-bar title="消费明细" left-arrow @click-left="$router.go(-1)" />
		<div style="height: 46px;"></div>
		<div class="wrap">
			<div class="top">
				<div class="date">
					<div @click="dateShow = true"> 
						<span>{{year}}</span>
						<van-icon name="arrow-down" color="#ffffff" />
					</div>
					<div @click="dateShow = true">
						<span>{{month}}</span>
						<van-icon name="arrow-down" color="#ffffff" />
					</div>
				</div>
				<div class="mx">
					<span>支出：￥{{record.expend}}</span>
					<span>收入：￥{{record.income}}</span>
				</div>
			</div>
			<div class="bottom">
				<div class="list">
					<div class="list-item" v-for="(item, index) in list" :key="index">
						<div class="l">
							<img src="../../assets/img/zc.png" v-if="extend.indexOf(item.tradetype) !== -1" />
							<img src="../../assets/img/sr.png" v-else />
						</div>
						<div class="c">
							<p>{{item.tradetype}}</p>
							<p>{{item.time}}</p>
						</div>
						<div class="r">
							<span style="color: #f7a426;" v-if="extend.indexOf(item.tradetype) !== -1">
								{{item.money}}
							</span>
							<span style="color: #4091fd;" v-else>
								{{item.money}}
							</span>
						</div>
					</div>


				</div>
			</div>
		</div>

		<van-popup v-model="dateShow" position="bottom">
			<van-datetime-picker v-model="currentDate" type="year-month" @cancel="dateShow = false" @confirm="setDate" :formatter="formatter" />
		</van-popup>
	</div>
</template>

<script>
	import payApi from '../../assets/api/parents/pay.js'
	export default {
		data() {
			return {
				record: {
					expend: '',
					income: ''
				},
				year: '',
				month: '',
				list: [],
				dateShow: false,
				currentDate: new Date(),
				extend: ['消费', '提现', '销户','缴费'], // 支出类型
				income: ['充值', '补贴'], // 收入类型
			}
		},
		components: {

		},
		created() {
			this.year = this.$moment(this.currentDate).format('YYYY');
			
			let m = this.$moment(this.currentDate).format('M');
			this.month = ['一', '二',  '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][Number(m) - 1] + '月'
			
			this.getList()
			
		},
		methods: {
			getList() {
				let par = {
					time: this.$moment(this.currentDate).format('YYYY-MM')
				}
				this.$http.rq({
					method: 'get',
					url: payApi.pay,
					data: par

				}).then(res => {

					if (res.code === 200) {
						this.list = res.data.records
						this.record = res.data.record
					} else {
						this.list = []
						this.record = {
							expend: '',
							income: ''
						};
						this.$toast(res.message)
					}
				})
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}`;
				} else if (type === 'month') {
					return `${value}月`
				}
				return value;
			},
			setDate(){
				this.year = this.$moment(this.currentDate).format('YYYY');
				
				let m = this.$moment(this.currentDate).format('M');
				this.month = ['一', '二',  '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][Number(m) - 1] + '月'
				this.getList()
				this.dateShow = false;
			}
		},
		watch: {
			currentDate(newV){
				
			}
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

		.wrap {
			position: absolute;
			top: 46px;
			bottom: 0;
			left: 0;
			right: 0;

			.top {
				height: 82px;
				background-color: #4091fd;

				.date {
					display: flex;
					padding-left: 12.5px;
					padding-top: 10px;

					&>div {
						background-color: #599ffc;
						border-radius: 2px;
						display: flex;
						align-items: center;
						height: 25.5px;
						padding: 0 5px;

						&>span {
							font-size: 15px;
							letter-spacing: 2px;
							color: #ffffff;
						}

						&>i {
							font-size: 15px;
							letter-spacing: 2px;
							color: #ffffff;
						}
					}

					&>div:nth-child(2) {
						margin-left: 10px;
					}
				}

				.mx {
					color: #ffffff;
					font-size: 15px;
					margin-top: 15px;
					margin-left: 12.5px;

					&>span:nth-child(2) {
						margin-left: 10px;
					}
				}
			}

			.bottom {
				.list {
					.list-item {
						height: 60px;
						display: flex;
						align-items: center;
						background-color: #ffffff;
						box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
						margin-bottom: 10px;

						.l {
							width: 40px;
							height: 40px;
							margin-left: 15px;

							&>img {
								display: inline-block;
								width: 100%;
								height: 100%;
							}
						}

						.c {
							flex: 1;
							margin-left: 16.5px;

							&>p:nth-child(1) {
								font-size: 15px;
								color: #434964;
							}

							&>p:nth-child(2) {
								font-size: 15px;
								color: #b2b4bf;
							}
						}

						.r {
							&>span {
								font-size: 18px;
								letter-spacing: 2px;
								margin-right: 11px;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
</style>
