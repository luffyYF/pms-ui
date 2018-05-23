<template>
  <div class="amap-page-container">
    <el-amap-search-box
      class="search-box"
      :on-search-result="onSearchResult">
    </el-amap-search-box>
    <el-amap vid="amapDemo" :center="center" :zoom="12" class="amap-demo" :events="events">
      <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
    </el-amap>
    <div class="toolbar">
      position: [{{ lng }}, {{ lat }}] address: {{ address }}
    </div>
  </div>
</template>
<script>
  //  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  export default {
    data: function () {
      let self = this
      return {
        markers: [
          [121.59996, 31.197646],
          [121.40018, 31.197622],
          [121.69991, 31.207649]
        ],
        address: '',
        center: [121.59996, 31.197646],
        events: {
          click (e) {
            let {lng, lat} = e.lnglat
            self.lng = lng
            self.lat = lat
            // 这里通过高德 SDK 完成。
            let geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: 'all'
            })
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress
                  self.$nextTick()
                }
              }
            })
          }
        },
        lng: 0,
        lat: 0
      }
    },
    methods: {
      addMarker: function () {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
        this.markers.push([lng, lat])
      },
      onSearchResult (pois) {
        let latSum = 0
        let lngSum = 0
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi
            lngSum += lng
            latSum += lat
            this.markers.push([poi.lng, poi.lat])
          })
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          }
          this.center = [center.lng, center.lat]
        }
      }
    }
  }
</script>

<style scoped>
  .amap-page-container {
    width: 800px;
    height: 600px;
  }

  .amap-wrapper {
    width: 100%;
    height: 800px;
  }

  .amap-box {
    width: 500px;
    height: 500px;
  }

  .amap-demo {
    height: 300px;
  }

  .search-box {
    position: absolute;
    top: 25px;
    left: 20px;
  }

  .amap-page-container {
    position: relative;
  }
</style>
