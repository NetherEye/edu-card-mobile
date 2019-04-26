<template>
	<div>
		<van-nav-bar title="请选择" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;"></div>
		<div class="wrap">
			<div class="filter">
				<van-search placeholder="请输入搜索关键词" v-model="value" />
			</div>
			<div class="cell">
				<van-cell-group v-for="item in restList" :key="item.departmentId">
				  <van-cell :title="item.departmentName" @click="$router.push({name: '选择人', params: {id: item.departmentId}, query: {name: item.departmentName}})" />
				</van-cell-group>
				
			</div>
		</div>
	</div>
</template>

<script>
	import commonApi from '../../../assets/api/common.js'
	export default {
		data() {
			return {
				value: '',
				list: []
			}
		},
		created(){
			this.getList()
		},
		methods: {
			getList(){
				this.$http.rq({
					url: commonApi.getDepartment
				}).then(res => {
					if(res.code === 200){
						this.list = res.data
					}else{
						this.list = []
						this.$toast(res.message)
					}
				})
			}
		},
		computed: {
			restList(){
				let arr = []
				if(this.value === ''){
					return this.list
				}
				
				for (let i = 0; i < this.list.length; i++) {
					if(this.list[i].departmentName.indexOf(this.value) !== -1){
						arr.push(this.list[i])
					}
				}
				return arr
			}
		}
	}
</script>

<style lang="less" scoped>
	.com{
		
	}
</style>

