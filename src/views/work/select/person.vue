<template>
	<div>
		<van-nav-bar title="请选择" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;"></div>
		<div class="wrap">
			<div class="filter">
				<van-search placeholder="请输入搜索关键词" v-model="value" />
			</div>
			<div class="cell">
				<van-cell-group v-for="item in restList" :key="item.teacherId">
				  <van-cell :title="item.teacherName" @click="go(item)" />
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
			if(this.$route.query.name){
				this.name = this.$route.query.name
			}
			
			if(this.$route.params.id){
				this.id = this.$route.params.id
			}
			
			this.getList()
		},
		methods: {
			getList(){
				this.$http.rq({
					url: commonApi.getTeacher,
					data: {
						departmentId: this.id
					}
				}).then(res => {
					if(res.code === 200){
						this.list = res.data
					}else{
						this.list = []
						this.$toast(res.message)
					}
				})
			},
			go(item){
				// 把改页面点击的数据存到 pageData 中
				
				this.$store.commit('setPageData', {
					name: '选择人',
					list: [
						{
							teacherName: item.teacherName,
							teacherId: item.teacherId
						}
					]
				})
				this.$router.push({name: '用车申请'})
			}
		},
		computed: {
			restList(){
				let arr = []
				if(this.value === ''){
					return this.list
				}
				
				for (let i = 0; i < this.list.length; i++) {
					if(this.list[i].teacherName.indexOf(this.value) !== -1){
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

