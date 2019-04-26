<template>

  <div class="pub">
    <van-nav-bar title="班级成绩" left-arrow @click-left="$router.go(-1)" @click-right="show = true" fixed>
      <div class="unfold" slot="right">
        <i></i>
      </div>
    </van-nav-bar>
    <div style="height: 46px;background: #f0f0f0;"></div>
    <van-popup v-model="addclass" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="getClass" @cancel="addclass = false" @confirm="onClass" />
    </van-popup>
    <div class="title">
      <span>{{this.form.examType}}</span>
      <template v-if="this.siteID==1">
        <div class="swtClass" @click="addclass = true"><span>000000000</span><i></i></div>
      </template>
    </div>
    <van-popup v-model="show" position="right" style="height: 100%;">
      <div class="my-drawer">
        <div class="filter-title">
          筛选条件
        </div>
        <div class="filter-item">
          <span>学年</span>
          <div @click="typeShow = true">
            <input v-model="form.schoolYear" disabled="disabled" type="text" placeholder="请选择" />
          </div>
        </div>
        <div class="filter-item">
          <span>学期</span>
          <div @click="semester = true">
            <input v-model="form.semester" disabled="disabled" type="text" placeholder="请选择" />
          </div>
        </div>
        <div class="filter-item">
          <span>考试</span>
          <div @click="examination = true">
            <input v-model="form.examType" type="text" disabled="disabled" placeholder="请选择" />
          </div>
        </div>
        <div class="filter-btns">
          <div class="filter-btn" style="background: #f7a426;" @click="reset">重置</div>
          <div class="filter-btn" style="background: #1496ef;" @click="getData">确认</div>
        </div>
      </div>
    </van-popup>
    <div class="my-tab">
      <div class="my-tab-cap my-tab-row">
        <div class="my-tab-col">学号</div>
        <div class="my-tab-col">姓名</div>

        <div class="my-tab-col" @click="ocClick">总成绩</div>
        <div class="my-tab-col">班级排名</div>
        <div class="my-tab-col">全校排名</div>

      </div>

      <div class="my-tab-row" v-for="(item, i) in list" :key="'m' + i" @click="$router.push({name: '教师成绩详情', params: {gradeRanking:item.gradeRanking,ranking:item.ranking,totalScore:item.totalScore,studentName:item.studentName,semester:item.semester,id:item.studentId,schoolYear:item.schoolYear,examType:item.examType}})">
        <div class="my-tab-col" style="background-color: #fffefa;">{{item.studentId}}</div>
        <div class="my-tab-col" style="background-color: #fbffff;">{{item.studentName}}</div>
        <div class="my-tab-col" style="background-color: #f9fffc;">{{item.totalScore}}</div>
        <div class="my-tab-col" style="background-color: #fff9f9;">{{item.gradeRanking}}</div>
        <div class="my-tab-col" style="background-color: #fdfeff;">{{item.ranking}}</div>
      </div>
    </div>
    <div class="by" v-show="goTop" @click="goTopDivTop">
      <span></span> </div>
    <div style="height: 20px;"></div>
    <!-- 考试 -->
    <van-popup v-model="examination" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns3" @cancel="examination = false" @confirm="onExamination" />
    </van-popup>
    <!-- 学年 -->
    <van-popup v-model="typeShow" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns1" @cancel="typeShow = false" @confirm="onConfirm" />
    </van-popup>
    <!-- 学期 -->
    <van-popup v-model="semester" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns2" @cancel="semester = false" @confirm="onSemester" />
    </van-popup>
  </div>

</template>

