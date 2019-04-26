<template>
	<div class="pub">
		<van-nav-bar title="修改围栏" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<van-cell-group>
				<van-field label="围栏名称" v-model="form.fenceName" placeholder="请输入" />
			</van-cell-group>
			<van-cell-group>
				<div @click="typeShow = true">
					<van-field label="围栏报警" v-model="form.fenceAlarm" disabled placeholder="进围栏报警" />
				</div>
			</van-cell-group>
			<van-cell-group>
				<div class="my-cell">
					<span class="label">报警时间设置</span>
					<div class="my-cell-right">
						<div class="time1" @click="timeShow1 = true">
							<span>{{form.alarmStart}}</span><i></i>
						</div>
						<div class="pz"></div>
						<div class="time2" @click="timeShow2 = true">
							<span>{{form.alarmEnd}}</span><i></i>
						</div>
					</div>
				</div>
			</van-cell-group>
			<van-cell-group>
				<van-field label="围栏描述" v-model="form.fenceDescribe" placeholder="请输入" />
			</van-cell-group>

			<van-cell-group>
				<van-cell title="位置选择" />
			</van-cell-group>

			<div id="map">
			</div>

			<div class="btn" @click="sub">保存</div>
		</div>

		<van-popup v-model="typeShow">
			<div style="width: 200px;height: 100px;display: flex;align-items: center;justify-content: center;font-size: 18px;">
				<van-radio-group v-model="form.fenceAlarm">
					<van-radio name="进围栏报警">进围栏报警</van-radio>
					<van-radio name="出围栏报警">出围栏报警</van-radio>
				</van-radio-group>
			</div>
		</van-popup>
		
		<van-popup v-model="timeShow1" position="bottom">
			<van-datetime-picker
			  v-model="form.alarmStart"
			  type="time"
			  :show-toolbar="false"
			/>
		</van-popup>
		<van-popup v-model="timeShow2" position="bottom">
			<van-datetime-picker
			  v-model="form.alarmEnd"
			  type="time"
			  :show-toolbar="false"
			/>
		</van-popup>


	</div>
</template>

<script>
	import weilanApi from '../../assets/api/parents/weilan.js'
	export default {
		data() {
			return {
				form: {
					fenceName: '',
					fenceDescribe: '',
					fenceAlarm: '进围栏报警',
					alarmStart: '8:00',
					alarmEnd: '17:00',
					fenceXYZ: []
				},
				typeShow: false,
				timeShow1: false,
				timeShow2: false,
				marks: [],
				map: null,
				polygon: null
			}
		},
		components: {

		},
		created() {
			
		},
		mounted() {
			this.initMap()
		},
		methods: {
			initMap() {
				var map = new AMap.Map('map', {
					zoom: 11, //级别
					center: [106.63, 26.65], //中心点坐标
				});
				map.on('complete', () => {
					map.on('click', this.addMark);
					this.getDetail()
				});
				this.map = map
			},
			addMark(e) {
				let lat = e.lnglat.lat;
				let lng = e.lnglat.lng;

				var marker = new AMap.Marker({
					position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
					title: '点'
				});
				this.marks.push(marker)
				this.map.add(marker)
				if (this.marks.length === 1) {
					var path = [
						new AMap.LngLat(this.marks[0].getPosition().lng, this.marks[0].getPosition().lat)
					];

					var polygon = new AMap.Polygon({
						path: path,
						fillColor: '#fff', // 多边形填充颜色
						borderWeight: 2, // 线条宽度，默认为 1
						strokeColor: 'red', // 线条颜色
					});

					this.polygon = polygon
					this.map.add(polygon);
				} else {
					let arr = this.polygon.getPath();
					arr.push(new AMap.LngLat(lng, lat))
					this.polygon.setPath(arr)
				}

			},
			sub(){
				let par = {
					...this.form,
					fenceXYZ: []
				}
				if(this.marks.length < 3){
					this.$toast('围栏点数小于3')
					return
				}
				this.marks.forEach(a => {
					par.fenceXYZ.push({
						latitude: a.getPosition().lat,
						longitude: a.getPosition().lng
					})
				})
				par.fenceAlarm = par.fenceAlarm === '进围栏报警' ? 0 : 1;
				delete par.fenceXYZs
				delete par.fenceAlarmValue
				delete par.fenceStudents
				delete par.alarmTypeValue
				delete par.createTime
				delete par.createUser
				
				par.fenceXYZ = JSON.stringify(par.fenceXYZ)
				this.$http.rq({
					method: 'put',
					url: weilanApi.weilan,
					data: par
					
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.$router.go(-1)
					}else{
						
					}
				})
			},
			setWeilan(){
				this.marks = [];
				let path = []
				this.form.fenceXYZs.forEach(a => {
					this.marks.push(
						new AMap.Marker({
							position: new AMap.LngLat(a.longitude, a.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
							title: '点'
						})
					)
					path.push(
						new AMap.LngLat(a.longitude, a.latitude)
					)
				})
				
				var polygon = new AMap.Polygon({
					path: path,
					fillColor: '#fff', // 多边形填充颜色
					borderWeight: 2, // 线条宽度，默认为 1
					strokeColor: 'red', // 线条颜色
				});

				this.polygon = polygon
				
				this.map.add(this.marks)
				this.map.add(polygon)
			},
			getDetail(){
				this.$http.rq({
					url: weilanApi.weilan + '/' + this.$route.params.id
				}).then(res => {
					if(res.code === 200){
						res.data.fenceAlarm = res.data.fenceAlarm === 0 ? '进围栏报警' : '出围栏报警'
						this.form = res.data
						this.setWeilan()
					}else{
						this.$toast(res.message)
					}
				})
			}
		},
		watch: {

		},
		computed: {

		}

	}
</script>

<style lang="less" scoped>
	.pub {
		background: #f0f0f0;
		height: 100%;

		.wrap {
			background: #f0f0f0;
			.my-cell{
				height: 44px;
				display: flex;
				align-items: center;
				font-size: 14px;
				.label{
					margin-left: 14px;
					margin-right: 21px;
				}
				.my-cell-right{
					flex: 1;
					display: flex;
					align-items: center;
					color: #f0f0f0;
					.pz{
						width: 16px;
						height: 2px;
						background-color: #f0f0f0;
						border-radius: 1px;
						margin: 0 6px;
					}
					.time1, .time2{
						width: 88px;
						height: 30px;
						background-color: #f0f0f0;
						border-radius: 5px;
						color: #b2b4bf;
						display: flex;
						align-items: center;
						justify-content: space-between;
						i{
							display: block;
							width: 13px;
							height: 7.5px;
							background: url(../../assets/img/xl.png) no-repeat;
							background-size: 100% 100%;
							margin-right: 9px;
						}
						span{
							margin-left: 20px;
						}
					}
				}
			}
			.btn {
				margin: 0 12px;
				height: 45px;
				background-color: #1496ef;
				border-radius: 5px;
				font-size: 15px;
				letter-spacing: 2px;
				color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 44px;
			}

			#map {
				height: 260px;
			}
		}
	}
</style>
