<template>
	<div class="pub">
		<van-nav-bar title="通讯录" left-arrow @click-left="goBack" fixed />
		<div style="height: 44px;"></div>
		
		<van-search placeholder="输入姓名、号码" @focus="showSearch" @input="handleSearch" v-model="value" />
		<div class="address" v-show="!isSearch">
			<div class="ple" @scroll="handleScroll">
				<div class="phone-item" v-for="item in dat" :key="'p' + item.name" :data-name="item.name">
					<div class="e-item van-hairline--bottom" v-for="(it, i) in item.list" :key="it.id">
						<div class="item-left">{{it.teacherName.slice(0, 1)}}</div>
						<div class="item-center van-ellipsis"><span>{{it.teacherName}}</span></div>
						<div class="item-right">
							<p><span>{{it.phone || '暂无'}}</span><i v-if="it.phone" @click="sendTel(it.phone)"></i></p>
						</div>
					</div>
					
				</div>
				
			</div>
			<div class="letter-sort" @touchstart="start" @touchend="end" @touchmove.prevent="move">
				<a class="letter-item" onclick="return false" :data-id="item" :class="letter == item ? 'active-letter' : ''" v-for="item in letters" :key="item">{{item}}</a>
			</div>
		</div>
		
		<div class="address search" v-show="isSearch">
			<div class="ple">
				<div class="phone-item" v-for="item in filterArr" :key="'p' + item.name" :data-name="item.name">
					<div class="e-item van-hairline--bottom" v-for="(it, i) in item.list" :key="it.id">
						<div class="item-left">{{it.teacherName.slice(0, 1)}}</div>
						<div class="item-center van-ellipsis"><span>{{it.teacherName}}</span></div>
						<div class="item-right">
							<p><span>{{it.phone || '暂无'}}</span><i v-if="it.phone" @click="sendTel(it.phone)"></i></p>
						</div>
					</div>
				</div>
				
				<div style="margin: 20px 0;color: #8A8C9A;text-align: center;font-size: 14px;" v-if="value !== '' && this.filterArr.length === 0">没有查询到相应关键词数据...</div>
				<div style="margin: 20px 0;color: #8A8C9A;text-align: center;font-size: 14px;" v-if="value === '' && this.filterArr.length === 0">请输入查询...</div>
				
			</div>
			
		</div>
	</div>
</template>

