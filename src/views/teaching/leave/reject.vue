<template>
	<div class="coms">
		<div class="content">
				<div class="message-item" style="margin-bottom: 0;">
					<p class="ts van-ellipsis">
						<span>{{form.personName}}的请假申请</span>
						<span>{{form.applyTime}}</span>
					</p>
					<p class="zc">
						<span>请假类型：{{form.leaveType}}</span>
					</p>
					<p class="zc">
						<span>开始时间：{{form.startTime}}</span>
					</p>
					<p class="zc">
						<span>结束时间：{{form.finishTime}}</span>
					</p>
					<p class="zc">
						<span>请假天数：{{form.leaveDays}}天</span>
					</p>
					<p class="zc van-ellipsis">
						<span>请假事由：{{form.reason}}</span>
					</p>
				</div>
				<div class="bh">
					<div class="title">驳回理由</div>
					<van-cell-group>
						<van-field v-model="value" type="textarea" clearable />
					</van-cell-group>
				</div>
				
				<div class="sub-btn">
					<span @click="sub">提交</span>
				</div>
				
			</div>

	</div>
</template>

<script>
	import leaveApi from '../../../assets/api/teacher/leave.js'
	export default {
		data() {
			return {
				value: '',
				form: {},
				aId: '',
				classInfo: {}
			}
		},
		components: {
			
		},
		created() {
			if(this.$route.params.id){
				this.aId = this.$route.params.id
			}
			if(sessionStorage.getItem('class')){
				this.classInfo = JSON.parse(sessionStorage.getItem('class'))
			}
			this.getData()
		},
		methods: {
			getData(){
				this.$http.rq({
					url: leaveApi.leave + '/' + this.aId
				}).then(res => {
					if(res.code === 200){
						this.form = res.data
					}else{
						this.$toast(res.message)
					}
				})
			},
			sub(){
				let par = {
					id: this.aId,
					status: 2,
					remark: this.value,
					classId: this.classInfo.classId
				}
				this.$http.rq({
					method: 'post',
					url: leaveApi.check,
					data: par
				}).then(res => {
					this.$toast(res.message)
					if(res.code === 200){
						this.$router.replace({name: '教师请假审批'})
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
	.coms {
		height: 100%;
		.content{
				.message-item{
					background-color: #ffffff;
					box-shadow: 0px 0px 8px 1px 
					rgba(109, 109, 109, 0.11);
					margin-bottom: 10px;
					padding: 7px 0px;
					font-size: 12px;
					color: #6a708a;
					letter-spacing: 1px;
					position: relative;
					.ts{
						display: flex;
						justify-content: space-between;
						align-items: center;
						span:nth-child(1){
							font-size: 15px;
							color: #434964;
							letter-spacing: 2px;
						}
						span:nth-child(2){
							font-size: 12px;
							color: #b2b4bf;
							letter-spacing: 1px;
							
						}
					}
					&>p{
						margin: 9px 0;
						padding: 0px 12px;
						&>span{
							line-height: 20px;
						}
					}
					.is-agree{
						height: 45px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						&>div{
							flex: 1;
							height: 26px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.agree{
							&>i{
								display: inline-block;
								height: 25px;
								width: 25px;
								background: url(../../../assets/images/second/ty.png) no-repeat;
								background-size: 100% 100%;
								margin-right: 5px;
							}
							&>span{
								font-size: 15px;
								color: #6a708a;
								letter-spacing: 2px;
							}
						}
						.disagree{
							&>i{
								display: inline-block;
								height: 25px;
								width: 25px;
								background: url(../../../assets/images/second/bh1.png) no-repeat;
								background-size: 100% 100%;
								margin-right: 5px;
							}
							&>span{
								font-size: 15px;
								color: #6a708a;
								letter-spacing: 2px;
							}
						}
					}
					.watermark{
						position: absolute;
						width: 106px;
						height: 112px;
						
						right: 12px;
						top: 51px;
						font-size: 12px;
						letter-spacing: -1px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						&>p{
							display: flex;
							text-align: center;
							transform:rotate(30deg);
						}
						&>p:nth-child(1){
							padding-left: 18px;
						}
						&>p:nth-child(3){
							padding-right: 20px;
						}
					}
					.wateY{
						color: #61c06c;
						background: url(../../../assets/images/second/tg.png) no-repeat;
						background-size: 100% 100%;
					}
					.wateN{
						color: #ff900d;
						background: url(../../../assets/images/second/bh.png) no-repeat;
						background-size: 100% 100%;
					}
					
				}
				.no-padding-bottom{
					padding-bottom: 0;
				}
				.bh{
					.title{
						height: 32px;
						color: #6a708a;
						letter-spacing: 1px;
						font-size: 12px;
						line-height: 32px;
						padding-left: 11px;
					}
				}
				.sub-btn{
					height: 45px;
					background-color: #1496ef;
					border-radius: 5px;
					text-align: center;
					line-height: 45px;
					cursor: pointer;
					margin: 0 12px;
					margin-top: 70px;
					
					span{
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 2px;
						color: #ffffff;
						font-size: 15px;
					}
					
				}
			}
		
		
	}
	
</style>