<template>
  <div class="home">
    <van-nav-bar title="考勤" left-arrow @click-left="$router.go(-1)" @click-right="showTime" fixed>
      <div class="unfold" slot="right">
        <i></i>
      </div>
    </van-nav-bar>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker v-model="currentDate" :type="activeT === 'left' ? 'date' : 'year-month'" @cancel="show = false" @confirm="setTime" />
    </van-popup>

    <div style="height: 44px;background: #f0f0f0;"></div>
    <div class="main">
      <div class="tabber">
        <div class="t-left" :class="activeT == 'left' ? 'activeTab' : ''" @click="handleTab('left')">考勤</div>
        <div class="t-right" :class="activeT == 'right' ? 'activeTab' : ''" @click="handleTab('right')">考勤记录</div>
      </div>
      <div class="mox" v-if="activeT == 'left'" key="mox1">
        <div class="youChild">
          <i v-if="dayData.stuName !== ''"></i>
          <span>{{dayData.stuName}}</span>
        </div>
        <p class="warnTitle">{{$moment(date).format('YYYY-MM-DD')}} {{$moment(date).format('dddd')}}
        </p>
        <div class="clockIO">
          <div class="daka"><i></i><span> 打卡时间 </span>
            <div class="time">{{dayData.inputTime }}&nbsp;{{dayData.checkTime?dayData.checkTime:''}}</div>
            <!-- <div class="sate">正常</div> -->
          </div>
          <div class="sLine"></div>
          <div class="daka dataBottom"><i></i><span>打卡时间</span>
            <div class="time">{{dayData.inputTime }}&nbsp;{{dayData.outTime?dayData.outTime:''}}</div>
            <!-- <div class="sate">正常</div> -->
          </div>
        </div>
      </div>
      <div class="mox" v-else key="mox2">
        <div class="youChild">
          <i v-if="monthData.stuName !== ''"></i>
          <span>{{monthData.stuName}}</span>
          <div class="isNormal" :class="abnormal2 ? 'abb' : ''">{{abnormal2 ? '当月打卡异常' : '当月打卡正常'}}</div>
        </div>
        <p class="warnTitle">{{$moment(date).format('YYYY-MM')}}</p>
        <van-collapse v-model="activeNames" @change="ckCell" accordion>
          <van-collapse-item name="1" :value="monthData.total + ' 天'">
            <div slot="title" style="display: flex;align-items: center;">
              <van-icon name="question" color="#65e1a9" size="10px" style="margin-right: 5px;" />
              <span class="c-font">出勤</span>

            </div>
            出勤正常
          </van-collapse-item>
          <van-collapse-item name="2" :value="monthData.late + ' 次'">
            <div slot="title" style="display: flex;align-items: center;">
              <van-icon name="question" v-if="monthData.late != 0" color="#ff9c00" size="10px" style="margin-right: 5px;" />
              <span class="c-font">迟到</span>

            </div>
            <div v-if="late.length == 0">
              没有迟到记录
            </div>
            <div v-else>
              <div class="cpList" v-for="(item, index) in late" :key="index">
                {{item.inputTime}}
              </div>
            </div>
          </van-collapse-item>
          <van-collapse-item name="3" :value="monthData.leaveEarly + ' 次'">
            <div slot="title" style="display: flex;align-items: center;">
              <van-icon name="question" v-if="monthData.leaveEarly != 0" color="#ff9c00" size="10px" style="margin-right: 5px;" />
              <span class="c-font">早退</span>

            </div>
            <div v-if="leaveEarly.length == 0">
              没有早退记录
            </div>
            <div v-else>
              <div class="cpList" v-for="(item, index) in leaveEarly" :key="index">
                {{item.inputTime}}
              </div>
            </div>
          </van-collapse-item>
          <van-collapse-item name="4" :value="monthData.truancy + ' 次'">
            <div slot="title" style="display: flex;align-items: center;">
              <van-icon name="question" v-if="monthData.truancy != 0" color="#ff9c00" size="10px" style="margin-right: 5px;" />
              <span class="c-font">缺席</span>

            </div>

            <div v-if="truancy.length == 0">
              没有缺席记录
            </div>
            <div v-else>
              <div class="cpList" v-for="(item, index) in truancy" :key="index">
                {{item.inputTime}}
              </div>
            </div>
          </van-collapse-item>
          <van-collapse-item name="5" :value="monthData.exception + ' 次'">
            <div slot="title" style="display: flex;align-items: center;">
              <van-icon name="question" v-if="monthData.exception != 0" color="#ff9c00" size="10px" style="margin-right: 5px;" />
              <span class="c-font">异常</span>

            </div>
            <div v-if="exception.length == 0">
              没有异常记录
            </div>
            <div v-else>
              <div class="cpList" v-for="(item, index) in exception" :key="index">
                {{item.inputTime}}
              </div>
            </div>
          </van-collapse-item>
          <van-collapse-item name="6" :value="monthData.leave + ' 次'">
            <div slot="title" style="display: flex;align-items: center;">
              <van-icon name="question" v-if="monthData.leave != 0" color="#ff9c00" size="10px" style="margin-right: 5px;" />
              <span class="c-font">请假</span>

            </div>
            <div v-if="leave.length == 0">
              没有请假记录
            </div>
            <div v-else>
              <div class="cpList" v-for="(item, index) in leave" :key="index">
                {{item.inputTime}}
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>

    </div>
  </div>
