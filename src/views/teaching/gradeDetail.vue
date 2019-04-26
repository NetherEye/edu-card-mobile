<template>
  <div class="pub">
    <van-nav-bar :title="$route.params.studentName + '成绩详情'" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 44px;background: #f0f0f0;"></div>
    <div class="item van-hairline--bottom">
      {{$route.params.studentName + ' ' + $route.params.id}}
    </div>
    <div class="item van-hairline--bottom" v-for="item in list" :key="item.week">
      <div class="van-hairline--right" style="">
        <i class="i-circle" style="background-color: #00c27c;"></i>
        <span>{{item.subject}}</span>
        <span>{{item.score}}</span>
      </div>
    </div>
    <!-- <div class="item van-hairline--bottom">
      <div class="van-hairline--right">
        <i class="i-circle" style="background-color: #ff6b34;"></i>
        <span>英语</span>
        <span>59</span>
      </div>
      <div>
        <i class="i-circle" style="background-color: #897ef4;"></i>
        <span>自然</span>
        <span>86</span>
      </div>
    </div>
    <div class="item van-hairline--bottom">
      <div class="van-hairline--right">
        <i class="i-circle" style="background-color: #2ea6f2;"></i>
        <span>音乐</span>
        <span>59</span>
      </div>
      <div>

      </div>
    </div> -->

    <div class="item-count">
      <div>
        <p>总成绩</p>
        <p>{{totalScore}}</p>
      </div>
      <div>
        <p>班级排名</p>
        <p>{{gradeRanking}}</p>
      </div>
      <div>
        <p>年级排名</p>
        <p>{{ranking}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import markApi from '../../assets/api/teacher/studentmark.js'
export default {
  data () {
    return {
      list01: '',
      list: [],
      studentId: '', //学生学号
      schoolYear: '', //学年
      semester: '', //学期
      examType: '', //考试类型
      gradeRanking: '', //班级排名
      ranking: '', //全校排名
      totalScore: '' //总成绩
    }
  },
  created () {
    if (this.$route.params.id != undefined) {

      this.studentId = this.$route.params.id
    } else { }
    if (this.$route.params.gradeRanking != undefined) {

      this.gradeRanking = this.$route.params.gradeRanking
    } else { }
    if (this.$route.params.ranking != undefined) {

      this.ranking = this.$route.params.ranking
    } else { }
    if (this.$route.params.studentName != undefined) {

      this.studentName = this.$route.params.studentName
    } else { }
    if (this.$route.params.semester != undefined) {

      this.semester = this.$route.params.semester
    } else { }
    if (this.$route.params.schoolYear != undefined) {

      this.schoolYear = this.$route.params.schoolYear
    } else { }
    if (this.$route.params.examType != undefined) {

      this.examType = this.$route.params.examType
    } else { }
    if (this.$route.params.totalScore != undefined) {

      this.totalScore = this.$route.params.totalScore
    } else { }
    this.getData()
  },
  methods: {
    getData () {
      var classId = JSON.parse(sessionStorage.getItem('class')).classId
      var gradeId = JSON.parse(sessionStorage.getItem('class')).gradeId
      let par = {
        schoolYear: this.schoolYear,
        semester: this.semester,
        examType: this.examType,
        classId: classId,
        studentId: this.studentId
      }

      this.$http.rq({
        data: par,
        url: markApi.classscore,
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data.scores
          this.list01 = res.data.totalScore
        } else {
          this.$toast(res.message);
          this.list = []
        }

      })
    },
  },
  watch: {

  }

}
</script>

<style lang="less" scoped>
.pub {
  .item {
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 15px;
    color: #6a708a;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      .i-circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 9px;
      }
      span:nth-child(2) {
        font-size: 15px;
        color: #6a708a;
      }
      span:nth-child(3) {
        font-size: 15px;
        color: #b2b4bf;
        flex: 1;
        text-align: right;
        padding-right: 23px;
      }
    }
    & > div:nth-child(2) {
      padding-left: 25px;
    }
  }
  .item-count {
    margin-top: 17px;
    height: 58px;
    display: flex;
    justify-content: space-around;
    & > div {
      width: 109px;
      height: 58px;
      /*display: flex;
				flex-direction: column;*/
      font-size: 15px;
      color: #ffffff;
      & > p {
        padding-left: 15px;
      }
      & > p:nth-child(1) {
        margin-top: 10px;
      }
    }
    & > div:nth-child(1) {
      background: url(../../assets/images/second/zcj.png) no-repeat;
      background-size: 100% 100%;
    }
    & > div:nth-child(2) {
      background: url(../../assets/images/second/bjpm.png) no-repeat;
      background-size: 100% 100%;
    }
    & > div:nth-child(3) {
      background: url(../../assets/images/second/njpm.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>