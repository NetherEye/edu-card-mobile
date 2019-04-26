<template>
  <div class="pub">
    <van-nav-bar title="请假" left-arrow @click-left="goBack" fixed />
    <div style="height: 44px;background: #f0f0f0;"></div>
    <div class="main">
      <div class="tabber">
        <div class="t-left" :class="activeT == 'left' ? 'activeTab' : ''" @click="handleTab('left')">请假</div>
        <div class="t-right" :class="activeT == 'right' ? 'activeTab' : ''" @click="handleTab('right')">请假记录</div>
      </div>
      <div class="content use-car-style" v-show="activeT == 'left'">
        <van-cell-group style="margin-bottom: 9px;">
          <van-cell>
            <template slot="title">

              <div class="p-value">
                <span class="custom-text">学生姓名</span>
                <span class="val" @click="nameShow = true">
                  <span>{{form.student['studentName']}}</span><i></i>
                </span>

                <van-popup v-model="nameShow" position="bottom" :overlay="true">
                  <van-picker show-toolbar value-key="studentName" :columns="columns" @cancel="nameShow = false" @confirm="onConfirm" />
                </van-popup>

              </div>
            </template>

          </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-bottom: 9px;">
          <van-cell>
            <template slot="title">

              <div class="p-value">
                <span class="custom-text">请假类型</span>
                <span class="val" @click="typeShow = true">
                  <span>{{form.leaveType}}</span><i></i>
                </span>

                <van-popup v-model="typeShow" position="bottom" :overlay="true">
                  <van-picker show-toolbar :columns="columns1" @cancel="typeShow = false" @confirm="onConfirm1" />
                </van-popup>

              </div>
            </template>

          </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-bottom: 9px;">
          <van-cell>
            <template slot="title">
              <div class="p-value">
                <span class="custom-text">开始时间</span>
                <span class="val" @click="startShow = true">
                  <span>{{form.startTime}}</span><i></i>
                </span>

                <van-popup v-model="startShow" position="bottom" :overlay="true">
                  <van-datetime-picker v-model="startTime" type="date" @cancel="startShow = false" @confirm="onConfirm2" />
                </van-popup>

              </div>
            </template>

          </van-cell>
          <van-cell>
            <template slot="title">
              <div class="p-value">
                <span class="custom-text">结束时间</span>
                <span class="val" @click="endShow = true">
                  <span>{{form.finishTime}}</span><i></i>
                </span>

                <van-popup v-model="endShow" position="bottom" :overlay="true">
                  <van-datetime-picker v-model="endTime" type="date" @cancel="endShow = false" @confirm="onConfirm3" />
                </van-popup>

              </div>
            </template>

          </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-bottom: 9px;">
          <van-cell>
            <template slot="title">

              <div class="p-value">
                <span class="custom-text">请假天数</span>
                <span class="val" @click="dayShow = true">
                  <span>{{form.leaveDays}}</span><i></i>
                </span>

                <van-popup v-model="dayShow" position="bottom" :overlay="true">
                  <van-picker show-toolbar :columns="columns4" @cancel="dayShow = false" @confirm="onConfirm4" />
                </van-popup>

              </div>
            </template>

          </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-bottom: 9px;">
          <van-cell>
            <template slot="title">

              <div class="p-value">
                <span class="custom-text">请假事由</span>
                <span class="val">
                  <van-field v-model="form.reason" type="textarea" clearable placeholder="请输入" />
                </span>

              </div>
            </template>

          </van-cell>

        </van-cell-group>

        <div class="sub-btn" @click="sub">提交</div>
      </div>
      <div class="content" v-show="activeT == 'right'">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="message-item" v-for="(item, index) in list" :key="index" @click="$router.push({name: '家长请假详情', params: {id: item.id}})">
            <p class="ts van-ellipsis">
              <span>{{item.title}}</span>
              <span>{{item.time}}</span>
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
            <div class="watermark" v-if="item.checkStatus !== '待审批'" :class="item.checkStatus == '已通过' ? 'wateY' : 'wateN'">
              <p>{{item.checkStatus === '已通过' ? '审批通过' : '被驳回'}}</p>
              <p>{{item.checkTime.slice(0, 10)}}</p>
              <p>{{item.checkTime.slice(-5)}}</p>
            </div>
          </div>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>