<script>
import markApi from '../../assets/api/teacher/studentmark.js'
export default {
  data () {
    return {
      semester: false,
      show: false,
      addclass: false, //班级
      examination: false,
      list: [],
      typeShow: false,
      columns1: ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020'],
      columns2: ['第一学期', '第二学期'],
      columns3: ['期中考试', '期末考试'],
      getClass: [], //班级数组
      siteID: '',
      userInfo: '',//判断教师
      classID: '', //班级
      gradeID: '', //年级
      headline: '',
      form: {
        order: '',
        studentId: '',
        grade: '',
        schoolYear: '',
        semester: '',
        examType: '期末考试',
        classId: '',
      },
      goTop: false,
      state: 0,

    }
  },
  created () {
    if (this.$route.params.id != undefined) {
      this.siteID = this.$route.params.id
    } else {
    }
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo')).role
    var classId = JSON.parse(sessionStorage.getItem('class')).classId
    this.classID = classId
    var gradeId = JSON.parse(sessionStorage.getItem('class')).gradeId
    this.gradeID = gradeId
    this.getData();
  },
  mounted () {

    document.querySelector('.pub').onscroll = (params) => {
      let top = document.querySelector('.pub').scrollTop;
      if (top >= 200) {
        this.goTop = true
      } else {
        this.goTop = false
      }
    }
  },

  methods: {
    ocClick () {
      this.state++
      if (this.state > 1) {
        this.state = 0
      }
      this.form.order = this.state
      this.getData();
    },
    Backtrack () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    onConfirm (val, inx) {
      this.form.schoolYear = val
      this.typeShow = false
    },
    onSemester (val, inx) {
      this.form.semester = val
      this.semester = false
    },
    onExamination (val, inx) {
      this.form.examType = val
      this.examination = false
    },
    //班级
    onClass (val, inx) {

    },
    getData () {
      let par = {
        order: this.form.order,
        studentId: this.form.studentId,
        grade: this.gradeID,
        schoolYear: this.form.schoolYear,
        semester: this.form.semester,
        examType: this.form.examType,
        classId: this.classID,
        pageSize: 99999999,
        pageNumber: 1
      }
      this.$http.rq({
        data: par,
        url: markApi.markscore,
      }).then(res => {

        if (res.code === 200) {
          this.list = res.data
          this.list.forEach(a => {
            this.headline = a.examType
          })
        } else {
          this.$toast(res.message);
          this.list = []
        }

      })
    },
    //重置
    reset () {
      this.form = []
    },
    goTopDivTop () {
      document.querySelector('.pub').scrollTop = 0
    }
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
  overflow: auto;
  .by {
    position: fixed;
    bottom: 84px;
    right: 15px;
    background: #d1eafc;

    border-radius: 50%;
    display: flex;
    z-index: 666;
    align-items: center;
    justify-content: center;
    & > span {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 38px 0px rgba(20, 150, 239, 0.64);
      font-size: 15px;
      letter-spacing: 1px;
      color: #1496ef;
      background: url(../../assets/img/fanhui.png) no-repeat;
      background-size: 100% 100%;
    }
  }

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
  .my-drawer {
    height: 100%;
    width: 250px;
    background-color: #ffffff;
    padding: 20px 10px 10px 15px;
    .filter-title {
      font-size: 15px;
      letter-spacing: 2px;
      color: #434964;
      margin-bottom: 10px;
    }
    .filter-item {
      height: 45px;
      background-color: #ffffff;
      box-shadow: 0px 0px 13px 0px rgba(215, 215, 215, 0.79);
      border-radius: 5px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      & > span {
        width: 30px;
        font-size: 12px;
        letter-spacing: 1px;
        color: #434964;
        margin-left: 11px;
      }
      & > div {
        height: 26px;
        width: 175px;
        background-color: #f4f4f4;
        border-radius: 4px;
        input[type="text"] {
          font-size: 12px;
          letter-spacing: 1px;
          color: #b2b4bf;
          display: block;
          outline: 0;
          border: none;
          padding: 0 1em;
          background-color: #f4f4f4;
          border-radius: 4px;
          text-decoration: none;
          width: 100%;
          height: 100%;
        }
      }
    }
    .filter-btns {
      display: flex;
      margin-top: 50px;
      .filter-btn {
        width: 96px;
        height: 40px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        letter-spacing: 2px;
        color: #ffffff;
        font-size: 15px;
        margin-right: 15px;
      }
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
  background: url(../../assets/images/second/sx.png) no-repeat;
  background-size: 100% 100%;
}

.van-nav-bar {
  z-index: 999 !important;
}
</style>