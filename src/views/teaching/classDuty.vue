<template>
	<div class="pub">
		<van-nav-bar title="班级值日" left-arrow @click-left="$router.go(-1)" @click-right="onSort" fixed>
			<div class="sort" slot="right">
				<span>回到本周</span>

			</div>
		</van-nav-bar>
		<div style="height: 44px;"></div>
		<div class="wrap">
			<div class="title">值日表</div>
			<div class="duty-con">
				<div class="duty-item van-hairline--bottom" v-for="item in list" :key="item.week">
					<div class="duty-item-left van-hairline--right">
						<span>{{item.date}}</span>
						<span>{{item.week}}</span>
					</div>
					<div class="duty-item-right">
						<span>{{item.name}}</span>
					</div>
				</div>
				<!--<div class="duty-item van-hairline--bottom" v-for="item in Tuesday" :key="item.week">
					<div class="duty-item-left van-hairline--right">
						<span>{{item.endTime}}</span>
						<span>{{item.Monday}}</span>
					</div>
					<div class="duty-item-right">
						<span>{{item.one}}</span>
					</div>
				</div>-->
			</div>
			<div class="duty-btns">
				<div class="duty-pre" @click="next('subDate')">上一周</div>
				<div class="duty-next" @click="next('addDate')">下一周</div>
			</div>
		</div>
	</div>
</template>

<script>
	import carApi from '../../assets/api/teacher/car.js'
	export default {
		data() {
			return {
				Monday: [],
				Tuesday: [],
				list: [],
				currentWeek: '',
				filter: {
					oneDate: ''
				}
			}
		},
		created() {
			this.getCurrentWeek()
			this.getData()
		},
		methods: {
			getCurrentWeek() {
				let w = this.$moment(new Date()).format('e')
				this.currentWeek = this.$moment(new Date()).subtract(w, 'd').format('YYYY-MM-DD')
				this.filter.oneDate = this.currentWeek
			},
			onSort() {
				this.filter.oneDate = this.currentWeek
				this.getData()
			},
			next(type) {
				let _type = type === 'addDate' ? 'add' : 'subtract'
				this.filter.oneDate = this.$moment(this.filter.oneDate)[_type](7, 'd').format('YYYY-MM-DD')
				this.getData()
			},
			getData() {
				var classId = JSON.parse(sessionStorage.getItem('class')).classId
				var gradeId = JSON.parse(sessionStorage.getItem('class')).gradeId
				let par = {
					gradeId: gradeId,
					classId: classId,
					...this.filter
				}
				// 校验
				this.$http.rq({
					url: carApi.applydutyRoster,
					data: par,
				}).then(res => {
					if(res.code === 200) {
						if(res.data.length == 0) {
							
						}
						let list = []
						let week = ['星期一', '星期二', '星期三', '星期四', '星期五']
						let arr = ['one', 'two', 'three', 'four', 'five']
						for(let i = 0; i < 5; i++) {
							if(!res.data[0]){
								list[i] = {
									week: week[i],
									name: '',
									date: this.$moment(this.filter.oneDate).add(i, 'd').format('M月DD日')
								}
								continue
							}
							
							let str = res.data[0][arr[i]]
							let ar = str.split(';')
							let name = '';
							ar.forEach(a => {
								let cr = a.split(',')
								name += cr[1] + ' '
							})
							list[i] = {
								week: week[i],
								name: name,
								date: this.$moment(this.filter.oneDate).add(i, 'd').format('M月DD日')
							}
						}
						this.list = list
					} else {
						this.list = []
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background-color: #f0f0f0;
		.wrap {
			background-color: #f0f0f0;
		}
		.title {
			font-size: 15px;
			letter-spacing: 2px;
			color: #434964;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #f0f0f0;
			height: 41px;
			font-weight: bold;
		}
		.duty-con {
			.duty-item {
				height: 60px;
				display: flex;
				color: #6a708a;
				.duty-item-left {
					width: 90px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 12px;
					letter-spacing: 1px;
					background-color: #fffefa;
					&>span {}
				}
				.duty-item-right {
					flex: 1;
					display: flex;
					padding-left: 15px;
					align-items: center;
					font-size: 15px;
					background-color: #ffffff;
				}
			}
		}
		.duty-btns {
			display: flex;
			justify-content: space-between;
			&>div {
				width: 74px;
				height: 34px;
				background-color: #ffffff;
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				letter-spacing: 1px;
				color: #1496ef;
				font-size: 12px;
				margin: 12px;
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
		z-index: 999 !important;
	}
</style>