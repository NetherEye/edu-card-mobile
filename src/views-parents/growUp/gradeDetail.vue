<template>
  <div class="pub">
    <van-nav-bar title="成绩详情" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 46px;background: #f0f0f0;"></div>
    <div v-show="!isSearch" class="title">{{examType}}</div>

    <div class="my-tab" v-show="!isSearch">
      <div class="my-tab-cap my-tab-row">
        <div class="my-tab-col"></div>

        <div class="my-tab-col">个人分数</div>
        <div class="my-tab-col">班级排名</div>
        <div class="my-tab-col">班级平均分</div>
        <div class="my-tab-col">年级平均分</div>
      </div>
      <div class="my-tab-row">
        <div class="my-tab-col" style="background-color: #fffefa;">{{list01.subject}}</div>
        <div class="my-tab-col" style="background-color: #fffefa;">{{list01.score}}</div>
        <div class="my-tab-col" style="background-color: #fbffff;">{{list01.ranking}}</div>
        <div class="my-tab-col" style="background-color: #f9fffc;">{{list01.classAvgScore}}</div>
        <div class="my-tab-col" style="background-color: #fff9f9;">{{list01.gradeAvgScore}}</div>
      </div>
      <div class="my-tab-row" v-for="(item, i) in list" :key="'m' + i">

        <div class="my-tab-col" style="background-color: #fffefa;">{{item.subject}}</div>
        <div class="my-tab-col" style="background-color: #fffefa;">{{item.score}}</div>
        <div class="my-tab-col" style="background-color: #fbffff;">{{item.ranking}}</div>
        <div class="my-tab-col" style="background-color: #f9fffc;">{{item.classAvgScore}}</div>
        <div class="my-tab-col" style="background-color: #fff9f9;">{{item.gradeAvgScore}}</div>
      </div>
    </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import patriApi from '../../assets/api/parents/patri.js'
export default {
  data () {
    return {
      value: '',
      examType: '', //学段
      isSearch: false, // 页面是否处于搜索
      show: false, // 抽屉是否展开
      clist: [],
      historys: [
        '赖萌萌',
        '赖萌萌',
        '赖萌萌',
        '赖萌萌',
        '赖萌萌',
      ],
      list: [],
      list01: [],
    }
  },
  created () {
    if (this.$route.params.examType != undefined) {
      this.examType = this.$route.params.examType
    } else { }
    this.getData();
  },
  methods: {
    getData () {
      var arr = JSON.parse(sessionStorage.getItem('child')).classId
      var att = JSON.parse(sessionStorage.getItem('child')).gradeId
      let par = {
        classId: arr,
        gradeId: att,
        examType: this.examType,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
      }
      this.$http.rq({
        data: par,
        url: patriApi.getranking,
      }).then(res => {

        if (res.code === 200) {
          this.list = res.data.scores
          this.list01 = res.data.totalScore

        } else {

        }

      })
    },
    goBack () {
      if (this.isSearch) {
        this.value = ''
        this.clist = []
        this.isSearch = false
      } else {
        this.$router.go(-1)

      }
    },
    showSearch () {

      this.isSearch = true
    },
    hideSearch () { },
    handleSearch (b) {
      if (this.value === '') {
        this.clist = []
        return
      } else {
        this.$toast(res.message);
      }
      this.clist = []
      this.list.forEach(a => {

        let f = false
        if (a.name.indexOf(this.value) !== -1) {
          f = true
        }
        if (a.id.indexOf(this.value) !== -1) {
          f = true
        }

        if (f) {
          this.clist.push(a)
        }
      })

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
  background-color: #f0f0f0;
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
  .history {
    padding: 12px;
    background-color: #f0f0f0;
    & > p {
      height: 29px;
      font-size: 15px;
      letter-spacing: 2px;
      color: #434964;
      font-weight: bold;
    }
    .history-con {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 12px;
      color: #6a708a;
      .history-item {
        width: 80px;
        height: 35px;
        background-color: #ffffff;
        box-shadow: 0px 0px 13px 0px rgba(27, 121, 197, 0.11);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
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