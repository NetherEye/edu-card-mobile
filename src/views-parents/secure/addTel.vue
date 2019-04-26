<template>
	<div class="pub">
		<van-nav-bar title="添加亲情号" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<div class="cm">
				<div class="cir p"><span>父亲</span></div>
			</div>
			<van-cell-group>
				<van-field label="手机号码" v-model="pTel" placeholder="请输入手机号码" />
			</van-cell-group>
			<div style="height: 10px;"></div>
			<div class="cm">
				<div class="cir p"><span>母亲</span></div>
			</div>
			<van-cell-group>
				<van-field label="手机号码" v-model="mTel" placeholder="请输入手机号码" />
			</van-cell-group>
			<div style="height: 10px;"></div>
			<div class="cm">
				<div class="cir o"><span>其他</span></div>
			</div>
			<van-cell-group>
				<van-field label="手机号码" v-model="oTel" placeholder="请输入手机号码" />
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
				pTel: '',
				mTel: '',
				oTel: '',
				oldData: {}
			}
		},
		components: {

		},
		created() {
			this.getTel()
		},
		methods: {
			getTel() {
				this.$http.rq({
					url: telApi.getTel
				}).then(res => {
					if (res.code === 200) {
						this.oldData = res.data
						if(!res.data.familyNumberC){
							return
						}
						let arr = res.data.familyNumber.split(',')
						this.pTel = arr[0]
						this.mTel = arr[1]
						this.oTel = arr[2]
					} else {
						this.$toast(res.message)
					}
				})
			},
			sub(){
				let par = {
					familyNumber: this.pTel + ',' + this.mTel + ',' + this.oTel,
					sos: this.oldData.sos
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

		.wrap {
			background: #f0f0f0;

			.cm {
				height: 82.5px;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #ffffff;

				.cir {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					span {
						color: #ffffff;
						font-size: 15px
					}
				}

				.p {
					background-image: linear-gradient(0deg,
						#3369f3 0%,
						#55adff 100%);
					box-shadow: 0px 3px 10px 0px rgba(52, 107, 244, 0.3);
				}

				.m {
					background-image: linear-gradient(0deg,
						#00aeff 0%,
						#5de2ff 100%);
					box-shadow: 0px 3px 10px 0px rgba(3, 176, 255, 0.3);
				}

				.o {
					background-image: linear-gradient(0deg,
						#7356ff 0%,
						#8ab8ff 100%),
						linear-gradient(0deg,
						#3369f3 0%,
						#55adff 100%);
					background-blend-mode: normal,
						normal;
					box-shadow: 0px 3px 10px 0px rgba(52, 107, 244, 0.3);
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
		}
	}
</style>
