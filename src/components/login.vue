<template>
	<div class="home" :style="{height: bodyHeight + 'px'}">
		<div class="login">
			<div class="logo">
				<!--<img src="../assets/img/login/logo.png" />-->
				<h1 style="display: none;">中国教育卡移动端</h1>
			</div>
			<div class="form">
				<div class="item">
					<i class="tel-icon"></i>
					<span>
						<van-field v-model.trim="username" placeholder="请输入账号" />
					</span>
				</div>
				<div class="item">
					<i class="pwd-icon"></i>
					<span>
						<van-field v-model.trim="password" type="password" placeholder="请输入账号" />
					</span>
				</div>
				<div class="item btn" @click="login">
					<span>
						登录
					</span>
				</div>
				<div class="fPwd">忘记密码？</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import commonApi from '../assets/api/common.js' 
export default {
	data() {
		return {
			username: '',
			password: '',
			timer: [], // 定时器集合
			bodyHeight: '100%'
		}
	},
	beforeRouteLeave(to, from, next){
		this.timer.forEach(a => {
			clearInterval(a)
		})
		next()
	},
	methods: {
		login(){

			this.$router.push({name: '家长首页'})
		},
		ani(target, speed) {
			let yunDom = document.createElement('div');
			yunDom.className = target;
			document.querySelector('.login').appendChild(yunDom)
			let timer = setInterval(() => {
				if(this.timer.indexOf(timer) === -1){
					this.timer.push(timer)
				}
				if(Number(getComputedStyle(document.querySelector('.' + target))['left'].replace(/px/g, '')) > 400) {
					if(this.timer.indexOf(timer) !== -1){
						this.timer.splice(this.timer.indexOf(timer), 1)
					}
					clearInterval(timer)
					
					document.querySelector('.login').removeChild(document.querySelector('.' + target))
					return this.ani(target, speed)
				}
				let left = Number(getComputedStyle(document.querySelector('.' + target))['left'].replace(/px/g, '')) + speed
				document.querySelector('.' + target).style['left'] = left + 'px'

			}, 24)
		}
	},
	mounted() {
		this.ani('yun1', 0.5)
		this.ani('yun2', 0.8)
		this.ani('yun3', 1)
		
		this.bodyHeight = document.documentElement.clientHeight
	}
}
</script>

<style lang="less" scoped>
.home {
	height: 100%;
	overflow: hidden;
	.login {
		height: 100%;
		background: url(../assets/img/login/bj.png) no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		
		.logo {
			width: 135px;
			height: 90px;
			background: url(../assets/img/login/logo.png) no-repeat;
			background-size: 100% 100%;
			margin: 0 auto;
			margin-top: 56.5px;
			position: relative;
			z-index: 999;
			/*background-color: red;*/
			&>img {
				width: 100%;
				height: 100%;
				display: block;
				position: relative;
			}
		}
		.form {
			margin-top: 28.5px;
			position: relative;
			.item {
				width: 295px;
				height: 45px;
				background-color: #ffffff;
				border-radius: 45px;
				margin: 0 auto;
				margin-bottom: 30px;
				display: flex;
				align-items: center;
				&>span {
					margin-top: 2px;
				}
				.tel-icon {
					display: block;
					width: 10px;
					height: 15px;
					background: url(../assets/img/login/sj.png) no-repeat;
					background-size: 100% 100%;
					margin-left: 15px;
					margin-right: 4px;
				}
				.pwd-icon {
					display: block;
					width: 12.5px;
					height: 16.5px;
					background: url(../assets/img/login/mm.png) no-repeat;
					background-size: 100% 100%;
					margin-left: 15px;
					margin-right: 3.5px;
				}
			}
			.btn {
				margin-top: 60px;
				margin-bottom: 13.5px;
				display: flex;
				align-items: center;
				justify-content: center;
				&>span {
					font-size: 15px;
					letter-spacing: 1.5px;
					color: #2bbaff;
				}
			}
			.fPwd {
				width: 295px;
				margin: 0 auto;
				text-align: right;
				font-size: 15px;
				color: #ffffff;
				padding-right: 20px;
			}
		}
		.bottom-bg {
			position: absolute;
			bottom: 0;
			width: 344px;
			height: 179px;
			left: 0;
			background: url(../assets/img/login/jzd.png) no-repeat;
			background-size: 100% 100%;
		}
	}
}
</style>

<style lang="less">
.login {
	.van-field {
		padding: 0;
	}
	.van-field__control {
		font-size: 15px;
		color: #b2b4bf;
	}
	
	.logo {
		position: relative;
	}
	
	.yun1 {
		position: absolute;
		top: 90px;
		width: 85px;
		height: 45px;
		left: -85px;
		background: url(../assets/img/login/y.png) no-repeat;
		background-size: 100% 100%;
	}
	.yun2 {
		position: absolute;
		top: 460px;
		width: 69px;
		height: 36px;
		left: -69px;
		background: url(../assets/img/login/y1.png) no-repeat;
		background-size: 100% 100%;
	}
	.yun3 {
		position: absolute;
		top: 310px;
		width: 45px;
		height: 26px;
		left: -45px;
		background: url(../assets/img/login/y2.png) no-repeat;
		background-size: 100% 100%;
	}
}
</style>