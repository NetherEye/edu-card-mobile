<template>
	<div class="pub">
		<van-nav-bar title="设置SOS号码" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<!-- <van-cell-group>
			  <van-field label="姓名" v-model="value" placeholder="请输入姓名" />
			</van-cell-group>
			<van-cell-group>
			  <van-field label="手机号码" v-model="value" placeholder="请输入手机号码" />
			</van-cell-group> -->
			<van-cell-group>
			  <van-field label="SOS号码" v-model="sos" placeholder="请输入SOS号码" />
			</van-cell-group>
			
			<div class="btn" @click="sub">确定</div>
		</div>
		
		
		

	</div>
</template>

<script>
	import telApi from '../../assets/api/parents/tel.js'
	export default {
		data() {
			return {
				sos: '',
				oldData: {}
			}
		},
		components: {

		},
		created() {
			this.getTel()
		},
		methods: {
			getTel(){
				this.$http.rq({
					url: telApi.getTel
				}).then(res => {
					if(res.code === 200){
						this.oldData = res.data
						this.sos = res.data.sos
					}else{
						this.$toast(res.message)
					}
				})
			},
			sub(){
				let par = {
					familyNumber: this.oldData.familyNumber || '',
					sos: this.sos
				}
				
				this.$http.rq({
					method: 'post',
					url: telApi.tel,
					data: par
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.getData()
					}else{
						
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
		height: 100%;
		.wrap{
			background: #f0f0f0;
			.cm{
				height: 82.5px;
				background: #ffffff url(../../assets/img/xp.png) no-repeat center center;
				background-size: 51px 51px;
			}
			.btn{
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
				margin-top: 44px;			}
		}
	}
</style>