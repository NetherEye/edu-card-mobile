<template>
  <div class="pub">
    <van-nav-bar title="黑板报" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 46px;background: #f0f0f0;"></div>

    <div class="wrap">
      <van-swipe :autoplay="3000" :height="150">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="banner-img" :src="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="my-tab">
        <div class="zcTitle">
          <img src="../../assets/img/ht_class.png" style="width: 18.5px;height: 17.5px;" />
          <span>课表</span>
          <div class="zcTitle-right"><i></i></div>
        </div>
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
      <div style="height: 10px;background: #f0f0f0;"></div>
      <div class="my-tab">
        <div class="zcTitle">
          <img src="../../assets/img/dasaozhong.png" style="width: 14px;height: 16px;" />
          <span>值日表</span>
          <div class="zcTitle-right"><i></i></div>
        </div>
        <div class="my-tab-cap my-tab-row">
          <div class="my-tab-col">周一</div>
          <div class="my-tab-col">周二</div>
          <div class="my-tab-col">周三</div>
          <div class="my-tab-col">周四</div>
          <div class="my-tab-col">周五</div>
          <!-- <div class="my-tab-col">周六</div>
					<div class="my-tab-col">周日</div> -->
        </div>
        <div class="my-tab-row" v-for="(item, i) in Onduty" :key="'m' + i">
          <template v-if="item.stc">
            <div class="lat"><i></i><span>午休</span></div>
          </template>
          <template v-else>
            <div class="my-tab-col">{{item.one}}</div>
            <div class="my-tab-col">{{item.two}}</div>
            <div class="my-tab-col">{{item.three}}</div>
            <div class="my-tab-col">{{item.four}}</div>
            <div class="my-tab-col">{{item.five}}</div>
          </template>
        </div>
        <div style="height: 10px;background: #f0f0f0;"></div>
      </div>
    </div>

  </div>
</template>

<script>
import patriApi from '../../assets/api/parents/patri.js'
export default {
  data () {
    return {
      images: [
        require("../../assets/img/banner.png"),
        require("../../assets/img/banner.png")
      ],
      Onduty: [], //值日
      list: [

      ]
    }
  },
  components: {

  },
  created () {
    this.getData();
    this.getDuty();
  },
  methods: {
    //课表
    getData () {
      this.$http.rq({
        url: patriApi.classSchedule,
      }).then(res => {
        if (res.code === 200) {
          res.data.forEach(a => {
            if (a.type === 'tf') {
              a.stc = true
            }
          })
          this.list = res.data
          console.log(res)
        } else {
          this.$toast(res.message);
        }

      })
    },
    //			值班日
    getDuty () {
      this.$http.rq({
        url: patriApi.classdutyRoster,
      }).then(res => {
        if (res.code === 200) {
          let one = ''
          let obj = {}
          let arr = ['one', 'two', 'three', 'four', 'five']
          res.data.forEach((a, i) => {
            arr.forEach((b, idx) => {
              let cr = a[b].split(';')
              let name = ''
              cr.forEach(c => {

                name += c.split(',')[1] + ' '
              })
              obj[b] = name
            })
          })

          this.Onduty.push(obj)
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
  position: relative;
  .wrap {
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    .zcTitle {
      height: 45.5px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      & > img {
        display: block;
        margin-left: 13px;
      }
      & > span {
        font-size: 15px;
        letter-spacing: 2px;
        color: #434964;
        margin-left: 5px;
        margin-top: 2px;
      }
      .zcTitle-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 11px;
      }
      .zcTitle-right > i {
        display: inline-block;
        width: 16px;
        height: 8.5px;
        background: url(../../assets/img/xl.png) no-repeat;
        background-size: 100% 100%;
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
}
</style>