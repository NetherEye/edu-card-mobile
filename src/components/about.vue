<template>
	<div class="pub">
		<van-nav-bar title="关于" left-arrow @click-left="$router.go(-1)" />
		<div class="main">
			<p>中国教育V1.0.0</p>
			<p>紫光科技</p>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		components: {

		},
		created() {
			
		},
		methods: {
			
		},
		computed: {

		}

	}
</script>

<style lang="less" scoped>
.pub {
	background: #FFFFFF;
	height: 100%;
	
	.main{
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-top: 120px;
		p:nth-child(1){
			font-size: 15px;
			color: #6a708a;
			text-align: center;
			margin-bottom: 6px;
		}
		p:nth-child(2){
			font-size: 15px;
			color: #b2b4bf;
			text-align: center;
		}
	}
}
</style>