</template>

<script>
import attApi from '../../assets/api/parents/Attendance.js'
export default {
  data () {
    return {
      activeT: 'left',
      studentName: '',
      show: false,
      currentDate: new Date(),
      date: new Date(),
      dayData: {
        stuName: '',
        checkTime: '',
        outTime: ''
      },
      monthData: {
        stuName: '',
        normal: '',
        exception: '',
        late: '',
        leaveEarly: '',
        truancy: '',
        total: '',
        leave: ''
      },
      late: [],
      exception: [],
      leaveEarly: [],
      truancy: [],
      leave: [],
      activeNames: '',
      abnormal1: false, // 检测是否异常
      abnormal2: false // 检测是否异常
    }
  },
  created () {
    if (JSON.parse(sessionStorage.getItem('child')).studentName != undefined) {
      this.studentName = JSON.parse(sessionStorage.getItem('child')).studentName
    }
    this.getData()
  },
  methods: {
    handleTab (t) {
      this.activeT = t
      this.show = false
      this.date = new Date()
      this.getData()
    },
    getData () {
      if (this.activeT === 'left') {
        this.getDayData()
      } else {
        this.getMonthData()
      }
    },
    getDayData () {
      let par = {
        date: this.$moment(this.date).format('YYYY-MM-DD')
      }
      this.$http.rq({
        url: attApi.date,
        data: par
      }).then(res => {
        console.log(res, '555')
        if (res.code === 200) {
          this.dayData = res.data[0]

        } else {
          this.$toast(res.message)
        }
      })
    },
    getMonthData () {
      let par = {
        date: this.$moment(this.date).format('YYYY-MM')
      }
      this.$http.rq({
        url: attApi.month,
        data: par
      }).then(res => {
        if (res.code === 200) {
          this.monthData = res.data
          this.abnormal2 = false
          for (let key in res.data) {
            let arr = ['exception', 'late', 'leave', 'leaveEarly', 'truancy'];
            if (arr.indexOf(key) !== -1) {
              if (res.data[key] > 0) {
                this.abnormal2 = true
                return
              }
            }
          }
        } else {
          this.$toast(res.message)
        }
      })
    },
    showTime () {
      this.show = true
    },
    setTime () {
      this.date = this.currentDate
      this.show = false
      this.getData()
    },
    ckCell (index) {
      if (index == '' || index == 1) {
        return
      }
      let arr = ['', '', 'late', 'leaveEarly', 'truancy', 'exception', 'leave'];
      if (this.monthData[arr[index]] == 0) {
        return
      }
      let par = {
        date: this.$moment(this.date).format('YYYY-MM'),
        state: index
      }
      this.$http.rq({
        url: attApi.detail,
        data: par
      }).then(res => {
        if (res.code === 200) {
          this[arr[index]] = res.data
        } else {
          this[arr[index]] = []
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  background: #f0f0f0;
}
.c-font {
  font-size: 15px;
  color: #6a708a;
}
.abb {
  color: #ff9c00 !important;
}
.cpList {
  font-size: 11px;
  color: #c2c2c2;
  padding-left: 16px;
  margin: 0px 0 5px 0;
}

.main {
  .warnTitle {
    height: 24px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    font-size: 11px;
    color: #b2b4bf;
  }

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

  .youChild {
    height: 50px;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 15px;
      letter-spacing: 2px;
      color: #6a708a;
      margin-left: 10px;
      display: flex;
      align-items: center;
      flex: 1;
    }

    i {
      display: inline-block;
      width: 44px;
      height: 46px;
      background: url(../../assets/img/tou.png) no-repeat;
      background-size: 100% 100%;
      margin-left: 12px;
    }

    .isNormal {
      color: #65e1a9;
      font-size: 12px;
      margin-right: 11px;
    }
  }

  .clockIO {
    height: 190px;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
    padding-top: 15px;
    padding-left: 12px;
    position: relative;

    .daka {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #6a708a;

      i {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #cccccc;
        margin-right: 4px;
      }

      .time {
        margin-right: 10px;
        margin-left: 10px;
      }

      .sate {
        font-size: 11px;
        color: #c2c2c2;
      }
    }

    .dataBottom {
      margin-top: 96px;
    }

    .sLine {
      width: 1px;
      height: 120px;
      background-color: #cccccc;
      position: absolute;
      left: 16.3px;
      top: 20px;
    }
  }
}
</style>
<style>
.van-nav-bar .van-nav-bar__right .unfold {
  height: 46px;
  display: flex;
  align-items: center;
}

.van-nav-bar .van-nav-bar__right .unfold i {
  display: inline-block;
  width: 17px;
  height: 17px;
  background: url(../../assets/img/date.png) no-repeat;
  background-size: 100% 100%;
}

.van-nav-bar {
  z-index: 999 !important;
}
</style>
