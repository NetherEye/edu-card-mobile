<template>
  <div class="pub">
    <div class="top">
      <div class="tab-title">我的</div>
      <div class="tou" @click="$router.push({name: '头像上传'})">
        <!--<img src="../../assets/images/first/tou.png"/>-->
        <div class="bor">
          <img class="circleImg" :src="photo" />
        </div>
      </div>
      <div class="name">{{userInfo.nickName}}</div>
      <div class="card">
        <div class="item-bg">
          <div class="item van-hairline--bottom" @click="$router.push({name: '家长个人资料'})">
            <img src="../../assets/img/1.png" style="width: 62px;height: 30px;" />
          </div>
        </div>
        <div class="item-bg">
          <div class="item van-hairline--bottom">
            <img src="../../assets/img/kye.png" /><span>卡余额</span>
            <div class="my-right">{{balance}}</div>
          </div>
        </div>

        <div class="item-bg">
          <div class="item van-hairline--bottom" @click="$router.push({name: '消费明细'})">
            <img src="../../assets/img/xfmx.png" /><span>消费明细</span>
          </div>
        </div>
				
				<div class="item-bg">
					<div class="item van-hairline--bottom" @click="$router.push({name: '卡密码'})">
						<img src="../../assets/img/kamima.png" /><span>卡密码</span>
					</div>
				</div>
				
       <!-- <div class="item-bg">
					<div class="item van-hairline--bottom" @click="$router.push({name: '卡充值'})">
						<img src="../../assets/img/kcz.png" /><span>卡充值</span>
					</div>
				</div> -->
				
        <div class="item-bg">
          <div class="item van-hairline--bottom" @click="$router.push({name: 'APP设置'})">
            <img src="../../assets/img/appset.png" /><span>APP设置</span>
          </div>
        </div>
        <div class="item-bg">
          <div class="item van-hairline--bottom" @click="$router.push({name: '帮助与反馈'})">
            <img src="../../assets/img/bzyfk.png" /><span>帮助与反馈</span>
          </div>
        </div>
        <div class="item-bg">
          <div class="item van-hairline--bottom">
            <img src="../../assets/img/lxwm.png" /><span>联系我们</span>
          </div>
        </div>
        <!-- <div class="item-bg">
					<div class="item">
						<img src="../../assets/images/first/qh.png" /><span>切换家长账号</span>
					</div>
				</div> -->
        <div style="height: 10px;background: #F0F0F0;"></div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>

    <div style="height: 48px;"></div>

    <my-tabbar :active="active">
    </my-tabbar>

  </div>
</template>

<script>
import common from '../../assets/api/common.js'
import payApi from '../../assets/api/parents/pay.js'
import myTabbar from '@/components/myTabbarParents'
export default {
  data () {
    return {
      active: 3,
      photo: 'https://store.gzeducard.com/class-brand/d281ef7df7e440c5872a40427d27fda4_mrtx.png',
      userInfo: {},
      balance: '暂无数据'
    }
  },
  created () {
    if (sessionStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      if (this.userInfo['icon']) {
        this.photo = this.userInfo['icon']
      }
    }
    this.getBalance()
  },
  methods: {
    logout () {

      sessionStorage.clear()
      window.location.href = '/proxy/logout'

    },
    getBalance () {
      this.balance = '查询中...'
      this.$http.rq({
        method: 'get',
        url: payApi.balance

      }).then(res => {
        if (res.code === 200) {
          this.balance = res.data
        } else {
          this.balance = '查询失败'
        }
      })
    },
  },
  components: {
    'my-tabbar': myTabbar
  },
  computed: {}

}
</script>

<style lang="less" scoped>
.pub {
  height: 100%;
  background: #f0f0f0;
  overflow: auto;
  .top {
    height: 243px;
    background: url(../../assets/images/first/bj.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tab-title {
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 1px;
      font-weight: bold;
      margin-top: 10px;
    }
    .tou {
      width: 75px;
      height: 75px;
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 73px;
        height: 73px;
      }
      .bor {
        width: 75px;
        height: 75px;
        background: #ffffff;
        border-radius: 50%;
        padding: 1px;
      }
    }
    .name {
      font-size: 15px;
      color: #ffffff;
      letter-spacing: 1px;
      margin-top: 10px;
    }
    .card {
      left: 12px;
      right: 12px;
      top: 170px;
      bottom: -540px;
      position: absolute;
      /*background: #FFFFFF;*/
      .item-bg {
        background: #ffffff;
      }
      .item {
        /*width: 100%;*/
        margin-left: 10px;
        /*padding-left: 10px;*/
        background: #ffffff;
        height: 60px;
        display: flex;
        align-items: center;
        img {
          display: flex;
          align-items: center;
          width: 30px;
          height: 30px;
        }
        span {
          color: #6a708a;
          font-size: 14px;
          margin-left: 10px;
        }
        .my-right {
          padding-right: 10px;
          flex: 1;
          text-align: right;
          color: #6a708a;
          font-size: 14px;
        }
      }
      .logout {
        /*left: 0;
				right: 0;
				bottom: -60px;
				position: absolute;*/
        height: 50px;
        font-size: 15px;
        letter-spacing: 1px;
        color: #e34000;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        background-color: #ffffff;
      }
    }
  }
}

.circleImg {
  border-radius: 50px;
  width: 60px;
  height: 60px;
}
</style>

<style>
.van-tabbar-item {
  color: #8a8c9a;
}

.van-tabbar-item--active {
  color: #0284dc;
}
</style>