<template>
  <div class="pub">

    <div class="header">
      <span>安全</span>
    </div>

    <div class="wrap">
      <div class="amap-page-container">
        <div id="map"></div>
        <div class="child-info" v-if="childName !== ''">
          <div class="info-left">
            <div class="info-tou">
              <!--<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3885982663,1344516489&fm=27&gp=0.jpg" />-->
            </div>
            <span>{{childName}}</span>
          </div>
          <div class="info-right van-hairline--left">
            <p><span>
                <!-- 围栏1 --></span><span>{{time}}</span></p>
            <p>
              {{address}}
            </p>
          </div>
        </div>

        <div class="dl" v-show="kwh !== ''">
          <i><em class="kwh"></em></i>
        </div>

        <div class="zoom">
          <div @click="handleZoom('add')"></div>
          <div @click="handleZoom('sub')"></div>
        </div>

        <div class="posi" @click="getData">
          <i></i>
        </div>

        <div class="list">
          <div class="gps van-hairline--bottom" @click="gps">
            <i></i>
            <span>导航</span>
          </div>
          <div class="family van-hairline--bottom" @click="$router.push({name: '亲情号'})">
            <i></i>
            <span>亲情号</span>
          </div>
          <div class="weilan van-hairline--bottom" @click="$router.push({name: '围栏'})">
            <i></i>
            <span>围栏</span>
          </div>
          <div class="overflow van-hairline--bottom">
            <i></i>
            <span>超范围</span>
          </div>
          <div class="listento van-hairline--bottom" @click="listening">
            <i></i>
            <span>启动监听</span>
          </div>
          <div class="callout" @click="callout">
            <i></i>
            <span>反向呼叫</span>
          </div>
        </div>

        <div class="swt" @click="changeMapType">

        </div>

      </div>

    </div>

    <div style="height: 48px;"></div>
    <my-tabbar :active="active">
    </my-tabbar>

  </div>
</template>

<script>
import myTabbar from '@/components/myTabbarParents'
import secureApi from '../../assets/api/parents/secure.js'
import weilanApi from '../../assets/api/parents/weilan.js'

import loadMap from '../../assets/tools/loadMap.js'


