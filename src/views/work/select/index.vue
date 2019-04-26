<template>
	<div class="pub">
		
		<router-view></router-view>
	</div>
</template>

<script>
	import commonApi from '../../../assets/api/common.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
.pub{
	height: 100%;
	background-color: #F0F0F0;
	.wrap{
		background-color: #F0F0F0;
		padding-bottom: 20px;
		
	}
}
</style>

