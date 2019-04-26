<template>
  <div class="pub">
    <van-nav-bar title="成绩" left-arrow @click-left="goBack" @click-right="show = true" fixed>
      <div class="unfold" slot="right">
        <i></i>
      </div>
    </van-nav-bar>
    <div style="height: 46px;background: #f0f0f0;"></div>
    <van-search placeholder="输入姓名、学号" @focus="showSearch" @blur="hideSearch" @input="handleSearch" v-model="value" />
    <van-popup v-model="addclass" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="getClass" value-key="coursename" @cancel="addclass = false" @confirm="onClass" />
    </van-popup>
    <div v-show="!isSearch" class="title">
      <span>{{this.form.schoolYear}}</span>
      <div class="swtClass" @click="addclass = true"><span>{{kemu.coursename}}</span><i></i></div>
    </div>
    <van-popup v-model="show" position="right" style="height: 100%;">
      <div class="my-drawer">
        <div class="filter-title">
          筛选条件
        </div>
        <div class="filter-item">
          <span>学年</span>
          <div @click="typeShow = true">
            <input v-model="form.schoolYear" disabled="disabled" type="text" placeholder="2018~2019" />
          </div>
        </div>
        <div class="filter-item">
          <span>学期</span>
          <div @click="semester = true">
            <input v-model="form.semester" disabled="disabled" type="text" placeholder="第一学期" />
          </div>
        </div>
        <div class="filter-btns">
          <div class="filter-btn" style="background: #f7a426;" @click="reset">重置</div>
          <div class="filter-btn" style="background: #1496ef;" @click="getData">确认</div>
        </div>
      </div>
    </van-popup>
    <div class="my-tab" v-show="!isSearch">
      <div class="my-tab-cap my-tab-row">
        <div class="my-tab-col">学号</div>
        <div class="my-tab-col">姓名</div>
        <div class="my-tab-col" @click="ocClick">期中考试</div>
        <div class="my-tab-col" @click="onClick">期末考试</div>
      </div>
      <!-- <div class="my-tab-row" v-for="(item, i) in list" :key="'m' + i" @click="$router.push({name: '成绩详情', params: {id: item.name}})"> -->
      <div class="my-tab-row" v-for="(item, i) in list" :key="'m' + i">
        <div class="my-tab-col" style="background-color: #fffefa;">{{item.studenid}}</div>
        <div class="my-tab-col" style="background-color: #fbffff;">{{item.studentname}}</div>
        <div class="my-tab-col" style="background-color: #f9fffc;">{{item.midterm}}</div>
        <div class="my-tab-col" style="background-color: #fff9f9;">{{item.endterm}}</div>
      </div>
    </div>
    <!--搜索触发-->
    <!-- <div class="history" v-if="isSearch && value === ''">
      <p>搜索历史</p>
      <div class="history-con">
        <div class="history-item" v-for="(item, i) in historys" :key="item + i">
          {{item}}
        </div>
      </div>
    </div> -->
    <div class="my-tab  search" v-if="isSearch && value !== ''">
      <div class="my-tab-cap my-tab-row" v-show="clist.length !== 0">
        <div class="my-tab-col">学号</div>
        <div class="my-tab-col">姓名</div>
        <div class="my-tab-col" @click="ocClick">期中考试</div>
        <div class="my-tab-col" @click="onClick">期末考试</div>
      </div>
      <div v-if="clist.length !== 0">
        <div class="my-tab-row" v-for="(item, i) in clist" :key="'m' + i" @click="$router.push({name: '成绩详情', params: {id: item.name}})">
          <div class="my-tab-col" style="background-color: #fffefa;">{{item.studenid}}</div>
          <div class="my-tab-col" style="background-color: #fbffff;">{{item.studentname}}</div>
          <div class="my-tab-col" style="background-color: #f9fffc;">{{item.midterm}}</div>
          <div class="my-tab-col" style="background-color: #fff9f9;">{{item.endterm}}</div>
        </div>
      </div>
      <div style="margin: 20px 0;color: #8A8C9A;text-align: center;font-size: 14px;" v-if="value !== '' && this.clist.length === 0">没有查询到相应关键词数据...</div>
      <div style="margin: 20px 0;color: #8A8C9A;text-align: center;font-size: 14px;" v-if="value === '' && this.filterArr.length === 0">请输入查询...</div>
    </div>
    <!-- 学年 -->
    <van-popup v-model="typeShow" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns1" @cancel="typeShow = false" @confirm="onConfirm" />
    </van-popup>
    <!-- 学期 -->
    <van-popup v-model="semester" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="columns2" @cancel="semester = false" @confirm="onSemester" />
    </van-popup>
    <div class="by" v-show="goTop" @click="goTopDivTop">
      <span></span> </div>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import markApi from '../../assets/api/teacher/studentmark.js'
