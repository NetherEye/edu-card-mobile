<template>
  <div class="pub">
    <van-nav-bar title="班级考勤" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 44px;"></div>
    <div style="height: 5px;background: #F0F0F0;"></div>
    <div class="vis">
      <div class="time-container">
        <div class="left"></div>
        <div class="center">
          <div class="pre" @click="handleT('pre')"></div>
          <div class="year-month-day">
            {{time}}
          </div>
          <div class="next" @click="handleT('next')"></div>
        </div>
        <div class="right">
          <span @click="monthOrDay = true" :class="{'active-month-or-day': monthOrDay}">日</span>
          <span @click="monthOrDay = false" :class="{'active-month-or-day': !monthOrDay}">月</span>
        </div>
      </div>
      <div class="ect" v-show="hidePir" style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
        <p style="font-size: 12px;width: 100%;letter-spacing: 1px;color: #6a708a;text-align: right;padding-right: 20px;margin: 10px 0;">单位：人</p>
        <canvas id="myChart" style="width: 320px;height: 240px;"></canvas>
      </div>
    </div>
    <div class="cop" v-if="Hidelist">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title" class="circle">
            <i style="background-color: #f2637b;"></i>
            <span>迟到</span>
          </div>
          <div class="l-item van-hairline--bottom" v-for="item in overdue">
            <div class="lf">{{item.stuName}}</div>
            <div class="cr"></div>
            <div class="rt">{{item.inputTime}}</div>
          </div>
        </van-collapse-item>
        <van-collapse-item name="2">
          <div slot="title" class="circle">
            <i style="background-color:  #ffccff;"></i>
            <span>早退</span>
          </div>
          <div class="l-item van-hairline--bottom" v-for="item in early">
            <div class="lf">{{item.stuName}}</div>
            <div class="cr"></div>
            <div class="rt">{{item.inputTime}}</div>
          </div>
        </van-collapse-item>
        <van-collapse-item name="3">
          <div slot="title" class="circle">
            <i style="background-color:  #4ecb73;"></i>
            <span>请假</span>
          </div>
          <div class="l-item van-hairline--bottom" v-for="item in leave">
            <div class="lf">{{item.stuName}}</div>
            <div class="cr"></div>
            <div class="rt">{{item.inputTime}}</div>
          </div>
        </van-collapse-item>
        <van-collapse-item name="4">
          <div slot="title" class="circle">
            <i style="background-color: #36cbcb;"></i>
            <span>异常</span>
          </div>
          <div class="l-item van-hairline--bottom" v-for="item in abnormal">
            <div class="lf">{{item.stuName}}</div>
            <div class="cr"></div>
            <div class="rt">{{item.inputTime}}</div>
          </div>
        </van-collapse-item>
        <van-collapse-item name="5">
          <div slot="title" class="circle">
            <i style="background-color: #fbd437;"></i>
            <span>缺旷</span>
          </div>
          <div class="l-item van-hairline--bottom" v-for="item in absent">
            <div class="lf">{{item.stuName}}</div>
            <div class="cr"></div>
            <div class="rt">{{item.inputTime}}</div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

  </div>
</template>

<script>
import AttendanceApi from '../../assets/api/teacher/Attendance.js'
import moment from 'moment';
moment.locale('zh-cn');
const F2 = require('@antv/f2/lib/core');
const Animation = require('@antv/f2/lib/animation/detail');
F2.Chart.plugins.register(Animation); // 这里进行全局注册，也可以给 chart 的实例注册
require('@antv/f2/lib/geom/');
require('@antv/f2/lib/coord/polar');
require('@antv/f2/lib/geom/adjust/stack');
const Legend = require('@antv/f2/lib/plugin/legend');
F2.Chart.plugins.register(Legend);
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
F2.Chart.plugins.register(Tooltip);
const PieLabel = require('@antv/f2/lib/plugin/pie-label'); // 引入 PieLabel 模块
// 方式一：全局注册
F2.Chart.plugins.register(PieLabel);

