<template>
	<div class="home">
		<van-nav-bar title="成长数据" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		loading...
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
				
				const { href } = vm.$router.resolve({
					name: from.name
				})
				let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
				
				var par;
				if(userInfo.role === '家长'){
					par = {
						source: JSON.stringify({
							to: 'growthdata',
							back: window.location.origin + href
						})
					}
				}else{
					par = {
						source: JSON.stringify({
							to: 'growthdata',
							back: window.location.origin + href,
							classId: JSON.parse(sessionStorage.getItem('class')).classId
						})
					}
				}
				
				
				vm.$http.rq({
					url: '/proxy/dock/encrypt',
					data: par
				}).then(res => {
					if(res.code === 200){
						window.location.href = res.data
					}else{
						
					}
					
				})
			})
		}
	}
</script>

<style lang="less" scoped>
</style>