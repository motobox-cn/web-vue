<template>
  <div class="container">
    <div class="compass">
      <amap-compass
        :rotate-degree="compassDegree"
      >
      </amap-compass>
    </div>
    <div class="map">
      thisisamap
      <amap
        :center="center"
        :visible="true"
        :zoom="zoom"
        :events="amapEvents"
      >
        <amap-geolocation
          :accuracy="true"
          :button-position="'RB'"
          :extensions="'all'"
          :show-circle="false"
          :show-button="true"
          :watch="true"
          :events="geolocationEvents"
        >
        </amap-geolocation>
      </amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compassDegree: 0,
      center: [116.397428, 39.90923],
      zoom: 13,
    };
  },
  mounted() {
    // 获取陀螺仪数据
    window.addEventListener('deviceorientation', (event) => {
      this.compassDegree = event.alpha;
    }, true);
  },
  methods: {
    onLocationChange(location) {
      this.center = [location.longitude, location.latitude];
    },
  },
  computed: {
    amapEvents() {
      return {
        click: (e) => {
          console.log(e);
        },
      };
    },
    geolocationEvents() {
      return {
        complete: this.onLocationChange
      }
    }
  },
};
</script>
