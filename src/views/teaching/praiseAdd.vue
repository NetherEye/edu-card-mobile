<template>
	<div class="pub">
		<van-nav-bar :title="step === 1 ? '选择学生' : step === 2 ? '选择表扬卡' : ''" left-arrow @click-left="goBack" fixed />
		<div style="height: 44px;"></div>
		
		<van-search v-show="step === 1" placeholder="输入姓名、学号" @focus="showSearch" @input="handleSearch" v-model="value" />
		<div class="address" v-show="!isSearch && step === 1">
			<div class="ple" @scroll="handleScroll">
				<div class="phone-item" v-for="item in c_dat" :key="'p' + item.name" :data-name="item.name">
					<div class="e-item van-hairline--bottom" :class="it.stc ? 'opc' : ''" @click="select(it)" v-for="(it, i) in item.list" :key="'c' + i">
						<img v-lazy="it.stuPhoto" class="item-left">
				
						<div class="item-center van-ellipsis"><span>{{it.stuName}}</span></div>
						<div class="item-right" :class="it.checked ? 'isCheck' : ''">
							
						</div>
						
					</div>
					
				</div>
				
			</div>
			<div class="letter-sort" @touchstart="start" @touchend="end" @touchmove.prevent="move">
				<a class="letter-item" onclick="return false" :data-id="item" :class="letter == item ? 'active-letter' : ''" v-for="item in letters" :key="item">{{item}}</a>
			</div>
		</div>
		
		<div class="address search" v-show="isSearch && step === 1">
			<div class="ple">
				<div class="phone-item" v-for="item in c_filterArr" :key="'p' + item.name" :data-name="item.name">
					<div class="e-item van-hairline--bottom" :class="it.stc ? 'opc' : ''" @click="select(it)" v-for="(it, i) in item.list" :key="'c' + i">
						<img v-lazy="it.stuPhoto" class="item-left">
									
						<div class="item-center van-ellipsis"><span>{{it.stuName}}</span></div>
						<div class="item-right" :class="it.checked ? 'isCheck' : ''">
							
						</div>
						
					</div>
					
				</div>
				
				<div style="margin: 20px 0;color: #8A8C9A;text-align: center;font-size: 14px;" v-if="value !== '' && this.filterArr.length === 0">没有查询到相应关键词数据...</div>
				<div style="margin: 20px 0;color: #8A8C9A;text-align: center;font-size: 14px;" v-if="value === '' && this.filterArr.length === 0">请输入查询...</div>
				
			</div>
			
		</div>
		
		<div v-show="step === 2" style="height: 100%;">
			<div style="background: #F0F0F0;padding-bottom: 10px;">
				<span class="yl">预览</span>
				<div class="message-item" v-if="defOrCust === 1 && bgs1.length !== 0 || defOrCust === 2 && bgs2.length !== 0">
					<div class="bg">
						<img :src="defOrCust === 1 ? bgs1[bgCardIndex].cardBackUrl : bgs2[bgCardIndex].cardBackUrl"/>
						<!-- <div class="tou"><img :src="selectStudent.stuPhoto"/></div> -->
						<div class="name">{{selectStudent.stuName}}</div>
						<div class="cap">{{defOrCust === 1 ? bgs1[bgCardIndex].cardName : bgs2[bgCardIndex].cardName}}</div>
					</div>
					<div class="pOrTime">
						<span>{{userInfo.nickName}}</span>
						<span>{{ $moment(new Date()).format('YYYY-MM-DD') }}</span>
					</div>
				</div>
			</div>
			<div class="cus">
				<div class="def">
					<div class="radio" @click="() => {defOrCust = 1; bgCardIndex = 0}">
						<i :class="defOrCust === 1 ? 'select' : ''"></i>
						<span>默认</span>
					</div>
					<div class="radio"  @click="() => {defOrCust = 2; bgCardIndex = 0}" style="margin-left: 10px;">
						<i :class="defOrCust === 2 ? 'select' : ''"></i>
						<span>自定义</span>
					</div>
					<div class="add">
						<div class="btn" @click="$router.push({name: '教师表扬榜表扬卡'})">
							<span>新增表扬卡</span>
						</div>
					</div>
				</div>
				<div class="bgs" style="width: 350px;margin: 0 auto;border-radius: 10px;" v-if="defOrCust === 1" key="swp1">
					<van-swipe indicator-color="white" :width="350" @change="(val) => {bgCardIndex = val}">
						<van-swipe-item v-for="item in bgs1" :key="item.id">
							<div class="swiper_card">
								<img :src="item.cardBackUrl" />
								<span class="cardName">{{item.cardName}}</span>
							</div>
						</van-swipe-item>
					</van-swipe>
				</div>
				<div class="bgs" style="width: 350px;margin: 0 auto;border-radius: 10px;" v-else key="swp2">
					<van-swipe indicator-color="white" :width="350" @change="(val) => {bgCardIndex = val}">
						<van-swipe-item v-for="item in bgs2" :key="item.id">
							<div class="swiper_card">
								<img :src="item.cardBackUrl" />
								<span class="cardName">{{item.cardName}}</span>
							</div>
						</van-swipe-item>
					</van-swipe>
				</div>
			</div>
			<div class="bt" style="margin: 0px 12px;margin-top: 60px;">
				<van-button size="large" style="background: #1496ef;border-radius: 10px;color: #FFFFFF;" @click="sub">确定</van-button>
			</div>
		</div>
		
		<div class="nextStep" v-if="step === 1" @click="nextStep">
			<span>下一步，选择表扬卡</span>
		</div>
	</div>
