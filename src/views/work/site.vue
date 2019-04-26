<template>
	<div class="pub">
		<van-nav-bar title="场地预约" left-arrow @click-left="$router.go(-1)" @click-right="$router.push({name: '场地预约历史'})" fixed>
			<div class="sort" slot="right">
				<span>历史</span>
			</div>
		</van-nav-bar>
		<div style="height: 44px;"></div>
		<div class="wrap">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
				<!--<div class="history-item" v-for="(item, i) in tableData" :key="i">
					<div class="history-item-l" style="display: flex;">
						<span style="font-size: 16px;color: #434964;">{{item.placeName}}</span>
						<div id="" style="font-size: 14px; color: #969799;">
							可容纳人数：{{item.containPerson}}
						</div>
					</div>
					<div slot="right-icon" class="goMark">
						<span @click="$router.push({name: '预约场地', params: {id: item.id,placeName:item.placeName,containPerson:item.containPerson}})">预约</span>
					</div>
				</div>-->
				<div id="" v-for="(item, i) in tableData" :key="i">
				<van-cell-group style="margin: 5px 0;" :border="false">
					<van-cell title-class="cell-title" label-class="cell-label">
						<div slot="title" class="custTitle">
							<div class="top">
								<span>{{item.placeName}}</span>
							</div>
							<div class="center">
								<span>可容纳人数：{{item.containPerson}}</span>
							</div>
						</div>
						<div slot="right-icon" class="goMark">
					<!--	<span @click="$router.push({name: '预约场地', params: {id: item.id,placeName:item.placeName,containPerson:item.containPerson}})">预约</span>-->
						<span @click="$router.push({name: '预约场地', params: {id: item.id}})">预约</span>				
						</div>
					</van-cell>
				</van-cell-group>
			</div>
			</van-list>
		</div>
	</div>
</template>

<script>
	import carsite from '../../assets/api/teacher/site.js'
	export default {
		data() {
			return {
				value: '',
				tableData: [],
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15
			}
		},
		created() {

		},
		methods: {
			onSort() {

			},
			getData() {
				let par = {
					pageNumber: this.currentPage,
					pageSize: this.pageSize
				}
				this.$http.rq({
					data: par,
					url: carsite.siteplacelist
				}).then(res => {
					if(res.code === 200) {
						this.tableData = this.tableData.concat(res.data)
					} else {
						this.finished = true
					}
					this.loading = false;
					if(this.tableData.length >= res.total) {
						this.finished = true
					} else {
						this.currentPage++
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background-color: #F0F0F0;
		.wrap {
			background-color: #F0F0F0;
			.van-cell{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.goMark {
				width: 70px;
				height: 35px;
				background-color: #1496ef;
				box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				&>span {
					font-size: 12px;
					letter-spacing: 2px;
					color: #ffffff;
				}
			}
			.end {
				background-color: #d4d4d4;
			}
			.custTitle {
				.top {
					display: flex;
					p {
						font-size: 12px;
						letter-spacing: 1px;
						color: #b2b4bf;
						padding-left: 10px;
					}
				}
				.center,
				.bottom {
					display: flex;
					span {
						font-size: 12px;
						letter-spacing: 1px;
						color: #b2b4bf;
					}
				}
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
		z-index: 999!important;
	}
	
	.use-car-style .van-cell__title span {
		font-size: 15px;
		color: #6a708a;
	}
	
	.use-car-style .van-field__body .van-field__control {
		font-size: 15px;
		color: #b2b4bf;
	}
	
	.cell-title span {
		font-size: 15px;
		letter-spacing: 2px;
		color: #434964;
	}
	
	.cell-lable {
		font-size: 12px;
		letter-spacing: 1px;
		color: #b2b4bf;
	}
</style>