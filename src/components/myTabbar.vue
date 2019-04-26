<template>
	<van-tabbar v-model="current">
		<van-tabbar-item :to="{name: '教师首页'}">
			<span>首页</span>
			<img slot="icon" slot-scope="props" :src="props.active ? icons[0].active : icons[0].normal">
		</van-tabbar-item>
		
		<van-tabbar-item :to="{name: '教学'}">
			<span>教学</span>
			<img slot="icon" slot-scope="props" :src="props.active ? icons[1].active : icons[1].normal">
		</van-tabbar-item>
		
		<van-tabbar-item :to="{name: '办公'}">
			<span>办公</span>
			<img slot="icon" slot-scope="props" :src="props.active ? icons[2].active : icons[2].normal">
		</van-tabbar-item>
		
		<van-tabbar-item :to="{name: '教师我的'}">
			<span>我的</span>
			<img slot="icon" slot-scope="props" :src="props.active ? icons[3].active : icons[3].normal">
		</van-tabbar-item>
		
	</van-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				icons: [
					{
						normal: require("../assets/images/tabbar/first.png"),
						active: require("../assets/images/tabbar/1xz.png")
					},
					{
						normal: require("../assets/images/tabbar/2.png"),
						active: require("../assets/images/tabbar/2xz.png")
					},
					{
						normal: require("../assets/images/tabbar/3.png"),
						active: require("../assets/images/tabbar/3xz.png")
					},
					{
						normal: require("../assets/images/tabbar/4.png"),
						active: require("../assets/images/tabbar/4xz.png")
					}
				]
			}
		},
		props: ['active'],
		methods: {
			
		},
		computed: {
			current: {
				get: function () {
			      return this.active
			    },
			    set: function () {
			    }
			}
		}
		
	}
</script>

<style>
	.van-tabbar-item{
		color: #8a8c9a;
	}
	.van-tabbar-item--active{
		color: #0284dc;
	}
	.van-tabbar{
		background-color: #ffffff;
		box-shadow: 0px 0px 24px 0px 
			rgba(155, 155, 155, 0.35);
	}
	
</style>