<script>
	import addressApi from '../../assets/api/teacher/address.js'
	export default {
		data() {
			return {
				filterArr: [],
				isSearch: false, // 是否搜索页面 true 显示搜索页面 隐藏通讯功能
				value: '',
				letter: 'A',
  				letters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  				test: ['安','白','曾','丁', '尔', '方','高','韩', '爱', '蒋', '孔', '李'],
  				childs: [],
  				currentTop: 0,
  				dat: [
  				],
  				
			}
		},
		created(){
			this.getData()
		},
		mounted(){
			// 动态设置
			document.querySelector('.address').style.height = (document.body.clientHeight - document.querySelector('.address').offsetTop) + 'px'
			
		    window.onresize = () => {
		        return (() => {
		            document.querySelector('.address').style.height = document.body.clientHeight + 'px'
		        })()
		    }
			
			let parents = document.querySelector('.letter-sort');
			let childs = parents.querySelectorAll('.letter-item');
			childs.forEach(a => {
				this.childs.push(a.offsetTop)
			})
		},
		
		/*
		   qq浏览器貌似不兼容scrollTo 用scrollTop 替换
		 * */
		
		methods: {
			getData(){
				let par = {
					
				}
				this.$http.rq({
					url: addressApi.address,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.dat = res.data
					}
				})
			},
			goBack(){
				if(this.isSearch){
					this.value = ''
					this.filterArr = []
					this.isSearch = false
				}else{
					this.$router.go(-1)
					
				}
			},
			start(e){
				if(e.target.className == 'letter-item'){
					
					let o = e.target;
					if(o.dataset.id == this.letter){
						return
					}
					
					let parents = document.querySelector('.ple');
					
					let childs = parents.querySelectorAll('.phone-item');
					for (let i = 0, len = childs.length; i < len; i++) {
						if(childs[i].dataset.name == o.dataset.id) {
							parents.scrollTop = childs[i].offsetTop
							break
						}
					}
					
					this.letter = o.dataset.id
				}
			},
			move(e){
				this.currentTop = e.targetTouches[0].pageY - document.querySelector('.address').offsetTop // 减去 address 相对于整个页面的距离
			},
			end(){
				
			},
			handleScroll(e){
				let o = document.querySelector('.ple');
				let parents = document.querySelector('.ple');
				let childs = parents.querySelectorAll('.phone-item');
				for (let i = 0, len = childs.length; i < len; i++) {
					if(o.scrollTop > childs[i].offsetTop && i === len - 1){
						this.letter = childs[i].dataset.name
						break
					}
					
					if(o.scrollTop > childs[i].offsetTop && o.scrollTop < childs[i + 1].offsetTop) {
						this.letter = childs[i].dataset.name
						break
					}
				}
			},
			sendTel(tel){
				if(!tel){
					return
				}
				this.$dialog.confirm({
			      	message: '呼叫 ' + tel + '？',
			      	confirmButtonText: '确定',
			      	cancelButtonText: '取消',
			      	className: 'dialog'
			    }).then(() => {
					window.location.href = "tel:" + tel
				})
				
				
			},
			showSearch(){
				this.isSearch = true
				document.querySelector('.search').style.height = (document.body.clientHeight - document.querySelector('.search').offsetTop) + 'px'
			},
			handleSearch(b){
				if(this.value === ''){
					this.filterArr = []
					return
				}
				let par = {
					findCnd: this.value
				}
				this.$http.rq({
					url: addressApi.address,
					data: par
				}).then(res => {
					if(res.code === 200){
						this.filterArr = res.data
					}else if(res.code === 201){
						this.filterArr = []
					}
					document.querySelector('.search').style.height = (document.body.clientHeight - document.querySelector('.search').offsetTop) + 'px'
				})
			}
		},
		watch: {
			currentTop(v){
				// 根据字母排序的滑动高度来切换ABCD...
				for (var i = 0, len = this.childs.length; i < len; i++) {
					if(v > this.childs[i] && v < this.childs[i + 1] || v > this.childs[i] && (i + 1) === len){ // Z 没有下一个 index
						this.letter = this.letters[i]
						
						let parents = document.querySelector('.ple');
						let childs = parents.querySelectorAll('.phone-item');
						for (let i = 0, len = childs.length; i < len; i++) {
							if(childs[i].dataset.name == this.letter) {
								parents.scrollTop = childs[i].offsetTop
								break
							}
						}
						return
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.pub{
		height: 100%;
		overflow: hidden;
	}
	.address{
		position: relative;
		overflow: hidden;
		.letter-sort{
			position: absolute;
			top: 2px;
			right: 15px;
			display: flex;
			flex-direction: column;
			z-index: 900;
			.letter-item{
				font-weight: bold;
				font-size: 12px;
				/*line-height: 15px;
				text-align: center;*/
				display: flex;
				align-items: center;
				justify-content: center;
				color: #569efe;
				width: 16px;
				height: 16px;
				
				margin: 1px 0px;
			}
			.active-letter{
				background-color: #569efe;
				color: #FFFFFF;
				border-radius: 50%;
			}
			
			
		}
		.ple{
			height: 100%;
			overflow: auto;
			position: relative;
			z-index: 1;
			.phone-item{
				&:last-child{
					margin-bottom: 30px;
				}
				.e-item{
					height: 70px;
					display: flex;
					align-items: center;
					
					.item-left{
						width: 45px;
						height: 45px;
						background-color: #569efe;
						border-radius: 50%;
						text-align: center;
						line-height: 45px;
						font-size: 15px;
						color: #ffffff;
						margin-left: 12px;
						margin-right: 10px;
					}
					
					
					.item-center{
						color: #434964;
						font-size: 15px;
						width: 80px;
						letter-spacing: 2px;
					}
					.item-right{
						font-size: 12px;
						height: 36px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						&>p{
							span{
								font-size: 15px;
								letter-spacing: 2px;
								color: #b2b4bf;
							}
							i{
								display: inline-block;
								width: 10px;	
								height: 11.5px;
								background: url(../../assets/images/second/tel.png) no-repeat;
								background-size: 100% 100%;
								margin-left: 5px;
							}
						}
					}
					
				}
				.e-item:nth-child(2n) .item-left{
					background-color: #f6a933;
				}
				.e-item:nth-child(3n) .item-left{
					background-color: #57d19b;
				}
				.e-item:nth-child(4n) .item-left{
					background-color: #ff7263;
				}
				.e-item:nth-child(5n) .item-left{
					background-color: #7f67ff;
				}
			}
			
		}
	}
	
	/* 提示框 */
	.out-div {     
        width: 108px;  
        position: absolute;
        right: -6px;
        bottom: -62px;
        font-size: 12px;
        color: #b2b4bf;
        background-color: #ffffff;
        box-shadow: 0px 0px 24px 0px 
		rgba(96, 96, 96, 0.26);
		border-radius: 5px;
		z-index: 9999;
		p{
        	height: 32px;
        	display: flex;
        	align-items: center;
        	i{
        		display: inline-block;
        		width: 10px;
        		height: 10px;
        		margin-left: 7px;
        		margin-right: 6px;
        		display: flex;
        		justify-content: center;
        		align-items: center;
        		border-radius: 100%;
        		span{
        			display: inline-block;
        			width: 5px;
        			height: 5px;
        			background-color: #dddddd;
        			border-radius: 100%;
        		}
        	}
        	span{
        		display: flex;
        		align-items: center;
        		height: 32px;
        	}
        	
        }
        .active-sort{
    		i{
    			border: .5px solid #569efe;
    			span{
    				background: #569efe;
    			}
    		}
    	}
    }   
    .arrow {   
        border-left: 5px solid #f0f0f0;   
        border-bottom: 5px solid #FFFFFF;   
        border-right: 5px solid #f0f0f0;   
        position: absolute;    
        top: -4px;
        right: 20px;
        z-index: 999;
        
    } 
	
</style>

<style>
	.dialog .van-dialog__cancel .van-button__text{
		color: #ff900d;
	}
	.van-nav-bar .van-nav-bar__right .sort{
		font-size: 15px;
		letter-spacing: 2px;
		color: #434964;
		position: relative;
	}
	.van-nav-bar{
		z-index: 999!important;
	}
</style>