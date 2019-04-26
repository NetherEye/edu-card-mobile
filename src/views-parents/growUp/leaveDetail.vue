<template>
	<div class="pub">
		<van-nav-bar title="请假详情" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="main">
			<div class="content use-car-style">
				<div class="sy" v-if="form.checkStatus !== '待审批'" :class="form.checkStatus === '已通过' ? 'tg' : form.checkStatus === '已驳回' ? 'btg' : ''	"></div>
				<van-cell-group style="margin-bottom: 9px;">
					<van-cell>
						<template slot="title">

							<div class="p-value">
								<span class="custom-text">学生姓名</span>
								<span class="val" @click="nameShow = true">
									<span>{{form.student['studentName']}}</span><i></i>
								</span>

								<van-popup v-model="nameShow" position="bottom" :overlay="true">
									<van-picker show-toolbar value-key="studentName" :columns="columns" @cancel="nameShow = false" @confirm="onConfirm" />
								</van-popup>

							</div>
						</template>

					</van-cell>
				</van-cell-group>
				<van-cell-group style="margin-bottom: 9px;">
					<van-cell>
						<template slot="title">

							<div class="p-value">
								<span class="custom-text">请假类型</span>
								<span class="val" @click="typeShow = true">
									<span>{{form.leaveType}}</span><i></i>
								</span>

								<van-popup v-model="typeShow" position="bottom" :overlay="true">
									<van-picker show-toolbar :columns="columns1" @cancel="typeShow = false" @confirm="onConfirm1" />
								</van-popup>

							</div>
						</template>

					</van-cell>
				</van-cell-group>
				<van-cell-group style="margin-bottom: 9px;">
					<van-cell>
						<template slot="title">
							<div class="p-value">
								<span class="custom-text">开始时间</span>
								<span class="val" @click="startShow = true">
									<span>{{form.startTime}}</span><i></i>
								</span>

								<van-popup v-model="startShow" position="bottom" :overlay="true">
									<van-datetime-picker
									  v-model="startTime"
									  type="date"
									  @cancel="startShow = false" @confirm="onConfirm2"
									/>
								</van-popup>

							</div>
						</template>

					</van-cell>
					<van-cell>
						<template slot="title">
							<div class="p-value">
								<span class="custom-text">结束时间</span>
								<span class="val" @click="endShow = true">
									<span>{{form.finishTime}}</span><i></i>
								</span>

								<van-popup v-model="endShow" position="bottom" :overlay="true">
									<van-datetime-picker
									  v-model="endTime"
									  type="date"
									  @cancel="endShow = false" @confirm="onConfirm3"
									/>
								</van-popup>

							</div>
						</template>

					</van-cell>
				</van-cell-group>
				<van-cell-group style="margin-bottom: 9px;">
					<van-cell>
						<template slot="title">

							<div class="p-value">
								<span class="custom-text">请假天数</span>
								<span class="val" @click="dayShow = true">
									<span>{{form.leaveDays}}</span><i></i>
								</span>

								<van-popup v-model="dayShow" position="bottom" :overlay="true">
									<van-picker show-toolbar :columns="columns4" @cancel="dayShow = false" @confirm="onConfirm4" />
								</van-popup>

							</div>
						</template>

					</van-cell>
				</van-cell-group>

				<van-cell-group style="margin-bottom: 9px;">
					<van-cell>
						<template slot="title">

							<div class="p-value">
								<span class="custom-text">请假事由</span>
								<span class="val">
									<van-field v-model="form.reason" type="textarea" clearable placeholder="请输入" />
								</span>

							</div>
						</template>

					</van-cell>
					
				</van-cell-group>

				<div class="sub-btn" @click="sub" v-if="this.form.checkStatus === '待审批'">修改提交</div>
			</div>
			
		</div>

	</div>
</template>