export default {
  data () {
    return {

      Hidelist: false,
      activeNames: ['1'],
      monthOrDay: true, // true 日
      time: '',
      list: [],
      newData: [], //1正常
      overdue: [], //2迟到
      early: [], //3早退
      absent: [], //4缺席
      abnormal: [], //5异常
      leave: [], //6请假
      arr: [0, 0, 0, 0, 0, 0],
      data: [{
        name: '正常',
        y: 0,
        const: 'const'
      }, {
        name: '迟到',
        y: 0,
        const: 'const'
      }, {
        name: '早退',
        y: 0,
        const: 'const'
      },
      {
        name: '缺旷',
        y: 0,
        const: 'const'
      },
      {
        name: '异常',
        y: 0,
        const: 'const'
      }, {
        name: '请假',
        y: 0,
        const: 'const'
      },

      ],
      hidePir: false // 是否隐藏饼图
    }
  },
  created () {
    this.time = moment().format("YYYY-MM-DD");
    this.getData()
    this.getquantity()
  },
  mounted () {

  },
  methods: {
    getData () {
      var classId = JSON.parse(sessionStorage.getItem('class')).classId
      var gradeId = JSON.parse(sessionStorage.getItem('class')).gradeId
      let par = {
        classId: classId,
        gradeId: gradeId,
        date: this.time,
      }
      this.$http.rq({
        data: par,
        url: AttendanceApi.checkDetailsStudentInfo,
      }).then(res => {
        if (res.code === 200) {
          res.data.forEach(a => {
            if (a.state === 1) {
              this.newData.push({
                checkTime: a.checkTime,
                inputTime: a.inputTime,
                outTime: a.outTime,
                stuName: a.stuName,
                studentId: a.studentId
              })
            }
            if (a.state === 2) {
              this.overdue.push({
                checkTime: a.checkTime,
                inputTime: a.inputTime,
                outTime: a.outTime,
                stuName: a.stuName,
                studentId: a.studentId
              })
            }
            if (a.state === 3) {
              this.early.push({
                checkTime: a.checkTime,
                inputTime: a.inputTime,
                outTime: a.outTime,
                stuName: a.stuName,
                studentId: a.studentId
              })
            }
            if (a.state === 4) {
              this.absent.push({
                checkTime: a.checkTime,
                inputTime: a.inputTime,
                outTime: a.outTime,
                stuName: a.stuName,
                studentId: a.studentId
              })
            }
            if (a.state === 5) {
              this.abnormal.push({
                checkTime: a.checkTime,
                inputTime: a.inputTime,
                outTime: a.outTime,
                stuName: a.stuName,
                studentId: a.studentId
              })
            }
            if (a.state === 6) {
              this.leave.push({
                checkTime: a.checkTime,
                inputTime: a.inputTime,
                outTime: a.outTime,
                stuName: a.stuName,
                studentId: a.studentId
              })
            }
            this.Hidelist = true
          })

        } else {
          this.Hidelist = false
          this.newData = []
          this.overdue = []
          this.early = []
          this.absent = []
          this.abnormal = []
          this.leave = []
        }

      })
    },
    //获取数量
    getquantity () {
      var classId = JSON.parse(sessionStorage.getItem('class')).classId
      var gradeId = JSON.parse(sessionStorage.getItem('class')).gradeId
      let par = {
        classId: classId,
        gradeId: gradeId,
        date: this.time,
      }
      this.$http.rq({
        data: par,
        url: AttendanceApi.checkDetailsCountByClass,
      }).then(res => {
        if (res.code === 200) {
          this.hidePir = true
          this.arr = [0, 0, 0, 0, 0, 0]
          res.data.forEach(a => {
            this.arr[Number(a.state) - 1] = a.count
          })
          this.data[0].y = this.arr[0]
          this.data[1].y = this.arr[1]
          this.data[2].y = this.arr[2]
          this.data[3].y = this.arr[3]
          this.data[4].y = this.arr[4]
          this.data[5].y = this.arr[5]

          this.initEct()

        } else if (res.code === 201) {
          this.hidePir = false
        }

      })
    },
    initEct () {
      var data = this.data;
      var chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        radius: 0.75
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      // 添加饼图文本
      chart.pieLabel({
        sidePadding: 40,
        label1: function label1 (data, color) {
          return {
            text: data.name + data.y + '人',
            fill: color
          };
        },
      });

      chart.interval().position('const*y').color('name', ['#3aa1ff', '#f2637b', '#ffccff', '#fbd437', '#36cbcb', '#4ecb73']).adjust('stack')
      chart.render();
      this.chart = chart
    },
    handleT (ti) {
      let sum = ''
      if (ti == 'pre') {
        sum = -1
      } else if (ti == 'next') {
        sum = 1
      }
      if (this.monthOrDay) {
        var dateTime = new Date(this.time);
        dateTime = dateTime.setDate(dateTime.getDate() + sum);
        this.time = moment(dateTime).format("YYYY-MM-DD");
        this.getData()
        this.getquantity()
      } else {
        var dateTime = new Date(this.time);
        dateTime = dateTime.setMonth(dateTime.getMonth() + sum);
        let t = moment(dateTime).format("YYYY-MM-DD").split('-');
        this.time = this.formatTime(t[0] + '-' + t[1])
        this.getData()
        this.getquantity()
      }
    },
    // 格式化time
    formatTime (time) {
      let arr = time.split('-')
      if (arr[1].length === 1) {
        arr[1] = '0' + arr[1]
      }
      if (arr.length === 3) {
        if (arr[2].length === 1) {
          arr[2] = '0' + arr[2]
        }
      }
      return arr.join('-')
    }
  },
  watch: {
    monthOrDay (b) {
      if (b) {
        this.time = moment().format("YYYY-MM-DD");
      } else {
        let t = moment().format("YYYY-MM-DD").split('-');
        this.time = t[0] + '-' + t[1]
      }
      this.getData()
      this.getquantity()
    }
  }
}
</script>

<style lang="less" scoped>
.pub {
  .vis {
    padding: 15px 11px 0 0;
    .time-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 25px;
      .left {
        width: 50px;
      }
      .center {
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        .pre {
          width: 8px;
          height: 13px;
          background: url(../../assets/images/second/z.png) no-repeat;
          background-size: 100% 100%;
        }
        .year-month-day {
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          letter-spacing: 1px;
          color: #434964;
          margin: 0 8px;
        }
        .next {
          width: 8px;
          height: 13px;
          background: url(../../assets/images/second/y.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .right {
        width: 68px;
        height: 25px;
        display: flex;
        span {
          letter-spacing: 1px;
          color: #1496ef;
          font-size: 12px;
          display: inline-block;
          background: #f0f0f0;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        span:first-child {
          border-radius: 4px 0px 0px 4px;
        }
        span:last-child {
          border-radius: 0px 4px 4px 0px;
        }
        .active-month-or-day {
          background-color: #1496ef;
          color: #ffffff;
        }
      }
    }
  }
  .cop {
    .circle {
      i {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-right: 6px;
      }
      span {
        font-size: 14px;
        letter-spacing: 1px;
        color: #434964;
      }
    }
    .l-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
    }
  }
}
</style>