export default {
  data () {
    return {
      active: 2,
      map: null,
      satellite: null, // 卫星图 保存状态方便添加移除
      kwh: '', // 电量
      childName: '',
      mks: [],
      time: '',
      address: '',
      childData: [],
      loadMapLoading: null, // 地图加载loading
    }
  },
  created () {

  },
  mounted () {
    this.loadMapLoading = this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '地图加载中'
    })
    loadMap().then(AMap => {
      this.satellite = new AMap.TileLayer.Satellite()
      this.initMap()
    }, e => {
      this.loadMapLoading.clear()
      this.loadMapLoading = null
      alert('地图加载失败')
    })

  },
  methods: {
    initMap () {
      this.map = new AMap.Map('map', {
        zoom: 11, //级别
        center: [106.63, 26.65], //中心点坐标
      });
      this.map.on('complete', () => {
        // 地图图块加载完成后触发
        this.loadMapLoading.clear()
        this.loadMapLoading = null

        this.getData()
        this.showWeilan()
      });

    },
    getData () {
      this.$http.rq({
        url: secureApi.location
      }).then(res => {
        if (res.code === 200) {
          this.childData = res.data
          this.map.setCenter([
            res.data[0].longitude, res.data[0].latitude
          ]);
          res.data.forEach(a => {
            let dom = '' +
              '<div class="dw-con">' +
              '<div class="dw">' +
              '<img src=' + require("../../assets/img/tou.png") + '>' +
              '</div>' +
              '<div class="dw-cir"></div>' +
              '</div>'
            var marker1 = new AMap.Marker({
              content: dom,
              position: new AMap.LngLat(a.longitude, a.latitude), // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
              title: a.studentName,
              offset: new AMap.Pixel(-16, -42),
              clickable: true
            });
            let item = a;
            marker1.on('click', () => {
              AMap.plugin('AMap.Geocoder', () => {
                var geocoder = new AMap.Geocoder();
                geocoder.getAddress([item.longitude, item.latitude], (status, result) => {
                  if (status === 'complete') {
                    this.address = result.regeocode.formattedAddress

                  } else {
                    alert(JSON.stringify(result))
                  }
                });
              });

              this.kwh = item.power
              this.childName = item.studentName
              this.time = item.time
            })
            this.mks.push(marker1)
            this.map.add(marker1);
          })


        } else {

        }
      })
    },
    changeMapType () {
      let f = false
      this.map.getLayers().forEach(a => { // 如果存在卫星图，则操作为移除卫星图图层
        if (a.CLASS_NAME === 'AMap.TileLayer.Satellite') {
          f = true
          return
        }
      })
      f ? this.map.remove(this.satellite) : this.map.add(this.satellite)

    },
    handleZoom (type) {
      let zoom = this.map.getZoom();

      type == 'add' ? zoom++ : zoom--;

      if (zoom >= 20 || zoom <= 2) {
        this.$toast('到极限了')
        return
      }

      this.map.setZoom(zoom);

    },
    listening () {
      this.$http.rq({
        url: weilanApi.listen
      }).then(res => {
        console.log(res)
        if (res.code === 200) {

        } else {
          this.$toast(res.message)
        }
      })
    },
    callout () {
      this.$http.rq({
        url: weilanApi.call
      }).then(res => {
        console.log(res)
        if (res.code === 200) {

        } else {
          this.$toast(res.message)
        }
      })
    },
    gps () {
      if (this.mks.length === 0) {
        this.$toast('没有孩子位置信息')
        return
      }

      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在通过浏览器定位获取您当前位置...'
      });
      AMap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s

        });
        geolocation.getCurrentPosition((status, result) => {
          toast.clear()
          if (status == 'complete') {

            this.navigation(result)
          } else {
            this.$toast('定位失败！无法进行导航')
          }
        });
      });
    },
    navigation (result) {
      AMap.plugin('AMap.Driving', () => {
        //构造路线导航类
        var driving = new AMap.Driving({
          map: this.map,
          // panel: "panel"
        });
        // 根据起终点经纬度规划驾车导航路线
        driving.search(result.position, this.mks[0].getPosition(), (status,
          result) => {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            this.$toast('绘制驾车路线完成')
          } else {
            this.$toast('获取驾车数据失败：' + result)
          }
        });
      });


    },
    showWeilan () {
      this.$http.rq({
        url: weilanApi.showWeilan
      }).then(res => {
        if (res.code === 200) {
          let marks = []
          let path = []
          res.data.forEach(b => {
            b.fenceXYZs.forEach(a => {
              marks.push(
                new AMap.Marker({
                  position: new AMap.LngLat(a.longitude, a.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                  title: '点'
                })
              )
              path.push(
                new AMap.LngLat(a.longitude, a.latitude)
              )
            })

            var polygon = new AMap.Polygon({
              path: path,
              fillColor: '#fff', // 多边形填充颜色
              borderWeight: 2, // 线条宽度，默认为 1
              strokeColor: 'red', // 线条颜色
            });

            this.map.add(marks)
            this.map.add(polygon)
          })
        } else {

        }
      })
    }
  },
  watch: {
    kwh (newValue) {
      document.querySelector('.kwh').style.width = (17 * (Number(newValue.replace(/\%/g, '')) / 100)) + 'px'
    }
  },
  components: {
    'my-tabbar': myTabbar
  },
  computed: {

  }

}
</script>