</template>

<script>
	import praiseApi from '../../assets/api/teacher/praise.js'
	export default {
		data() {
			return {
				step: 1, // 步骤 1 选择学生 2 选择表扬卡
				filterArr: [],
				bgCardIndex: 0,
				isSearch: false, // 是否搜索页面 true 显示搜索页面 隐藏通讯功能
				value: '',
				selectStudent: {},
				letter: 'A',
				classInfo: {},
				userInfo: {},
  				letters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  				test: ['安','白','曾','丁', '尔', '方','高','韩', '爱', '蒋', '孔', '李'],
  				childs: [],
  				currentTop: 0,
  				dat: [
  				],
  				list: [
					
				],
				defOrCust: 1,
				bgs1: [],
				bgs2: []
  				
			}
		},
		created(){
			if(sessionStorage.getItem('class')){
				this.classInfo = JSON.parse(sessionStorage.getItem('class'))
			}
			if(sessionStorage.getItem('userInfo')){
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			}
			this.getChild()
			this.getCard(1)
			this.getCard(2)
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
			goBack(){
				// 在 step 1 的回退操作
				if(this.step === 1){
					if(this.isSearch){
						this.value = ''
						this.filterArr = []
						this.isSearch = false
					}else{
						this.$dialog.confirm({
						  title: '提示',
						  message: '现在退出学生就收不到表扬卡啦~确认退出吗？',
						  confirmButtonText: '退出',
						   cancelButtonText: '继续'
						}).then(() => {
							this.$router.go(-1)
						}).catch(() => {
							
						});
						
						
					}
				}else if(this.step === 2){
					this.$dialog.confirm({
					  title: '提示',
					  message: '现在退出学生就收不到表扬卡啦~确认退出吗？',
					   confirmButtonText: '退出',
					   cancelButtonText: '继续'
					}).then(() => {
						this.step = 1
					}).catch(() => {
						
					});
					
				}
			},
			
			getChild(){
				let par = {
					gradeId: this.classInfo.gradeId,
					classId: this.classInfo.classId
				}
				this.$http.rq({
					url: praiseApi.getStudent,
					data: par
				}).then(res => {
					if(res.code === 200){
						res.data.forEach(a => {
							a.list.forEach(b => {
								b['checked'] = false
							})
						})
						this.dat = res.data
					}else{
						this.dat = []
						this.$toast(res.message)
					}
				})
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
			select(it){
				if(it.stc){
					return
				}
				this.dat.forEach(a => {
					a.list.forEach(b => {
						b['checked'] = false
					})
				})
				this.selectStudent = it
				it.checked = true
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
			showSearch(){
				this.isSearch = true
				document.querySelector('.search').style.height = (document.body.clientHeight - document.querySelector('.search').offsetTop) + 'px'
			},
			handleSearch(b){
				if(this.value === ''){
					this.filterArr = []
					return
				}
				this.filterArr = []
				this.dat.forEach(a => {
					let far = []
					a.list.forEach(b => {
						if(b.stc){
							return
						}
						// 此处由于后台学号数据不确定 所有做是否存在学号判断来筛选
						if(b.stuName && b.stuNo){
							if(b.stuName.indexOf(this.value) !== -1 || b.stuNo.indexOf(this.value) !== -1){
								far.push(b)
							}
						}else{
							if(b.stuName.indexOf(this.value) !== -1){
								far.push(b)
							}
						}
						
					})
					if(far.length !== 0){
						let oj = {
							...a
						}
						oj.list = far
						this.filterArr.push(oj)
					}
				})
			},
			nextStep(){
				let f = false
				this.dat.forEach(a => {
					a.list.forEach(b => {
						if(b.checked){
							f = true
							return
						}
					})
				})
				if(!f){
					this.$toast('请选择表扬人！')
					return
				}
				this.step = 2
			},
			getCard(type){
				let par = {
					gradeId: this.classInfo.gradeId,
					classId: this.classInfo.classId,
					type: type
				}
				this.$http.rq({
					url: praiseApi.getCardList,
					data: par
				}).then(res => {
					if(res.code === 200){
						if(type === 1){
							this.bgs1 = res.data
						}
						if(type === 2){
							this.bgs2 = res.data
						}
					}else{
						this.$toast(res.message)
					}
				})
			},
			sub(){
				let par = {
					stuName: this.selectStudent.stuName,
					stuId: this.selectStudent.stuId,
					praisesCardId: this.defOrCust === 1 ? this.bgs1[this.bgCardIndex].id : this.bgs2[this.bgCardIndex].id,
					gradeId: this.classInfo.gradeId,
					classId: this.classInfo.classId,
				}
				
				this.$http.rq({
					method: 'post',
					url: praiseApi.getList,
					data: par
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.$router.go(-1)
					}else{
						
					}
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
//								parents.scrollTo(0, childs[i].offsetTop)
								parents.scrollTop = childs[i].offsetTop
								break
							}
						}
						return
					}
				}
			},
			
		},
		computed: {
			c_dat(){
				let arr = this.dat
				
				arr.forEach(a => {
					if((a.list.length % 4) != 0){
						for (let i = 1, len = 4 - (a.list.length % 4); i <= len; i++) {
							a.list.push({stc: true})
						}
					}
					
				})
				
				
				return arr
			},
			c_filterArr(){
				let arr = this.filterArr
				
				arr.forEach(a => {
					
					if((a.list.length % 4) != 0){
						for (let i = 1, len = 4 - (a.list.length % 4); i <= len; i++) {
							a.list.push({stc: true})
						}
					}
					
				})
				
				
				return arr
			},
		}
	}
