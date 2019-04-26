<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" />
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" />
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
	export default{
		created(){
			
		}
	}
</script>

<style lang="less">
	#app {
		background-color: #FFFFFF;
	}
</style>
