<template>
	<div class="pub">
		<van-nav-bar title="新增表扬卡" left-arrow @click-left="$router.go(-1)" fixed />
		<div style="height: 44px;background: #f0f0f0;"></div>
		<div class="wrap">
			<p class="p1"><i></i><span>表扬卡名称</span></p>
			<van-field v-model="value" :maxlength="10" />
			<p class="p2"><i></i><span>选择背景图</span></p>
			<div class="addFile" style="width: 350px;margin: 0 auto;border-radius: 10px;">
				<van-swipe indicator-color="white" :width="350" @change="(val) => {bgCardIndex = val}">
					<van-swipe-item v-for="item in bgs1" :key="item">
						<div class="swiper_card">
							<img :src="item" />
							<!-- <span class="cardName">{{item.cardName}}</span> -->
						</div>
					</van-swipe-item>
				</van-swipe>
			</div>
			<div class="btn" @click="sub">保存</div>
		</div>
	</div>
</template>

<script>
	import praiseApi from '../../assets/api/teacher/praise.js'
	export default {
		data() {
			return {
				value: '',
				classInfo: {},
				bgCardIndex: 0,
				bgs1: ['https://store.gzeducard.com/class-brand/d409756580d94aa8a22671e8986a2f73_xxzx.png', 'https://store.gzeducard.com/class-brand/2c2f84f2c5be49b09bc1baa0174fb339_zrzx.png', 'https://store.gzeducard.com/class-brand/14d69e904d484bbd93770ab33107657c_tjzx.png', 'https://store.gzeducard.com/class-brand/6271c1532dea4bbfbf568ffbe921828f_sgzx.png', 'https://store.gzeducard.com/class-brand/ad9800f34f9a4849b99ed5038e2e0ce2_cpzx.png', 'https://store.gzeducard.com/class-brand/b51aa806dce5424f8d2bfd3223fecca5_sxzx.png', 'https://store.gzeducard.com/class-brand/ab4dc9a056d64e0e91386223b72d8c73_yyzx.png']
			}
		},
		components: {

		},
		created() {
			if(sessionStorage.getItem('class')){
				this.classInfo = JSON.parse(sessionStorage.getItem('class'))
			}
		},
		methods: {
			sub(){
				let par = {
					cardName: this.value,
					cardBackUrl: this.bgs1[this.bgCardIndex],
					gradeId: this.classInfo.gradeId,
					classId: this.classInfo.classId,
				}
				
				this.$http.rq({
					method: 'post',
					url: praiseApi.card,
					data: par
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.value = ''
					}else{
						
					}
				})
			}
		},
		computed: {

		}

	}
</script>

<style lang="less" scoped>
	.pub {
		height: 100%;
		background-color: #F0F0F0;
		display: flex;
		flex-direction: column;

		.wrap {
			flex: 1;
			background-color: #F0F0F0;
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
			.p1,
			.p2 {
				height: 35px;
				padding-left: 15px;
				font-size: 15px;
				color: #6a708a;
				display: flex;
				align-items: center;

				&>span {
					margin-left: 4px;
				}

				i {
					display: inline-block;
				}
			}

			.p1 i {
				width: 15px;
				height: 13px;
				background: url(../../assets/images/second/name.png) no-repeat;
				background-size: 100% 100%;
			}

			.p2 i {
				width: 13px;
				height: 15.5px;
				background: url(../../assets/images/second/choice.png) no-repeat;
				background-size: 100% 100%;
			}

			.addFile {
				height: 120px;
				background: #FFFFFF url(../../assets/images/second/img.png) no-repeat center center;
				background-size: 82px 82px;
			}

			.btn {
				margin: 0 12px;
				margin-top: 70px;
				border-radius: 5px;
				height: 45px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 15px;
				letter-spacing: 2px;
				color: #ffffff;
				background-color: #1496ef;
			}
		}
	}
</style>