</script>

<style lang="less" scoped>
	.pub{
		height: 100%;
		overflow: hidden;
	}
	.swiper_card{
		width: 350px;
		height: 120px;
		position: relative;
		img{
			max-width: 100%;
			max-height: 100%;
		}
		.cardName{
			font-size: 27px;
			letter-spacing: 1px;
			color: #ffffff;
			position: absolute;
			top: 70px;
			left: 30px;
		}
	}
	.address{
		position: relative;
		overflow: hidden;
		padding-bottom: 49px;
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
			padding-bottom: 30px;
			overflow: auto;
			position: relative;
			z-index: 1;
			.phone-item{
				margin: 0 12px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 20px;
				.e-item{
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					width: 79px;
					height: 96px;
					background-color: #ffffff;
					box-shadow: 0px 0px 8px 1px 
						rgba(109, 109, 109, 0.28);
					border-radius: 5px;
					margin-bottom: 10px;
					
					
					.item-left{
						display: block;
						width: 50px;
						height: 50px;
						background-color: #569efe;
						border-radius: 50%;
					}
					
					
					.item-center{
						letter-spacing: 1px;
						color: #434964;
						font-size: 12px;
						margin: 5px 0;
						width: 100%;
						text-align: center
					}
					.item-right{
						display: inline-block;
						width: 11px;
						height: 11px;
						background: url(../../assets/img/icon/wx.png) no-repeat center center;
						border-radius: 10px;
						background-size: 10px 10px;
					}
					.isCheck{
						background: url(../../assets/img/icon/g.png) no-repeat center center;
						border-radius: 10px;
						background-size: 10px 10px;
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
	
	.cus{
		.def{
			height: 40px;
			padding: 0 10px 0 15px;
			.radio{
				float: left;
				display: flex;
				align-items: center;
				height: 100%;
				&>i{
					display: block;
					width: 10px;
					height: 10px;
					background: url(../../assets/img/icon/wx.png) no-repeat;
					background-size: 100% 100%;
					margin-right: 5px;
				}
				span{
					font-size: 15px;
					color: #434964;
				}
				.select{
					background: url(../../assets/img/icon/g.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.add{
				float: right;
				height: 100%;
				display: flex;
				align-items: center;
				.btn{
					width: 90px;
					height: 26px;
					background-color: #1496ef;
					border-radius: 5px;
					display: flex;
					align-items: center;
					justify-content: center;
					span{
						font-size: 12px;
						color: #ffffff;
					}
				}
				
			}
		}
	}
	
	.message-item {
			margin: 10px 12px;
			height: 170px;
			background-color: #ffffff;
			border-radius: 10px;
			box-shadow: 0px 0px 8px 1px 
				rgba(109, 109, 109, 0.11);
			.bg{
				width: 100%;
				height: 120px;
				box-shadow: 0px 6px 13px 1px 
					rgba(23, 106, 180, 0.2);
				border-radius: 10px;
				position: relative;
				&>img{
					display: inline-block;
					max-width:100%;
					max-height:100%;
				}
				.tou{
					position: absolute;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					position: absolute;
					top: 18px;
					left: 28px;
					&>img{
						width: 100%;
						height: 100%;
						display: block;
						border-radius: 50%;
					}
				}
				.name{
					font-size: 18px;
					letter-spacing: 1px;
					color: #ffffff;
					position: absolute;
					top: 34px;
					left: 82.5px;
				}
				.cap{
					font-size: 27px;
					letter-spacing: 1px;
					color: #ffffff;
					position: absolute;
					top: 70px;
					left: 30px;
				}
			}
			.pOrTime{
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 21px;
				padding-right: 16px;
				&>span:nth-child(1){
					height: 14px;
					font-size: 15px;
					line-height: 20px;
					letter-spacing: 2px;
					color: #434964;
				}
				&>span:nth-child(2){
					height: 10px;
					font-size: 12px;
					line-height: 20px;
					letter-spacing: 1px;
					color: #b2b4bf;
				}
				
			}
		}
	.yl{
		font-size: 15px;
		letter-spacing: 1px;
		color: #434964;
		margin-left: 12px;
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
    .opc{
    	opacity: 0;
    }
    .nextStep{
    	position: fixed;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	height: 49px;
    	z-index: 999;
		background-color: #ffffff;
		box-shadow: 0px 0px 24px 0px 
			rgba(155, 155, 155, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		span{
			letter-spacing: 2px;
			color: #1496ef;
			font-size: 15px;
			
		}
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