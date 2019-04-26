<template>
  <div class="pub">
    <van-nav-bar title="选择日期&课时" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 46px;background: #f0f0f0;"></div>

    <div class="wrap">
      <div class="title">{{siteName}}</div>
      <div id="">
        <van-popup v-model="dateShow" position="bottom" :overlay="true">
          <van-datetime-picker v-model="date" type="date" @cancel="()=>{dateShow = false;}" @confirm="()=>{form[setDateType] = $moment(JSON.parse(JSON.stringify(date))).format('YYYY-MM-DD'); dateShow = false}" />
        </van-popup>
        <van-popup v-model="startdatetime" position="bottom" :overlay="true">
          <van-datetime-picker v-model="currentDate" type="time" @cancel="()=>{startdatetime = false;}" @confirm="gettimeon01(currentDate)" />
        </van-popup>
        <van-popup v-model="enddatetime" position="bottom" :overlay="true">
          <van-datetime-picker v-model="currentDate" type="time" @cancel="()=>{enddatetime = false;}" @confirm="gettimeon(currentDate)" />
        </van-popup>

        <van-cell-group style="margin-bottom: 9px;">
          <div @click="() => {dateShow = true;setDateType = 'useTime'}">
            <van-field label="日期" placeholder="请输入" disabled v-model="form.useTime" clearable />
          </div>
        </van-cell-group>
        <van-cell-group style="margin-bottom: 9px;">
          <div @click="() => {startdatetime = true;timeType = 'startTime'}">
            <van-field label="开始时间" placeholder="请输入" disabled v-model="form.startTime" clearable />
          </div>
        </van-cell-group>
        <van-cell-group style="margin-bottom: 9px;">
          <div @click="() => {enddatetime = true;timeType = 'finishTime'}">
            <van-field label="结束时间" placeholder="请输入" disabled v-model="form.finishTime" clearable />
          </div>
        </van-cell-group>
      </div>
      <van-cell-group style="margin-top: 10px;">
        <van-field label="活动描述" v-model="form.describe" :maxlength="50" type="textarea" clearable placeholder="请输入" />
      </van-cell-group>

      <div class="sub-btn" @click="onSubmit">
        提交
      </div>

    </div>
  </div>
</template>

<script>
import carsite from '../../assets/api/teacher/site.js'
export default {
  data () {
    return {
      dateShow: false,
      startdatetime: false,
      enddatetime: false,
      date: new Date(),
      currentDate: '12:00',
      timeType: '', //设置时间类型
      setDateType: '', // 设置日期的类型
      siteID: '', //场地id
      siteName: '', //场地名称
      siteContainPerson: '', //场地容纳人数
      show: false,
      form: {
        useTime: '',
        startTime: '',
        finishTime: '',
        describe: '',
      }
    }
  },
  created () {
    if (this.$route.params.id != undefined) {
      this.siteID = this.$route.params.id
    } else {
    }
    this.information()
  },
  methods: {
    //获取场地信息
    information () {
      let par = {
        placeId: this.siteID,
      }
      this.$http.rq({
        url: carsite.siteinfot,
        data: par,
      }).then(res => {
        if (res.code === 200) {
          this.siteName = res.data.placeName
          this.siteContainPerson = res.data.containPerson
        } else {
          this.$toast(res.message);
        }

      })
    },
    //提交
    onSubmit () {
      if (this.form.useTime == '') {
        this.$toast('日期不能为空');
        return
      }
      if (this.form.startTime == '') {
        this.$toast('开始时间不能为空');
        return
      }
      if (this.form.finishTime == '') {
        this.$toast('结束时间不能为空');
        return
      }
      if (this.form.describe == '') {
        this.$toast('活动描述不能为空');
        return
      }
      //当前日期
      let useTimetwo = this.$moment().subtract('days', 1).format('YYYY-MM-DD')
      //获取日期
      let useTime = this.form.useTime
      // 两周后日期
      let useTimeone = this.$moment().add('days', 14).format('YYYY-MM-DD')
      let falg = false
      if (this.$moment(useTime).isBetween(useTimetwo, useTimeone, 'day')) {
        this.falg = true
      } else {
        this.$toast('日期只能提前两周预约');
        this.falg = false
        return
      }
      let d = new Date()
      let ft1 = d.setHours(this.form.startTime.split(":")[0], this.form.startTime.split(":")[1])
      let ft2 = d.setHours(this.form.finishTime.split(":")[0], this.form.finishTime.split(":")[1])

      if (ft1 > ft2) {
        this.$toast('开始时间不能晚于结束时间');
        return
      }
      let par = {
        placeId: this.siteID,
        placeName: this.siteName,
        containPerson: this.siteContainPerson,
        useTime: this.form.useTime,
        startTime: this.form.startTime,
        finishTime: this.form.finishTime,
        describe: this.form.describe,
        reservationPerson: '',
      }
      this.$http.rq({
        url: carsite.sitereservation,
        data: par,
        method: 'post',
      }).then(res => {
        if (res.code === 200) {
          this.$router.push('/site-history')
        } else {
          this.$toast(res.message);
        }

      })
    },
    gettimeon01 (currentDate) {
      this.form.startTime = (currentDate + ":" + "00")
      this.startdatetime = false
    },
    gettimeon (currentDate) {
      this.form.finishTime = (currentDate + ":" + "00")
      this.enddatetime = false
    },

  },
  watch: {
    show (v) {
      // 此处清空 filter
    }
  }

}
</script>

<style lang="less" scoped>
.pub {
  height: 100%;
  background: #f0f0f0;
  .wrap {
    background: #f0f0f0;
    .title {
      font-size: 15px;
      letter-spacing: 2px;
      color: #434964;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
      height: 41px;
      font-weight: bold;
    }
    .isSelect,
    .select,
    .dis {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .select {
      background-color: #51ce7a;
      & > span {
        display: inline-block;
        width: 10px;
        height: 5px;
        background: #ffffff;
        line-height: 0;
        font-size: 0;
        vertical-align: middle;
        border-radius: 2px;
        -webkit-transform: rotate(45deg) translateY(100%);
      }
      & > span:after {
        content: "/";
        display: block;
        width: 18px;
        height: 5px;
        border-radius: 2px;
        background: #ffffff;
        -webkit-transform: rotate(-90deg) translateX(40%) translateY(-20%);
      }
    }
    .dis {
      background-color: #f7a426;
      & > span {
        font-size: 12px;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
    .lat {
      flex: 1;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff3e9;
      i {
        display: inline-block;
        width: 21px;
        height: 21px;
        background: url(../../assets/images/second/sin.png) no-repeat;
        background-size: 100% 100%;
        margin-right: 5px;
      }
      span {
        font-size: 15px;
        color: #6a708a;
      }
    }
  }
  .sub-btn {
    height: 45px;
    font-size: 15px;
    letter-spacing: 2px;
    color: #ffffff;
    margin: 20px;
    margin-bottom: 12px;
    background-color: #1496ef;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<style>
.van-nav-bar .van-nav-bar__right .unfold {
  height: 46px;
  display: flex;
  align-items: center;
}

.van-nav-bar {
  z-index: 999 !important;
}
</style>