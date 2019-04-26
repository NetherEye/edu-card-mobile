<template>
  <div class="pub">
    <van-nav-bar title="修改密码" left-arrow fixed @click-left="$router.push({name: '教师我的'})">
    </van-nav-bar>
    <div class="wrap"></div>
    <van-cell-group style="margin-bottom: 0px; margin-top:26px">
      <van-field label="原密码" :maxlength="20" type="password" placeholder="请输入原密码" v-model="form.oldPassword" clearable />
    </van-cell-group>
    <van-cell-group>
      <van-field label="新密码" :maxlength="20" type="password" placeholder="请输入新密码" v-model="form.newPassword" clearable />
    </van-cell-group>
    <van-cell-group>
      <van-field label="确认密码" :maxlength="30" type="password" placeholder="请确认密码" v-model="form.againNewPassword" clearable />
    </van-cell-group>
    <div class="sub-btn" @click="sub">确认</div>
  </div>
</template>
<script>
import commonApi from '../assets/api/common.js'
export default {
  data () {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        againNewPassword: '',
      }
    }
  },
  methods: {
    sub () {
      let par = {
        oldPassword: this.form.oldPassword,
        newPassword: this.form.newPassword,
        againNewPassword: this.form.againNewPassword,
      }
      this.$http.rq({
        method: 'post',
        url: commonApi.accountreset,
        data: par
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$toast(res.message)
          sessionStorage.clear()
          window.location.href = '/proxy/logout'
          // this.$router.push({
          //   name: '教师我的'
          // })
        } else {
          this.$toast(res.message)
        }
      })
    }
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
