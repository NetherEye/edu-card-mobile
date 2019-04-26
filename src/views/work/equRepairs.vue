<template>
  <div class="pub">
    <van-nav-bar title="设备报修" left-arrow @click-left="$router.go(-1)" @click-right="$router.push({name: '设备报修历史'})" fixed>
      <div class="sort" slot="right">
        <span>历史</span>
      </div>
    </van-nav-bar>
    <div style="height: 44px;"></div>
    <div class="wrap use-car-style">
      <van-cell-group style="margin-bottom: 9px;">
        <van-field label="故障设备" :maxlength="20" v-model="form.device" clearable />
        <div class="van-hairline--bottom"></div>
      </van-cell-group>
      <van-cell-group style="margin-bottom: 9px;">
        <van-field label="故障地点" :maxlength="40" v-model="form.faultAddress" clearable />
        <div class="van-hairline--bottom"></div>
      </van-cell-group>
      <van-cell-group style="margin-bottom: 9px;">
        <van-cell>
          <template slot="title">
            <div class="p-value" @click="typeShow = true">
              <span class="custom-text">保修类别</span>
              <span class="val">
                <span>{{form.faultType}}</span><i></i>
              </span>
            </div>
          </template>

        </van-cell>
        <van-popup v-model="typeShow" position="bottom" :overlay="true">
          <van-picker show-toolbar :columns="columns1" @cancel="typeShow = false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <van-cell-group style="margin-bottom: 9px;">
        <van-field label="故障描述" :maxlength="50" v-model="form.describe" type="textarea" clearable />
      </van-cell-group>

      <div class="my-cell">
        <span>图片</span>
        <div class="circle-bg" style="border-radius: initial;" v-for="(item, i) in form.fileInfo" :key="'img' + i">
          <img :src="item.url">
        </div>
        <div class="circle-bg" style="border-radius: initial;">
          <input type="file" class="fileInput" @change="readFile">
          <i class="add"></i>
        </div>
      </div>

      <div class="sub-btn" @click="sub">提交</div>

    </div>
  </div>
</template>

<script>
import repairsApi from '../../assets/api/teacher/repairs.js'
import commonApi from '../../assets/api/common.js'
export default {
  data () {
    return {
      typeShow: false,
      columns1: ['物业类', '设备类'],
      form: {
        device: '',
        faultAddress: '',
        faultType: '物业类',
        describe: '',
        fileInfo: []
      }
    }
  },
  methods: {
    sub () {
      let par = {
        device: this.form.device,
        faultAddress: this.form.faultAddress,
        faultType: this.form.faultType,
        describe: this.form.describe,
        fileInfo: JSON.stringify(this.form.fileInfo),
      }

      // 校验
      let attrs = ['device', 'faultAddress', 'describe'],
        errs = ['故障设备不能为空', '故障地点不能为空', '故障描述不能为空'];

      for (let e = 0; e < attrs.length; e++) {
        if (par[attrs[e]] === '') {
          this.$toast(errs[e])
          return
        }
      }
      this.$http.rq({
        method: 'post',
        url: repairsApi.repairs,
        data: par
      }).then(res => {
        this.$toast(res.message)
        if (res.code === 200) {
          this.$router.push({
            name: '设备报修历史'
          })
        }
      })
    },
    onConfirm (val, inx) {
      this.form['faultType'] = val
      this.typeShow = false
    },
    readFile (e) {
      if (e.target.value === '') {
        return
      }
      if(this.form.fileInfo.length >= 5){
      	this.$toast('最多添加5张图片')
      	return
      }
      let par = new FormData();
      par.append('file', e.target.files[0])

      this.$http.rq({
        method: 'post',
        url: commonApi.upload,
        data: par,
        notQs: true
      }).then(res => {
        if (res.code === 200) {
          this.form.fileInfo.push({
            url: res.data.url
          })
        } else {
          this.$toast(res.message)
        }
      })
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
    padding-bottom: 20px;
    .p-value {
      display: flex;
      align-items: center;
      .val > span {
        margin-left: 30px;
        font-size: 15px;
        color: #6a708a;
      }
      .val > i {
        width: 13px;
        height: 7.5px;
        display: inline-block;
        background: url(../../assets/img/xl.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 5px;
      }
    }
    .custItem {
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > span {
        font-size: 15px;
        color: #b2b4bf;
        margin-left: 3px;
      }
    }
    .my-cell {
      height: 90px;
      display: flex;
      align-items: center;
      background-color: #ffffff;

      span {
        width: 70px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #6a708a;
        font-size: 15px;
        margin-right: 16px;
      }

      & > p {
        font-size: 12px;
        color: #6a708a;
        margin-right: 2px;
      }

      .circle-bg {
        width: 46px;
        height: 46px;
        background-color: #f0f0f0;
        border-radius: 23px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-right: 4px;

        .fileInput {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .add {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../../assets/images/second/spr.png) no-repeat;
    background-size: 100% 100%;
  }
  .sub-btn {
    height: 45px;
    font-size: 15px;
    letter-spacing: 2px;
    color: #ffffff;
    margin: 20px 12px;
    margin-bottom: 0;
    background-color: #1496ef;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>