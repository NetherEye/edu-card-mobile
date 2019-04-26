<template>
	<div id="wrapper">
		<div>
			<p style="margin-top: 20px;">
				<van-notice-bar :scrollable="false">
					仅支持家长和教师用户访问
				</van-notice-bar>
			</p>
			<p style="margin-top: 20px;">
				<van-button type="primary" size="large" @click="logout">退出</van-button>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			logout(){
				sessionStorage.clear()
				window.location.href = '/proxy/logout'
				
			},
		}
	}
</script>

<style lang="less" scoped>
	#wrapper {
		height: 100%;
		position: relative;
		&>div {
			height: 100%;
			overflow: hidden;
			&>p {
				font-size: 16px;
				text-align: center;
			}
		}
	}
</style>