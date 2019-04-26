<template>
	<div class="pub">
		<van-nav-bar title="用车申请" left-arrow @click-left="$router.push({name: '办公'})" @click-right="$router.push({name: '用车历史'})" fixed>
			<div class="sort" slot="right">
				<span>历史</span>
			</div>
		</van-nav-bar>
		<div style="height: 44px;"></div>
		<div class="wrap use-car-style">
			<van-actionsheet v-model="departmenetShow" :actions="actions" @select="onSelect" />
			<van-popup v-model="dateShow" position="bottom" :overlay="true">
				<van-datetime-picker v-model="date" type="date" @cancel="dateShow = false" @confirm="()=>{form[setDateType] = $moment(JSON.parse(JSON.stringify(date))).format('YYYY-MM-DD'); dateShow = false}" />
			</van-popup>

			<van-cell-group style="margin-bottom: 9px;">
				<div @click="departmenetShow = true">
					<van-field label="申请部门" disabled v-model="form.department.department" clearable />
				</div>
				<div class="van-hairline--bottom"></div>
			</van-cell-group>
			<van-cell-group style="margin-bottom: 9px;">
				<van-field label="用车事由" :maxlength="50" v-model="form.reason" type="textarea" clearable />
			</van-cell-group>
			<van-cell-group style="margin-bottom: 9px;">
				<van-field label="始发地点" :maxlength="30" v-model="form.originLocation" clearable />
				<van-field label="返回地点" :maxlength="30" v-model="form.remandLocation" clearable />
			</van-cell-group>

			<van-cell-group style="margin-bottom: 9px;">
				<div @click="() => {dateShow = true;setDateType = 'useDate'}">
					<van-field label="用车日期" disabled v-model="form.useDate" clearable />
				</div>
				<div @click="() => {dateShow = true;setDateType = 'remandDate'}">
					<van-field label="返回日期" v-model="form.remandDate" disabled clearable />
				</div>
			</van-cell-group>

			<!--车辆类型选择-->
			<van-popup v-model="carTypeShow" position="bottom">
				<van-picker show-toolbar :columns="columns" @cancel="carTypeShow = false" @confirm="onConfirm" />
			</van-popup>

			<van-cell-group style="margin-bottom: 9px;">

				<div class="van-hairline--bottom" v-for="(item, i) in form.carInfo" :key="'car' + i">
					<div @click="showCarSelect(i)">
						<van-field label="车辆类型" disabled v-model="item.carType" clearable />
					</div>
					<van-field label="车辆数量" v-model.number="item.carNumber" clearable />
				</div>

				<div class="custItem"><i class="add" @click="addCar"></i><span @click="addCar">增加车辆</span></div>
			</van-cell-group>

			<div class="my-cell" style="margin-bottom: 9px;">
				<div class="my-cell">
					<span>图片</span>
					<div class="circle-bg" style="border-radius: initial;" v-for="(item, i) in form.fileInfo" :key="'img' + i">
						<img :src="item.url">
					</div>
					<div class="circle-bg" style="border-radius: initial;">
						<input type="file" class="fileInput" @change="readFile">
						<i class="add"></i>
					</div>
				</div>
			</div>

			<div class="my-cell" style="margin-bottom: 9px;">
				<div class="my-cell">
					<span>审批人</span>
					<p>{{form.check.checkPerson}}</p>
					<div class="circle-bg" @click="go('check')">
						<i class="add"></i>
					</div>
				</div>
			</div>
			<div class="my-cell" style="margin-bottom: 9px;">
				<div class="my-cell">
					<span>抄送</span>
					<p>{{form.send.sendPerson}}</p>
					<div class="circle-bg" @click="go('send')"><i class="add"></i>
					</div>
				</div>
			</div>

			<div class="sub-btn" @click="submit">提交</div>

		</div>
	</div>
</template>