import commonApi from '../../assets/api/common.js'
import leaveApi from '../../assets/api/parents/leave.js'
export default {
  data () {
    return {
      nameShow: false,
      typeShow: false,
      startShow: false,
      endShow: false,
      dayShow: false,
      value: '',
      form: {
        student: {},
        leaveType: '病假',
        startTime: '',
        finishTime: '',
        leaveDays: '',
        reason: ''
      },
      startTime: new Date(),
      endTime: new Date(),
      columns: [],
      students: [],
      columns1: ['病假', '事假', '其他'],
      columns4: ['1天', '2天', '3天'],
      goReject: false, // 是否为驳回提交
      list: [

      ],
      loading: false,
      finished: false,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      activeT: 'left'
    }
  },
  components: {

  },
  created () {
    this.getData()
  },
  methods: {
    goBack () {
      if (this.goReject) {
        this.goReject = false
      } else {
        this.$router.go(-1)

      }
    },
    getData () {
      this.$http.rq({
        url: commonApi.getChild
      }).then(res => {
        if (res.code === 200) {
          this.columns = res.data
          this.form.student = res.data[0]
        } else {
          this.$toast(res.message)
        }
      })
    },
    onLoad () {
      let par = {
        pageNumber: this.currentPage,
        pageSize: this.pageSize
      }
      this.$http.rq({
        url: leaveApi.leaveHistory,
        data: par
      }).then(res => {
        if (res.code === 200) {
          this.list = this.list.concat(res.data)
        } else {
          this.finished = true
        }
        this.loading = false;
        if (this.list.length >= res.total) {
          this.finished = true
        } else {
          this.currentPage++
        }
      })
    },
    handleTab (t) {
      this.activeT = t
      this.currentPage = 1
      this.finished = false
      this.loading = true
      this.list = []
      if (t === 'right') {
        this.onLoad()
      }

    },
    agree (t) {
      if (t === 'y') {
        this.$dialog.confirm({
          message: '同意赖萌萌同学的请假申请？',
          confirmButtonText: '同意',
          cancelButtonText: '手滑了',
          className: 'dialog'
        });
      } else {
        this.goReject = true
      }
    },
    sub () {
      let par = {
        unionId: this.form.student.unionId,
        personName: this.form.student.studentName,
        leaveType: this.form.leaveType,
        startTime: this.form.startTime,
        finishTime: this.form.finishTime,
        leaveDays: this.form.leaveDays,
        reason: this.form.reason,
      }
      if (par.startTime === '' || par.finishTime === '') {
        this.$toast('时间不能为空')
        return
      }
      if (this.$moment(par.startTime).isAfter(par.finishTime, 'day')) {
        this.$toast('结束时间要晚于开始时间')
        return
      }

      par.leaveDays = Number(par.leaveDays.slice(0, -1))
      this.$http.rq({
        method: 'post',
        url: leaveApi.leave,
        data: par
      }).then(res => {
        if (res.code === 200) {
          this.handleTab('right')
        } else {

        }
        this.$toast(res.message)
      })
    },
    onConfirm (val, inx) {
      this.form['student'] = val
      this.nameShow = false
    },
    onConfirm1 (val, inx) {
      this.form['leaveType'] = val
      this.typeShow = false
    },
    onConfirm2 (val) {
      this.form['startTime'] = this.$moment(val).format('YYYY-MM-DD')
      this.startShow = false
    },
    onConfirm3 (val) {
      this.form['finishTime'] = this.$moment(val).format('YYYY-MM-DD')
      this.endShow = false
    },
    onConfirm4 (val, inx) {
      this.form['leaveDays'] = val
      this.dayShow = false
    }

  },
  computed: {

  }

}
</script>

<style lang="less" scoped>
.pub {
  background: #f0f0f0;
  height: 100%;
  user-select: none;
  .reject {
    .content {
      .bh {
        .title {
          height: 32px;
          color: #6a708a;
          letter-spacing: 1px;
          font-size: 12px;
          line-height: 32px;
          padding-left: 11px;
        }
      }
      .sub-btn {
        height: 45px;
        background-color: #1496ef;
        border-radius: 5px;
        text-align: center;
        line-height: 45px;
        cursor: pointer;
        margin: 0 12px;
        margin-top: 70px;
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
  }
  .main {
    background: #f0f0f0;
    height: auto;
    .tabber {
      margin: 10px 12px;
      height: 32px;
      background-color: #ffffff;
      box-shadow: 0px 7px 18px 0px rgba(0, 0, 0, 0.13);
      border-radius: 32px;
      font-size: 15px;
      color: #b2b4bf;
      display: flex;
      justify-content: space-between;
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
      .custItem {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        & > span {
          font-size: 15px;
          color: #b2b4bf;
          margin-left: 3px;
        }
      }
      .p-value {
        display: flex;
        align-items: center;
        .val > span {
          margin-left: 12px;
          font-size: 15px;
          color: #6a708a;
        }
        .val > i {
          width: 13px;
          height: 7.5px;
          display: inline-block;
          background: url(../../assets/img/xl.png) no-repeat;
          background-size: 100% 100%;
          margin-left: 5px;
        }
      }
      .my-cell {
        height: 90px;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        .my-cell > span {
          width: 70px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: #6a708a;
          font-size: 15px;
          margin-right: 16px;
        }
        .circle-bg {
          width: 46px;
          height: 46px;
          background-color: #f0f0f0;
          border-radius: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .sub-btn {
        height: 45px;
        font-size: 15px;
        letter-spacing: 2px;
        color: #ffffff;
        margin: 20px 12px;
        margin-bottom: 0;
        background-color: #1496ef;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
              background: url(../../assets/images/second/ty.png) no-repeat;
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
              background: url(../../assets/images/second/bh1.png) no-repeat;
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
          background: url(../../assets/images/second/tg.png) no-repeat;
          background-size: 100% 100%;
        }
        .wateN {
          color: #ff900d;
          background: url(../../assets/images/second/bh.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .no-padding-bottom {
        padding-bottom: 0;
      }
    }
  }
}
</style>
<style>
.dialog .van-dialog__cancel .van-button__text {
  color: #ff900d;
}

.van-nav-bar .van-nav-bar__right .sort {
  font-size: 15px;
  color: #434964;
  position: relative;
  letter-spacing: 2px;
  font-weight: bold;
}

.van-nav-bar {
  z-index: 999 !important;
}

.use-car-style .van-cell__title span {
  font-size: 15px;
  color: #6a708a;
}

.use-car-style .van-field__body .van-field__control {
  font-size: 15px;
  color: #b2b4bf;
}
</style>