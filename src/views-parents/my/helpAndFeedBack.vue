<template>
	<div class="pub">
		<van-nav-bar title="帮助与反馈" left-arrow @click-left="$router.go(-1)" />
		<div class="main use-car-style">
			<van-cell-group style="margin-bottom: 10px;">
				<van-cell title="产品意见" :border="false">
					
				</van-cell>
				<van-field
				    v-model="message"
				    type="textarea"
				    placeholder="请输入内容"
				    rows="4"
				    clearable
				    autosize
				  />
			</van-cell-group>
			
			<div class="btn" @click="sub">提交</div>
			
		</div>

	</div>
</template>

<script>
	import myApi from '../../assets/api/parents/my.js'
	export default {
		data() {
			return {
				message: ''
			}
		},
		components: {

		},
		created() {

		},
		methods: {
			sub(){
				if(this.message === ''){
					this.$toast('请输入内容')
					return
				}
				this.$http.rq({
					method: 'post',
					url: myApi.feedBack,
					data: {
						oppinion: this.message
					}
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.message = ''
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
		background: #F0F0F0;
		height: 100%;
		.main {
			background: #F0F0F0;
			.tou {
				display: inline-block;
				width: 31px;
				height: 31px;
			}
			.cj{
				background: #FFFFFF;
				font-size: 15px;
				color: #b2b4bf;
				height: 150px;
				&>p{
					height: 14px;
					line-height: 12px;
					padding-left: 12px;
					margin: 15px 0;
				}
			}
			.btn{
				height: 45px;
				margin: 0 12px;
				background-color: #1496ef;
				border-radius: 5px;
				letter-spacing: 2px;
				color: #ffffff;
				font-size: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				margin-top: 50px;
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