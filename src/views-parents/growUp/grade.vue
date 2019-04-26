<template>
	<div class="pub">
		<van-nav-bar title="成绩" left-arrow @click-left="$router.go(-1)" fixed/>
		<div style="height: 46px;background: #f0f0f0;"></div>
		<div style="height: 5px;background: #f0f0f0;"></div>
		<div class="wrap">
			<div class="youChild">
				<i></i>
				<span>{{studentName}}</span>
			</div>
			<div class="list">
				<!--<div class="message-item" v-for="(item, index) in list" :key="index" @click="$router.push({name: item.to, params: {id: item.id}})">
					<div class="cel-item">
						<div class="i" v-if="item.is"></div>
						<div class="p van-ellipsis">
							<p>{{item.title}}</p>
							<p class="van-ellipsis">{{item.message}}</p>
						</div>
						<div class="time">{{item.time}}</div>
					</div>

				</div>-->
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getlist">
					<div class="message-item" v-for="(item, index) in list" :key="index" @click="$router.push({name: '家长成绩详情',params: {examType: item.examType}})">
						<div class="cel-item">
							<div class="i" v-if="item.is"></div>
							<div class="p van-ellipsis">
								<p>{{item.examType}}</p>
								<p class="van-ellipsis">{{item.schoolYear}}</p>
							</div>
							<div class="time">{{item.semester}}</div>
						</div>
					</div>

				</van-list>
			</div>
		</div>

	</div>
</template>

<script>
	import patriApi from '../../assets/api/parents/patri.js'
	import patricommon from '../../assets/api/common.js'
	export default {
		data() {
			return {
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15,
				tableData: [], //成绩立标
				studentName: '', //学生id
				list: [

				],
			}
		},
		created() {
			if(JSON.parse(sessionStorage.getItem('child')).studentName != undefined) {
				this.studentName = JSON.parse(sessionStorage.getItem('child')).studentName
			}
		},

		methods: {
		                       
			getlist() {
				var arr = JSON.parse(sessionStorage.getItem('child')).classId
				let par = {
					classId: arr,
					pageNumber: this.currentPage,
					pageSize: this.pageSize,
				}
				this.$http.rq({
					data: par,
					url: patriApi.getscore,
				}).then(res => {

					if(res.code === 200){
						this.list = this.list.concat(res.data)
					}else{
						this.$toast(res.message);
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
		},
		watch: {

		}

	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background-color: #F0F0F0;
		position: relative;
		.wrap {
			position: absolute;
			top: 51px;
			bottom: 0;
			left: 0;
			right: 0;
			.youChild {
				height: 50px;
				background-color: #ffffff;
				box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
				display: flex;
				align-items: center;
				span {
					font-size: 15px;
					letter-spacing: 2px;
					color: #6a708a;
					margin-left: 10px;
					display: flex;
					align-items: center;
				}
				i {
					display: inline-block;
					width: 44px;
					height: 46px;
					background: url(../../assets/img/tou.png) no-repeat;
					background-size: 100% 100%;
					margin-left: 12px;
				}
			}
			.message-item {
				.van-swipe-cell {
					width: 100%;
				}
				.cel-item {
					width: 100%;
					padding-left: 12px;
					background-color: #FFFFFF;
					height: 50px;
					display: flex;
					align-items: center;
					margin: 5px 0;
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
			}
		}
	}
</style>