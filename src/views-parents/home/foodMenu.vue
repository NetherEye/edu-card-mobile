<template>
	<div class="pub">
		<van-nav-bar title="菜谱" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 46px;background: #f0f0f0;"></div>
		<div class="wrap">

			<van-popup v-model="show" position="bottom">
				<van-datetime-picker @cancel="show = false" @confirm="setDate" v-model="currentDate" type="date" />
			</van-popup>
			<div style="height: 5px;background: #f0f0f0;"></div>
			<div class="time van-hairline--bottom">
				<span @click="show = true">{{$moment(currentDate).format('YYYY-MM-DD')}}</span><i :class="show ? 'aI' : ''"></i>
			</div>
			<div class="ul" v-if="list.length != 0">
				 <li v-for="(item, index) in list" :key="index">
					<img :src="item.url" />
					<span>{{item.mealinfoName}}</span>
				</li> 
			</div>
			<div class="noData" v-else>
				<span>暂无数据</span>
			</div>
		</div>

	</div>
</template>

<script>
	import foodApi from '@/assets/api/parents/food.js'
	export default {
		data() {
			return {
				list: [],
				currentDate: new Date(),
				show: false
			}
		},
		components: {

		},
		created() {
			this.getData()
		},
		methods: {
			getData(){
				let par = {
					time: this.$moment(this.currentDate).format('YYYY-MM-DD')
				}
				this.$http.rq({
					url: foodApi.list,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.list = res.data
					}else{
						this.list = []
					}
				})
			},
			setDate(){
				this.getData()
				this.show = false
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
		position: relative;
		.wrap {
			position: absolute;
			top: 46px;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFFFF;
			.ul {
				margin: 10px 12px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				li {
					width: 105px;
					height: 109px;
					background-color: #ffffff;
					box-shadow: 0px 0px 18px 0px rgba(90, 90, 90, 0.23);
					float: left;
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-bottom: 15px;
					img {
						display: inline-block;
						width: 105px;
						height: 80px;
					}
					span {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 12px;
						letter-spacing: 2px;
						color: #666666;
					}
				}
			}
			.time {
				height: 25px;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
				span {
					font-size: 14px;
					letter-spacing: 1px;
					color: #434964;
				}
				i{
					display: inline-block;
					background: url(../../assets/img/xl1.png) no-repeat;
					width: 7.5px;
					height: 5px;
					background-size: 100% 100%;
					margin-left: 4px;
					transition: all .3s;
				}
				.aI{
					transform: rotateZ(180deg);
				}
			}
		}
	}
</style>