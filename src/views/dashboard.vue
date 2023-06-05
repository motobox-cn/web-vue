<template>
  <div>
    <h1>Box Front</h1>
    <!-- Attitude -->
    <p>Roll: {{ mockAttitudeData.roll }}</p>
    <p>Pitch: {{ mockAttitudeData.pitch }}</p>
    <!-- GPS -->
    <p>GPS Time: {{ mockGPSData.gps_time }}</p>
    <p>GPS Status: {{ mockGPSData.status }}</p>
    <p>Longitude: {{ mockGPSData.longitude }}</p>
    <p>Latitude: {{ mockGPSData.latitude }}</p>
    <p>Heading: {{ mockGPSData.heading }}</p>
    <p>Height: {{ mockGPSData.hight }} {{ mockGPSData.high_tube }}</p>
    <p>Longitude Direction: {{ mockGPSData.lon_direction }}</p>
    <p>Latitude Direction: {{ mockGPSData.lat_direction }}</p>
    <p>Speed: {{ mockGPSData.speed }} m/s</p>
    <br />
    <speedGauge class="h-[300px]" :speed="mockGPSData.speed" />
    <br />
    <button @click="start">start</button>
    <button @click="pause">pause</button>
    <button @click="stop">stop</button>
  </div>
</template>

<script setup lang="ts">
import speedGauge from '../components/gauge/speed-gauge.vue'
import { AttitudeData, GPSData } from "../types/ws-types";
import { useMockData } from "../mock";
import { IGPSData } from '../types/data'
import { ref, watch } from "vue";

const mockGPSData = ref<IGPSData>({ "gps_time": 0, "status": "", "heading": 0, "hight": 24, "high_tube": "M", "lon_direction": "E", "lat_direction": "N", "longitude": 120.66384500000001, "latitude": 31.195198166666668, "is_gps_normal": true, "speed": 0 })

const { start, stop, pause, data } = useMockData()
watch(() => data.value, (val) => {
  mockGPSData.value = val!
})

// //! todo 封装成hooks
// import useSocket from "../composables/useSocket";
// import { ref } from "vue";
// const { onGPSData, onAttitudeData } = useSocket();
// onGPSData((data) => {
//   console.log(data);
// });
// onAttitudeData((data) => {
//   console.log(data);
// });
//! mock

const mockAttitudeData: AttitudeData = {
  roll: 10.5,
  pitch: -3.7,
};
</script>

<style scoped>
</style>