<script>
	import carApi from '../../assets/api/teacher/car.js'
	import commonApi from '../../assets/api/common.js'
	export default {
		data() {
			return {
				departmenetShow: false,
				actions: [],
				dateShow: false,
				date: new Date(),
				setDateType: '', // 设置时间的类型
				form: {
					department: {
						departmentId: '',
						department: ''
					},
					reason: '',
					originLocation: '',
					remandLocation: '',
					useDate: '',
					remandDate: '',
					carInfo: [{
						carType: '',
						carNumber: ''
					}],
					fileInfo: [],
					send: {
						sendId: '',
						sendPerson: ''
					},
					check: {
						checkId: '',
						checkPerson: ''
					},
				},
				nextPage: '', // 跳转类型 以此来获取选择人页面返回的数据时抄送人还是审批人

				// 车辆类型
				columns: ['轿车', 'SUV', '大巴车', '商务车'],
				activeCarIndex: 0, // 默认确定车辆类型赋值Index
				carTypeShow: false, // 车辆选择器显示状态
			}
		},
		beforeRouteEnter(to, from, next) {

			next(vm => {
				// 如果页面是从 选择人 跳转的
				if(from.name === '选择人') {
					// 获取 pageData 里的数据
					for(let i = 0; i < vm.$store.state.pageData.length; i++) {
						if(vm.$store.state.pageData[i].name === '选择人') {
							if(vm.nextPage === 'check') {
								vm.form.check = {
									checkId: vm.$store.state.pageData[i].list[0].teacherId,
									checkPerson: vm.$store.state.pageData[i].list[0].teacherName
								}
							} else if(vm.nextPage === 'send') {
								vm.form.send = {
									sendId: vm.$store.state.pageData[i].list[0].teacherId,
									sendPerson: vm.$store.state.pageData[i].list[0].teacherName
								}
							}
							break;
						}
					}
				}
				if(from.name === '办公') {
					vm.form = {
						department: {
							departmentId: '',
							department: ''
						},
						reason: '',
						originLocation: '',
						remandLocation: '',
						useDate: '',
						remandDate: '',
						carInfo: [{
							carType: '',
							carNumber: ''
						}],
						fileInfo: [],
						send: {
							sendId: '',
							sendPerson: ''
						},
						check: {
							checkId: '',
							checkPerson: ''
						},
					}
				}

			})
		},
		activated() {
			this.getDevList()
		},
		methods: {
			onSelect(item) {
				// 点击选项时默认不会关闭菜单，可以手动关闭
				this.form.department.departmentId = item.departmentId
				this.form.department.department = item.departmentName
				this.departmenetShow = false;
			},
			getDevList() {
				this.$http.rq({
					url: commonApi.getDepartment
				}).then(res => {
					if(res.code === 200) {
						res.data.forEach(a => {
							a['name'] = a.departmentName
						})
						this.actions = res.data
					} else {
						this.actions = []
						this.$toast(res.message)
					}
				})
			},
			addCar() {
				this.form.carInfo.push({
					carType: '',
					carNumber: ''
				})
			},
			readFile(e) {
				if(e.target.value === '') {
					return
				}
				let par = new FormData();
				par.append('file', e.target.files[0])

				this.$http.rq({
					method: 'post',
					url: commonApi.upload,
					data: par,
					notQs: true
				}).then(res => {
					if(res.code === 200) {
						this.form.fileInfo.push({
							url: res.data.url
						})
					} else {
						this.$toast(res.message)
					}
				})
			},
			go(type) {
				this.nextPage = type
				this.$router.push({
					name: '选择部门'
				})
			},
			submit() {
				// 处理数据
				let par = {
					departmentId: this.form.department.departmentId,
					department: this.form.department.department,
					originLocation: this.form.originLocation,
					reason: this.form.reason,
					remandLocation: this.form.remandLocation,
					remandDate: this.form.remandDate,
					useDate: this.form.useDate,
					checkId: this.form.check.checkId,
					checkPerson: this.form.check.checkPerson,
					sendId: this.form.send.sendId,
					sendPerson: this.form.send.sendPerson,
					carInfo: JSON.stringify(this.form.carInfo),
					fileInfo: JSON.stringify(this.form.fileInfo)
				}

				// 校验
				let attrs = ['departmentId', 'department', 'reason', 'originLocation', 'remandLocation', 'useDate', 'remandDate', 'checkId', 'checkPerson'],
					errs = ['申请部门不能为空', '申请部门不能为空', '用车事由不能为空', '始发地点不能为空', '返回地点不能为空', '用车日期不能为空', '返回日期不能为空', '审批人不能为空', '审批人不能为空'];

				for(let e = 0; e < attrs.length; e++) {
					if(par[attrs[e]] === '') {
						this.$toast(errs[e])
						return
					}
				}

				if(!this.$moment(par.useDate).isBefore(par.remandDate, 'day') && !this.$moment(par.useDate).isSame(par.remandDate, 'day')) {
					this.$toast('用车日期不能晚于返回日期')
					return
				}
				if(!this.$moment(new Date()).isBefore(par.useDate, 'day') && !this.$moment(new Date()).isSame(par.useDate, 'day')) {
					this.$toast('用车日期不能填过去的日期')
					return
				}

				if(this.form.carInfo.length === 0) {
					this.$toast('请填写用车')
					return
				} else {
					let carF = false
					this.form.carInfo.forEach(a => {
						if(carF) {
							return
						}
						if(a.carType === '') {
							this.$toast('车辆类型不能为空')
							carF = true
						}
						if(carF) {
							return
						}
						if(a.carNumber === '') {
							this.$toast('车辆数量不能为空')
							carF = true
						}
						if(carF) {
							return
						}
						if(!(/^[0-9]+$/.test(a.carNumber))) {
							this.$toast('车辆数量只能是正整数')
							carF = true
						}
						if(carF) {
							return
						}
						if(a.carNumber > 20 || a.carNumber <= 0) {
							this.$toast('车辆数量不能大于20小于等于0')
							carF = true
						}
					})
					if(carF) {
						return
					}
				}

				this.$http.rq({
					method: 'post',
					url: carApi.apply,
					data: par
				}).then(res => {
					if(res.code === 200) {
						this.$toast(res.message)
						this.$router.push({
							name: '用车历史'
						})
					} else {
						this.$toast(res.message)
					}
				})

			},
			// 车辆选择确定
			onConfirm(value, index) {
				if(this.form.carInfo[this.activeCarIndex]) {
					this.form.carInfo[this.activeCarIndex]['carType'] = value
					this.carTypeShow = false
				} else {
					this.$toast('error')
				}
			},
			// 显示车辆类型选择
			showCarSelect(i) {
				// 将是第几个车辆触发赋值给 activeCarSelect
				this.activeCarIndex = i
				this.carTypeShow = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background-color: #F0F0F0;
		.wrap {
			background-color: #F0F0F0;
			padding-bottom: 20px;
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
				&>p {
					font-size: 12px;
					color: black;
					margin-right: 2px;
				}
				.circle-bg {
					width: 46px;
					height: 46px;
					background-color: #f0f0f0;
					border-radius: 23px;
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					margin-right: 4px;
					.fileInput {
						position: absolute;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					&>img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.add {
			display: inline-block;
			width: 20px;
			height: 20px;
			background: url(../../assets/images/second/spr.png) no-repeat;
			background-size: 100% 100%;
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
	
	.use-car-style .van-cell__title span {
		font-size: 15px;
		color: #6a708a;
	}
	
	.use-car-style .van-field__body .van-field__control {
		font-size: 15px;
		color: black;
	}
</style>