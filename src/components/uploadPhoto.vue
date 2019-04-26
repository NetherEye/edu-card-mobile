<template>
	<div class="pub">
		<div class="main">
			<vueCropper ref="cropper" :img="imgSrc" :outputSize="1" outputType="jpg" :fixedBox="true" autoCrop autoCropWidth="300"
			 autoCropHeight="300" @imgLoad="imgLoad"></vueCropper>
		</div>
		<div class="sub-btn" @click="show = true"><span>更换头像</span></div>
		<div class="sub-btn" @click="sub"><span>上传头像</span></div>
		<van-actionsheet v-model="show" :actions="actions" @select="onSelect" cancelText="取消" />
		<input class="js_upFile cover1" @change="handleImg('.cover1')" type="file" name="cover" accept="image/*" capture="camera"
		 style="opacity: 0;display: none;" />
		<input class="js_upFile cover2" @change="handleImg('.cover2')" type="file" accept="image/*" style="opacity: 0;display: none;"  />
	</div>
</template>

<script>
	import {
		VueCropper
	} from 'vue-cropper'
	import commonApi from '../assets/api/common.js'
	export default {
		data() {
			return {
				imgSrc: '',
				myCroppa: {},
				show: false,
				actions: [{
						name: '手机相册',
						disabled: false,
						subname: ''
					},
					{
						name: '拍照',
						disabled: false,
						subname: ''
					},
				],
				userInfo: {},
				imgLoadLoading: null
			}
		},
		components: {
			VueCropper
		},
		created() {
			if (sessionStorage.getItem('userInfo')) {
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
				if (this.userInfo['icon']) {
					this.imgSrc = this.userInfo['icon']
				}
			}
		},
		mounted() {
			var ua = navigator.userAgent.toLowerCase();
			//判断是否是苹果手机，是则是true
			var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
			if (isIos) {
				document.querySelector('.cover1').removeAttribute('capture')
			}else{ 
				// 如果是android 7.1.1 + 微信内置qq浏览器则禁用手机文件选择
				if(ua.indexOf('android 7.1.1') != -1 && ua.match(/MicroMessenger/i) == 'micromessenger'){
					this.actions[0]['disabled'] = true
					this.actions[0]['subname'] = '暂不支持'
				}
			}
		
		},
		methods: {
			imgLoad(res){ // 截图插件图片加载的回调
				if(this.imgLoadLoading !== null){
					this.imgLoadLoading.clear()
					this.imgLoadLoading = null
				}
			},
			onSelect(item) {
				// 点击选项时默认不会关闭菜单，可以手动关闭
				this.show = false;
				document.querySelector('.cover1').value = ''
				document.querySelector('.cover2').value = ''
				if (item.name === '拍照') {
					document.querySelector('.cover1').click()
				} else {
					document.querySelector('.cover2').click()
				}
			},
			handleImg(c) {
				if (!document.querySelector(c).value) {
					return
				}
				
				var reader = new FileReader();

				reader.onload = e => {
					this.imgSrc = reader.result
					document.querySelector(c).value = ''
					// 触发截图插件图片加载loading
					if(this.imgLoadLoading === null){
						this.imgLoadLoading = this.$toast.loading({
							duration: 0, // 持续展示 toast
							forbidClick: true, // 禁用背景点击
							message: '图片加载中...'
						});
					}
				}
				reader.readAsDataURL(document.querySelector(c).files[0])
			},
			sub() {
				this.$refs.cropper.startCrop()

				this.$refs.cropper.getCropBlob((data) => {
					let re = new window.File([data], 'filename.jpg', {
						type: data.type
					})
					this.upload(re)
				})
			},
			upload(data) {
				let par = new FormData();
				par.append('file', data)

				// return
				this.$http.rq({
					method: 'post',
					url: commonApi.upload,
					data: par,
					notQs: true
				}).then(res => {
					if (res.code === 200) {
						this.uploadPhoto(res.data.url)
					} else {
						this.$toast(res.message)
					}
				})
			},
			uploadPhoto(url) {
				this.$http.rq({
					url: commonApi.uplodaPhoto,
					data: {
						url: url
					}
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.$router.go(-1)
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
		background: #FFFFFF;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;

		.main {
			height: 440px;

			.cj {}
		}

		.sub-btn {
			height: 45px;
			background-color: #1496ef;
			border-radius: 5px;
			text-align: center;
			line-height: 45px;
			cursor: pointer;
			margin: 0 12px;
			margin-top: 10px;
			margin-bottom: 10px;

			span {
				display: flex;
				align-items: center;
				justify-content: center;
				letter-spacing: 2px;
				color: #ffffff;
				font-size: 15px;
			}
		}
	}
</style>