<style lang="less" scoped>
.pub {
  height: 100%;
  background: #f0f0f0;
  position: relative;

  .header {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    span {
      font-size: 18px;
      letter-spacing: 2px;
      color: #434964;
      font-weight: bold;
    }
  }

  .wrap {
    position: absolute;
    top: 44px;
    bottom: 48px;
    left: 0;
    right: 0;
    overflow: auto;

    .amap-page-container {
      width: 100%;
      height: 100%;
      position: relative;

      #map {
        height: 100%;
        width: 100%;
      }

      .dl {
        width: 40px;
        height: 40px;
        background-color: #ffffff;
        box-shadow: 0px 0px 20px 0px rgba(109, 109, 109, 0.36);
        border-radius: 20px;
        position: absolute;
        left: 12.5px;
        top: 98px;
        display: flex;
        align-items: center;
        justify-content: center;

        & > i {
          display: block;
          width: 22px;
          height: 12px;
          background: url(../../assets/img/80dianliang.png) no-repeat;
          background-size: 100% 100%;
          display: flex;
          position: relative;

          & > em {
            display: block;
            width: 17px;
            height: 8px;
            background-color: #08b065;
            position: absolute;
            top: 2px;
            left: 2px;
          }
        }
      }

      .child-info {
        width: 351px;
        height: 75px;
        background-color: #ffffff;
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
        // padding: 12px 0;
        align-items: center;
        border-radius: 6px;
        position: absolute;
        top: 10px;
        left: 12px;
        display: flex;
        justify-content: space-between;

        .info-left {
          display: flex;
          flex-direction: column;

          .info-tou {
            width: 37px;
            height: 37px;
            border-radius: 50%;
            margin-left: 7px;

            & > img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          span {
            font-size: 12px;
            letter-spacing: 2px;
            color: #6a708a;
            margin-left: 7px;
            margin-top: 2px;
          }
        }

        .info-right {
          width: 295px;

          p:nth-child(1) {
            height: 13px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span:nth-child(1) {
              font-size: 13px;
              letter-spacing: 3px;
              color: #434964;
              font-weight: bold;
              margin-left: 13px;
            }

            span:nth-child(2) {
              font-size: 13px;
              letter-spacing: 3px;
              color: #434964;
              font-size: 9px;
              letter-spacing: 2px;
              color: #b2b4bf;
              margin: 8px;
            }
          }

          p:nth-child(2) {
            font-size: 12px;
            letter-spacing: 2px;
            color: #6a708a;
            margin-left: 13px;
            margin-top: 8px;
          }
        }
      }

      .zoom {
        display: flex;
        flex-direction: column;
        width: 35.5px;
        height: 66.5px;
        background-color: #ffffff;
        box-shadow: 0px 0px 20px 0px rgba(109, 109, 109, 0.36);
        border-radius: 5px;
        position: absolute;
        left: 12px;
        bottom: 25px;

        & > div {
          flex: 1;
        }

        div:nth-child(1) {
          background: url(../../assets/img/jia.png) no-repeat center center;
          background-size: 15px 15px;
        }

        div:nth-child(2) {
          background: url(../../assets/img/jian.png) no-repeat center center;
          background-size: 15px 2px;
        }
      }

      .posi {
        width: 40px;
        height: 40px;
        background-color: #ffffff;
        box-shadow: 0px 0px 20px 0px rgba(109, 109, 109, 0.36);
        border-radius: 5px;
        position: absolute;
        bottom: 25px;
        right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > i {
          display: inline-block;
          width: 21px;
          height: 21px;
          background: url(../../assets/img/target-lock.png) no-repeat;
          background-size: 100% 100%;
        }
      }

      .swt {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background: url(../../assets/img/qh.png) no-repeat center center;
        background-size: 60px 60px;
        position: absolute;
        top: 25px;
        right: 12px;
      }

      .list {
        width: 50px;
        // height: 197.5px;
        height: 296.25px;
        background-color: #ffffff;
        box-shadow: 0px 0px 20px 0px rgba(109, 109, 109, 0.36);
        border-radius: 5px;
        position: absolute;
        top: 122px;
        right: 12px;
        display: flex;
        flex-direction: column;

        & > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          span {
            font-size: 10px;
            color: #6a708a;
            margin-top: 5px;
          }

          i {
            display: block;
          }
        }

        .gps {
          i {
            width: 12.5px;
            height: 13px;
            background: url(../../assets/img/dhss.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .family {
          i {
            width: 12.5px;
            height: 13px;
            background: url(../../assets/img/dh.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .weilan {
          i {
            width: 18px;
            height: 14px;
            background: url(../../assets/img/Z.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .overflow {
          i {
            width: 16.5px;
            height: 14.5px;
            background: url(../../assets/img/fw.png) no-repeat;
            background-size: 100% 100%;
          }
        }

        .listento {
          i {
            width: 16.5px;
            height: 14.5px;
            background: url(../../assets/img/qdjt.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .callout {
          i {
            width: 16.5px;
            height: 14.5px;
            background: url(../../assets/img/fxhj.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.van-tabbar-item {
  color: #8a8c9a;
}

.van-tabbar-item--active {
  color: #0284dc;
}

.amap-logo,
.amap-copyright {
  opacity: 0;
}

.dw-con {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 32px;
  height: 42px;
  position: relative;

  .dw {
    width: 32px;
    height: 40px;
    background: url(../../assets/img/icon/dw.png) no-repeat;
    background-size: 100% 100%;
    display: flex;

    justify-content: center;

    & > img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }

  .dw-cir {
    width: 8px;
    height: 4px;
    background: url(../../assets/img/icon/dw-cir.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 12px;
  }
}
</style>
