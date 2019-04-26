<template>
	<div class="pub">
		<van-nav-bar title="请假审批" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="main">
			<router-view></router-view>
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
		background: #f0f0f0;
		height: 100%;
		.main {
			background: #f0f0f0;
			height: auto;
			
		}
	}
</style>