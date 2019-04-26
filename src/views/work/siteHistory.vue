<template>
  <div class="pub">
    <van-nav-bar title="场地预约历史" left-arrow @click-left="$router.go(-1)" fixed />
    <div style="height: 44px;"></div>
    <div class="wrap">
      <div id="" v-for="(item, i) in list" :key="i">
        <van-cell-group style="margin: 5px 0;" :border="false">
          <van-cell title-class="cell-title" label-class="cell-label">
            <div slot="title" class="custTitle">
              <div class="top">
                <span>{{item.placeName}}</span>
                <p>可容纳人数：<span>{{item.containPerson}}</span>人</p>
              </div>
              <div class="center">
                <span>使用日期：{{item.useTime}}</span>
              </div>
              <div class="center">
                <span>使用时间：{{item.startTime}}--{{item.finishTime}}</span>
              </div>
              <div class="bottom">
                <span>活动描述：{{item.describe}}</span>
              </div>
            </div>
            <div slot="right-icon" :class="item.reservationStatus=='已结束'?'goMarkon':'goMark'">
              <template v-if="item.reservationStatus=='已预约'">
                <span @click="cancel(item.id)">{{item.reservationStatus}}</span>
              </template>
              <template v-else>
                <span>{{item.reservationStatus}}</span>
              </template>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import carsite from '../../assets/api/teacher/site.js'
import { Dialog } from 'vant';
export default {
  data () {
    return {
      value: '',
      list: [], //预约列表
    }
  },
  created () {
    this.getData();
  },
  methods: {
    //取消预约
    cancel (id) {
      Dialog.confirm({
        title: '标题',
        message: '是否取消预约'
      }).then(() => {

        let par = {
          reservationId: id,
        }
        this.$http.rq({
          url: carsite.sitepreset,
          data: par,

        }).then(res => {

          if (res.code === 200) {
            this.getData()
          } else { }

        })
      }).catch(() => {

      });

    },
    getData () {

      this.$http.rq({
        url: carsite.sitelist,
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.list = []
        }

      })
    },
    onSort () {

    },
  }
}
</script>

<style lang="less" scoped>
.pub {
  height: 100%;
  background-color: #f0f0f0;
  .wrap {
    background-color: #f0f0f0;
    .van-cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .goMark {
      width: 70px;
      height: 35px;
      background-color: #1496ef;
      box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > span {
        font-size: 12px;
        letter-spacing: 2px;
        color: #ffffff;
      }
    }
    .goMarkon {
      width: 70px;
      height: 35px;
      background-color: #d4d4d4;
      box-shadow: 0px 0px 8px 1px rgba(109, 109, 109, 0.11);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > span {
        font-size: 12px;
        letter-spacing: 2px;
        color: #ffffff;
      }
    }
    .end {
      background-color: #d4d4d4;
    }
    .custTitle {
      .top {
        display: flex;
        p {
          font-size: 12px;
          letter-spacing: 1px;
          color: #b2b4bf;
          padding-left: 10px;
        }
      }
      .center,
      .bottom {
        display: flex;
        span {
          font-size: 12px;
          letter-spacing: 1px;
          color: #b2b4bf;
        }
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

.cell-title span {
  font-size: 15px;
  letter-spacing: 2px;
  color: #434964;
}

.cell-lable {
  font-size: 12px;
  letter-spacing: 1px;
  color: #b2b4bf;
}
</style>