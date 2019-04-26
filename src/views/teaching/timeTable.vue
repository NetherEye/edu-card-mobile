<template>
  <div class="pub">
    <van-nav-bar title="班级课表" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 44px;background: #f0f0f0;"></div>
    <div class="my-tab">
      <div class="my-tab-cap my-tab-row">
        <div class="my-tab-col">周一</div>
        <div class="my-tab-col">周二</div>
        <div class="my-tab-col">周三</div>
        <div class="my-tab-col">周四</div>
        <div class="my-tab-col">周五</div>
        <div class="my-tab-col">周六</div>
        <div class="my-tab-col">周日</div>
      </div>
      <div class="my-tab-row" v-for="(item, i) in list" :key="'m' + i">
        <template v-if="item.stc">
          <div class="lat"><i></i><span>{{item.five}}</span></div>
        </template>
        <template v-else>
          <div class="my-tab-col">{{item.one}}</div>
          <div class="my-tab-col">{{item.two}}</div>
          <div class="my-tab-col">{{item.three}}</div>
          <div class="my-tab-col">{{item.four}}</div>
          <div class="my-tab-col">{{item.five}}</div>
          <div class="my-tab-col">{{item.six}}</div>
          <div class="my-tab-col">{{item.seven}}</div>
        </template>
      </div>

    </div>

  </div>
</template>

<script>
import markApi from '../../assets/api/teacher/studentmark.js'
export default {
  data () {
    return {
      list: [

      ]
    }
  },
  components: {

  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      var classId = JSON.parse(sessionStorage.getItem('class')).classId
      var gradeId = JSON.parse(sessionStorage.getItem('class')).gradeId
      let par = {
        gradeId: gradeId,
        classId: classId,
      }
      this.$http.rq({
        data: par,
        url: markApi.classSchedule,
      }).then(res => {
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.$toast('暂无数据');
          } else {
            res.data.forEach(a => {
              if (a.type === 'tf') {
                a.stc = true
              }
            })
            this.list = res.data
          }

        } else {
          this.$toast(res.message);
        }

      })
    },
  },
  computed: {

  }

}
</script>

<style lang="less" scoped>
.pub {
  background: #f0f0f0;
  height: auto;
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
</style>