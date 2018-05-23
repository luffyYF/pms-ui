<template>
  <div class="amap-page-container">
    <el-amap-search-box
      class="search-box"
      :on-search-result="onSearchResult">
    </el-amap-search-box>
    <el-amap vid="amapDemo" :center="center" :zoom="12" class="amap-demo" :events="events">
      <el-amap-marker :position="marker"></el-amap-marker>
    </el-amap>
    <div class="toolbar">
      position: [{{ lng }}, {{ lat }}] address: {{ address }}
    </div>
  </div>
</template>
<script>
  export default {
    props: ['value'],
    data: function () {
      let self = this
      let defaultMarker = [121.575412, 31.181786]
      return {
        marker: defaultMarker,
        lng: 0,
        lat: 0,
        adcode: '',
        address: '',
        center: defaultMarker,
        events: {
          click (e) {
            let {lng, lat} = e.lnglat
            self.setAddressLocal(lng, lat, false)
          }
        }
      }
    },
    methods: {
      onSearchResult (pois) {
        if (pois.length > 0) {
          let {lng, lat} = pois[0]
          this.setAddressLocal(lng, lat, true)
        }
      },
      setAddressLocal (lng, lat, isCenter) {
        if (isCenter) {
          this.center = [lng, lat]
        }
        this.lng = lng
        this.lat = lat
        this.marker = [lng, lat]
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(this.marker, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              if (result.regeocode.addressComponent) {
                this.adcode = result.regeocode.addressComponent.adcode
              }
              this.address = result.regeocode.formattedAddress
              this.$nextTick()
            }
          }
        })
      },
      getAddressLocal () {
        return {
          lng: this.lng,
          lat: this.lat,
          adcode: this.adcode,
          address: this.address
        }
      }
    },
    watch: {
      value: function () {
        if (this.value && this.value.lng && this.value.lat) {
          let {lng, lat} = this.value
          this.setAddressLocal(lng, lat, true)
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
  .amap-page-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .amap-demo {
    height: 400px;
  }

  .search-box {
    position: absolute;
    top: 20px;
    left: 20px;
  }
</style>
