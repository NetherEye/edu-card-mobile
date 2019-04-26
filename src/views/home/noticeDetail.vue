<template>
	<div class="pub">
		<div class="main">
			<van-nav-bar title="通知公告详情" left-arrow @click-left="$router.go(-1)" fixed />
			<div style="height: 46px;background: #FFFFFF;"></div>
			<div class="notice">
				<div class="title van-hairline--bottom">{{form.noticeName}}</div>
				<!-- <p class="p-name">各位教职工：</p> -->
				<p class="p-p">{{form.noticeContent}}</p>
				<!-- <p class="p-name">祝：元旦快乐!</p> -->
				<p class="p-right">{{form.publisherName}}</p>
				
				<p class="p-right">{{form.publishTime}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import indexApi from '../../assets/api/teacher/index.js'
	export default {
		data() {
			return {
				form: {}
			}
		},
		components: {

		},
		created() {
			this.getNotice()
		},
		methods: {
			getNotice(){
				this.$http.rq({
					url: indexApi.notice + '/' + this.$route.params.id
				}).then(res => {
					if(res.code === 200){
						this.form = res.data
					}else{
						this.form = {}
						this.$toast(res.message)
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
		height: auto;
		display: flex;
		.main{
			flex: 1;
		}
		.notice{
			font-size: 12px;
			color: #6a708a;
			.title{
				letter-spacing: 1px;
				color: #434964;
				font-size: 15px;
				height: 45px;
				line-height: 45px;
				padding-left: 13px;
				background-color: #FFFFFF;
			}
			.p-name{
				margin-top: 15px;
			}
			.p-right{
				text-align: right;
				margin: 5px 0;
			}
			.p-p{
				text-indent: 26px;
				line-height: 30px;
			}
			p{
				padding: 0 10px 0 13px;
				letter-spacing: 1px;
			}
		}
	}
</style>