<script>
	import commonApi from '../../assets/api/common.js'
	import leaveApi from '../../assets/api/parents/leave.js'
	export default {
		data() {
			return {
				nameShow: false,
				typeShow: false,
				startShow: false,
				endShow: false,
				dayShow: false,
				value: '',
				form: {
					student: {},
					leaveType: '',
					startTime: '',
					finishTime: '',
					leaveDays: '',
					reason: ''
				},
				startTime: new Date(),
				endTime: new Date(),
				columns: [],
				students: [],
				columns1: ['病假', '事假', '其他'],
				columns4: ['1天', '2天', '3天'],
				goReject: false, // 是否为驳回提交
				list: [

				],
				loading: false,
				finished: false,
				currentPage: 1,
				pageSize: 15,
				total: 0,
				activeT: 'left'
			}
		},
		components: {

		},
		created() {
			this.getData()
			this.getChild()
		},
		methods: {
			getData(){
				this.$http.rq({
					url: leaveApi.leave + '/' + this.$route.params.id
				}).then(res => {
					if(res.code === 200){
						this.form.student = {
							unionId: res.data.unionId,
							studentName: res.data.personName
						}
						this.form['leaveType'] = res.data.leaveType
						this.form['startTime'] = res.data.startTime
						this.form['finishTime'] = res.data.finishTime
						this.form['leaveDays'] = res.data.leaveDays + '天'
						this.form['reason'] = res.data.reason
						this.form['checkStatus'] = res.data.checkStatus
						this.form['id'] = res.data.id
					}else{
						this.$toast(res.message)
					}
				})
			},
			getChild(){
				this.$http.rq({
					url: commonApi.getChild
				}).then(res => {
					if(res.code === 200){
						this.columns = res.data
						// this.form.student = res.data[0]
					}else{
						this.$toast(res.message)
					}
				})
			},
			sub(){
				let par = {
					unionId: this.form.student.unionId,
					personName: this.form.student.studentName,
					leaveType: this.form.leaveType,
					startTime: this.form.startTime,
					finishTime: this.form.finishTime,
					leaveDays: this.form.leaveDays,
					reason: this.form.reason,
					id: this.form['id']
				}
				par.leaveDays = Number(par.leaveDays.slice(0, -1))
				this.$http.rq({
					method: 'put',
					url: leaveApi.leave,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.getData()
						this.getChild()
					}else{
						
					}
					this.$toast(res.message)
				})
			},
			onConfirm(val, inx) {
				this.form['student'] = val
				this.nameShow = false
			},
			onConfirm1(val, inx) {
				this.form['leaveType'] = val
				this.typeShow = false
			},
			onConfirm2(val) {
				this.form['startTime'] = this.$moment(val).format('YYYY-MM-DD')
				this.startShow = false
			},
			onConfirm3(val) {
				this.form['finishTime'] = this.$moment(val).format('YYYY-MM-DD')
				this.endShow = false
			},
			onConfirm4(val, inx) {
				this.form['leaveDays'] = val
				this.dayShow = false
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
		user-select: none;
		.reject {
			.content {
				
				.bh {
					.title {
						height: 32px;
						color: #6a708a;
						letter-spacing: 1px;
						font-size: 12px;
						line-height: 32px;
						padding-left: 11px;
					}
				}
				.sub-btn {
					height: 45px;
					background-color: #1496ef;
					border-radius: 5px;
					text-align: center;
					line-height: 45px;
					cursor: pointer;
					margin: 0 12px;
					margin-top: 70px;
					span {
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 2px;
						color: #ffffff;
						font-size: 15px;
					}
				}
			}
		}
		.main {
			background: #f0f0f0;
			height: auto;
			.tabber {
				margin: 10px 12px;
				height: 32px;
				background-color: #ffffff;
				box-shadow: 0px 7px 18px 0px rgba(0, 0, 0, 0.13);
				border-radius: 32px;
				font-size: 15px;
				color: #b2b4bf;
				display: flex;
				justify-content: space-between;
				&>div {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.t-left {
					border-top-left-radius: 32px;
					border-bottom-left-radius: 32px;
				}
				.t-center {
					border-radius: 32px;
				}
				.t-right {
					border-top-right-radius: 32px;
					border-bottom-right-radius: 32px;
				}
				.activeTab {
					color: #FFFFFF;
					background-color: #4091fd;
				}
			}
			.content {
				position: relative;
				.sy{
					width: 72px;
					height: 77px;
					position: absolute;
					top: 16px;
					right: 12px;
					z-index: 99;
				}
				.tg{
					background: url(../../assets/images/second/tg2.png) no-repeat;
					background-size: 100% 100%;
				}
				.btg{
					background: url(../../assets/images/second/bh2.png) no-repeat;
					background-size: 100% 100%;
				}
				.custItem {
					height: 45px;
					display: flex;
					align-items: center;
					justify-content: center;
					&>span {
						font-size: 15px;
						color: #b2b4bf;
						margin-left: 3px;
					}
				}
				.p-value {
					display: flex;
					align-items: center;
					.val>span {
						margin-left: 12px;
						font-size: 15px;
						color: #6a708a;
					}
					.val>i {
						width: 13px;
						height: 7.5px;
						display: inline-block;
						background: url(../../assets/img/xl.png) no-repeat;
						background-size: 100% 100%;
						margin-left: 5px;
					}
				}
				.my-cell {
					height: 90px;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					.my-cell>span {
						width: 70px;
						display: flex;
						justify-content: flex-end;
						align-items: center;
						color: #6a708a;
						font-size: 15px;
						margin-right: 16px;
					}
					.circle-bg {
						width: 46px;
						height: 46px;
						background-color: #f0f0f0;
						border-radius: 23px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.sub-btn {
					height: 45px;
					font-size: 15px;
					letter-spacing: 2px;
					color: #ffffff;
					margin: 20px 12px;
					margin-bottom: 0;
					background-color: #1496ef;
					border-radius: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.message-item {
					background-color: #ffffff;
					box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
					margin-bottom: 10px;
					padding: 7px 0px;
					font-size: 12px;
					color: #6a708a;
					letter-spacing: 1px;
					position: relative;
					.ts {
						display: flex;
						justify-content: space-between;
						align-items: center;
						span:nth-child(1) {
							font-size: 15px;
							color: #434964;
							letter-spacing: 2px;
						}
						span:nth-child(2) {
							font-size: 12px;
							color: #b2b4bf;
							letter-spacing: 1px;
						}
					}
					&>p {
						margin: 9px 0;
						padding: 0px 12px;
						&>span {
							line-height: 20px;
						}
					}
					.is-agree {
						height: 45px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						&>div {
							flex: 1;
							height: 26px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.agree {
							&>i {
								display: inline-block;
								height: 25px;
								width: 25px;
								background: url(../../assets/images/second/ty.png) no-repeat;
								background-size: 100% 100%;
								margin-right: 5px;
							}
							&>span {
								font-size: 15px;
								color: #6a708a;
								letter-spacing: 2px;
							}
						}
						.disagree {
							&>i {
								display: inline-block;
								height: 25px;
								width: 25px;
								background: url(../../assets/images/second/bh1.png) no-repeat;
								background-size: 100% 100%;
								margin-right: 5px;
							}
							&>span {
								font-size: 15px;
								color: #6a708a;
								letter-spacing: 2px;
							}
						}
					}
					.watermark {
						position: absolute;
						width: 106px;
						height: 112px;
						right: 12px;
						top: 51px;
						font-size: 12px;
						letter-spacing: -1px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						&>p {
							display: flex;
							text-align: center;
							transform: rotate(30deg);
						}
						&>p:nth-child(1) {
							padding-left: 18px;
						}
						&>p:nth-child(3) {
							padding-right: 20px;
						}
					}
					.wateY {
						color: #61c06c;
						background: url(../../assets/images/second/tg.png) no-repeat;
						background-size: 100% 100%;
					}
					.wateN {
						color: #ff900d;
						background: url(../../assets/images/second/bh.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.no-padding-bottom {
					padding-bottom: 0;
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
</style>