export default {
  data () {
    return {
      semester: false,
      show: false,
      typeShow: false,
      addclass: false, //班级
      examination: false,
      value: '',
      columns1: ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020'],
      columns2: ['第一学期', '第二学期'],
      isSearch: false, // 页面是否处于搜索
      show: false, // 抽屉是否展开
      clist: [],
      getClass: [],
      form: {
        schoolYear: '2018-2019',
        semester: '',
        examType: '期末考试',

        pageSize: 99999999,
        pageNumber: 1
      },
      order: 1,
      classID: '',
      historys: [
        '赖萌萌',
        '赖萌萌',
        '赖萌萌',
        '赖萌萌',
        '赖萌萌',
      ],
      list: [


      ],
      classInfo: {},
      kemu: {},
      goTop: false,
      state: 1,
    }
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
  created () {
    if (sessionStorage.getItem('class')) {
      this.classInfo = JSON.parse(sessionStorage.getItem('class'))
    }

    this.getsubject()
    this.initFilter()

  },
  methods: {
    goTopDivTop () {
      document.querySelector('.pub').scrollTop = 0
    },
    ocClick () {
      this.list.forEach(a => {
        if (a.midterm == undefined) {
          return
        } else {
          this.state++
          if (this.state > 2) {
            this.state = 1
          }
          this.order = this.state
          this.getData();
        }
      })

      this.form.examType = '期中考试'
      // this.getsubject()
    },
    onClick () {
      this.state++
      if (this.state > 2) {
        this.state = 1
      }
      this.order = this.state
      this.getData();
      this.form.examType = '期末考试'
      // this.getsubject()
    },
    //清空
    reset () {
      this.form = []
    },
    initFilter () {
      this.form['schoolYear'] = this.columns1[3]
      this.form['semester'] = this.columns2[0]

    },
    // 获取学科
    getsubject () {
      let par = {
        classId: this.classInfo.classId,
        schoolYear: this.form.schoolYear,

      }
      this.$http.rq({
        data: par,
        url: markApi.subject,
      }).then(res => {
        if (res.code === 200) {
          this.$toast(res.message)
          this.getClass = res.data
          this.kemu = res.data[0]
          this.form['courseId'] = this.kemu.id
          this.getData()
        } else {
          this.$toast(res.message)
        }

      })
    },

    //获取成绩
    getData () {
      let par = {
        order: this.order,
        classId: this.classInfo.classId,
        idOrName: this.value,
        ...this.form
      }
      console.log('asd')
      this.$http.rq({
        url: markApi.subjectscore,
        data: par
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$toast(res.message)
          this.list = res.data
        } else if (res.message == 'courseId：不能为空') {
          this.$toast('学科不能为空')
        }
        else {
          this.$toast(res.message)
          this.list = []
        }

      })
    },
    //班级
    onClass (val, inx) {
      this.kemu = val
      this.addclass = false
      this.form['courseId'] = val.id
      this.getData()
    },
    onConfirm (val, inx) {
      this.form.schoolYear = val
      this.typeShow = false
    },
    onSemester (val, inx) {
      this.form.semester = val
      this.semester = false
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
      // document.querySelector('.search').style.height = (document.body.clientHeight - document.querySelector('.search').offsetTop) + 'px'

    },
    hideSearch () {
    },
    handleSearch (b) {
      if (this.value === '') {
        this.clist = []
        return
      }
      this.clist = []
      this.list.forEach(a => {
        let f = false
        if (a.studentname.indexOf(this.value) !== -1) {
          f = true
        }
        if (a.studenid.indexOf(this.value) !== -1) {
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
  overflow: auto;
  background-color: #f0f0f0;
  .swtClass {
    position: absolute;
    right: 12px;
    margin-top: -2px;
    font-size: 15px;
    font-weight: bold;
    color: #434964;
    display: flex;
    align-items: center;
    & > span {
      height: 15px;
      line-height: 20px;
    }
    & > i {
      display: inline-block;
      width: 9px;
      height: 6px;
      background: url(../../assets/images/second/xl.png) no-repeat;
      background-size: 100% 100%;
      margin-left: 5px;
      margin-top: 4px;
    }
    .slectI {
      display: inline-block;
      width: 9px;
      height: 6px;
      background: url(../../assets/images/second/sl.png) no-repeat;
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