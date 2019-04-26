<template>
	<div id="wrapper">
		<div class="box">
			<div class="logout" @click="logout">
			
			</div>
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
				localStorage.clear()
				sessionStorage.clear()
				window.location.href = '/proxy/logout'
				
			},
		}
	}
</script>

<style lang="less" scoped>
#wrapper{
	height: 100%;
	background: #f5f5f5;
	overflow: hidden;
	.box{
		width: 320px;
		height: 240px;
		background: url(../assets/img/otherLogin/title.png) no-repeat center center;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-top: 100px;
		position: relative;
		.logout{
			cursor: pointer;
			width: 60px;
			height: 60px;
			position: absolute;
			top: -40px;
			right: 10px;
			background: url(../assets/img/otherLogin/logout.png) no-repeat center center;
			background-size: 100% 100%;
		}
	}
	
}
</style>