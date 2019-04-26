<template>
	<div class="pub">
		<div class="pub_top">
			<div class="card">
				<span v-if="!password">暂未发卡</span>
				<div class="passwordSpan" v-if="password">
					<i></i><span>{{password}}</span>
				</div>
			</div>
			<div class="p">
				<span>卡密码用于超额交易及自助充值机查询、充值、挂失、解挂等操作。</span>
				<span>如需修改密码，请通过自助充值机进行修改。</span>
			</div>
		</div>
	</div>
</template>

<script>
	import commonApi from '../assets/api/common.js'
	export default {
		data() {
			return {
				password: ''
			}
		},
		components: {
		
		},
		created() {
			this.getPassword()
		},
		mounted() {
			
		},
		methods: {
			getPassword(){
				this.password = '查询中...'
				this.$http.rq({
					url: commonApi.cardPassword
				}).then(res => {
					if (res.code === 200) {
						this.password = res.data
					} else {
						this.password = ''
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
		background: #FFFFFF;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		.pub_top{
			width: 352px;
			margin: 0 auto;
			margin-top: 5px;
			.card{
				height: 125px;
				background-color: #4091fd;
				box-shadow: 0px 0px 4px 1px 
					rgba(109, 109, 109, 0.11);
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				span{
					font-size: 20px;
					letter-spacing: 2px;
					color: #ffffff;
					font-weight: bold;
				}
				.passwordSpan{
					display: flex;
					align-items: center;
					justify-content: center;
					i{
						width: 15px;
						height: 18px;
						display: inline-block;
						background: url(../assets/img/ziyuanxhdpi.png) no-repeat center center;
						background-size: 100% 100%;
						margin-right: 10px;
					}
				}
			}
			.p{
				display: flex;
				flex-direction: column;
				span{
					font-size: 11px;
					color: #b2b4bf;
					line-height: 20px;
				}
			}
		}
	}
</style>
