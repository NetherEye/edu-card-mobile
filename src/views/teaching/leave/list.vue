<template>
  <div class="coms">
    <div class="tabbar-container">
      <div class="tabber">
        <div class="t-left" :class="activeT == 'left' ? 'activeTab' : ''" @click="handleTab('left')">待审批</div>
        <div class="t-right" :class="activeT == 'right' ? 'activeTab' : ''" @click="handleTab('right')">已审批</div>
      </div>
    </div>
    <div class="content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="message-item" :class="item.state == 0 ? 'no-padding-bottom' : ''" v-for="(item, index) in list" :key="index" @click="$router.push({name: item.to, params: {id: item.id}})">
          <p class="ts van-ellipsis">
            <span>{{item.personName}}的请假申请</span>
            <span>{{item.applyTime}}</span>
          </p>
          <p class="zc">
            <span>请假类型：{{item.leaveType}}</span>
          </p>
          <p class="zc">
            <span>开始时间：{{item.startTime}}</span>
          </p>
          <p class="zc">
            <span>结束时间：{{item.finishTime}}</span>
          </p>
          <p class="zc">
            <span>请假天数：{{item.leaveDays}}</span>
          </p>
          <p class="zc van-ellipsis">
            <span>请假事由：{{item.reason}}</span>
          </p>
          <p class="zc van-ellipsis" v-if="item.checkStatus === '已驳回'">
            <span>驳回理由：{{item.remark}}</span>
          </p>
          <div class="is-agree van-hairline--top" v-if="item.checkStatus === '待审批'">
            <div class="agree van-hairline--right" @click="agree('y', item.id, item.personName)"><i></i><span>同意</span></div>
            <div class="disagree" @click="agree('n', item.id)"><i></i><span>驳回</span></div>
          </div>
          <div class="watermark" v-if="item.checkStatus != '待审批'" :class="item.checkStatus == '已通过' ? 'wateY' : 'wateN'">
            <p>{{item.checkStatus == '已通过' ? '审批通过' : '被驳回'}}</p>
            <p>{{item.checkTime.slice(0, 10)}}</p>
            <p>{{item.checkTime.slice(-5)}}</p>
          </div>
        </div>
      </van-list>
    </div>

  </div>
</template>

<script>
import leaveApi from '../../../assets/api/teacher/leave.js'
export default {
  data () {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      pageSize: 15,
      activeT: 'left',
      calssInfo: {}
    }
  },
  components: {

  },
  created () {
    if (sessionStorage.getItem('class')) {
      this.classInfo = JSON.parse(sessionStorage.getItem('class'))
    }
  },
  methods: {
    onLoad () {
      let par = {
        checkStatus: this.activeT === 'left' ? '待审批' : this.activeT === 'right' ? '已审批' : '',
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        classId: this.classInfo.classId
      }
      if (par.classId === '' || par.classId === undefined) {
        this.$toast('没有classId')
        return
      }

      this.$http.rq({
        url: leaveApi.leave,
        data: par
      }).then(res => {
        this.loading = false;
        if (res.code === 200) {
          this.list = this.list.concat(res.data)
          if (this.list.length >= res.total) {
            this.finished = true
          }
        } else {
          this.finished = true
        }


      })
    },
    handleTab (t) {
      this.activeT = t
      this.currentPage = 1
      this.finished = false
      this.list = []
    },
    agree (t, id, per) {
      if (t === 'y') {
        this.$dialog.confirm({
          message: '同意' + per + '的请假申请？',
          confirmButtonText: '同意',
          cancelButtonText: '手滑了',
          className: 'dialog'
        }).then(() => {
          this.$http.rq({
            method: 'post',
            url: leaveApi.check,
            data: {
              id: id,
              status: 1,
              classId: this.classInfo.classId
            }
          }).then(res => {
            if (res.code === 200) {
              this.currentPage = 1
              this.finished = false
              this.list = []
              this.onLoad()
            }
            this.$toast(res.message)

          })
        })
      } else {
        this.$router.push({
          name: '教师请假审批驳回',
          params: { id: id }
        })
      }
    },

  },
  computed: {

  }

}
</script>

<style lang="less" scoped>
.coms {
  height: 100%;
  overflow: hidden;
  .tabbar-container {
    height: 52px;
    width: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 999;
  }
  .tabber {
    left: 12px;
    right: 12px;
    height: 32px;
    background-color: #ffffff;
    box-shadow: 0px 7px 18px 0px rgba(0, 0, 0, 0.13);
    border-radius: 32px;
    font-size: 15px;
    color: #b2b4bf;
    display: flex;
    justify-content: space-between;
    margin: 10px 12px;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .t-left {
      border-top-left-radius: 32px;
      border-bottom-left-radius: 32px;
    }
    .t-center {
      border-radius: 32px;
    }
    .t-right {
      border-top-right-radius: 32px;
      border-bottom-right-radius: 32px;
    }
    .activeTab {
      color: #ffffff;
      background-color: #4091fd;
    }
  }
  .content {
    margin-top: 52px;
    .message-item {
      background-color: #ffffff;
      box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
      margin-bottom: 10px;
      padding: 7px 0px;
      font-size: 12px;
      color: #6a708a;
      letter-spacing: 1px;
      position: relative;
      .ts {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-child(1) {
          font-size: 15px;
          color: #434964;
          letter-spacing: 2px;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #b2b4bf;
          letter-spacing: 1px;
        }
      }
      & > p {
        margin: 9px 0;
        padding: 0px 12px;
        & > span {
          line-height: 20px;
        }
      }
      .is-agree {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > div {
          flex: 1;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .agree {
          & > i {
            display: inline-block;
            height: 25px;
            width: 25px;
            background: url(../../../assets/images/second/ty.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 5px;
          }
          & > span {
            font-size: 15px;
            color: #6a708a;
            letter-spacing: 2px;
          }
        }
        .disagree {
          & > i {
            display: inline-block;
            height: 25px;
            width: 25px;
            background: url(../../../assets/images/second/bh1.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 5px;
          }
          & > span {
            font-size: 15px;
            color: #6a708a;
            letter-spacing: 2px;
          }
        }
      }
      .watermark {
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
        & > p {
          display: flex;
          text-align: center;
          transform: rotate(30deg);
        }
        & > p:nth-child(1) {
          padding-left: 18px;
        }
        & > p:nth-child(3) {
          padding-right: 20px;
        }
      }
      .wateY {
        color: #61c06c;
        background: url(../../../assets/images/second/tg.png) no-repeat;
        background-size: 100% 100%;
      }
      .wateN {
        color: #ff900d;
        background: url(../../../assets/images/second/bh.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .no-padding-bottom {
      padding-bottom: 0;
    }
  }
}
</style>
<style>
.dialog .van-dialog__cancel .van-button__text {
  color: #ff900d;
}
</style>