<template>
  <div>
    <h1>Box Front</h1>
    <!-- Attitude -->
    <p>Roll: {{ mockAttitudeData.roll }}</p>
    <p>Pitch: {{ mockAttitudeData.pitch }}</p>
    <!-- GPS -->
    <p>GPS Time: {{ mockGPSData.gpsTime }}</p>
    <p>GPS Status: {{ mockGPSData.gpsStatus }}</p>
    <p>Longitude: {{ mockGPSData.longitude }}</p>
    <p>Latitude: {{ mockGPSData.latitude }}</p>
    <p>Heading: {{ mockGPSData.heading }}</p>
    <p>Height: {{ mockGPSData.height }} {{ mockGPSData.heightUnit }}</p>
    <p>Longitude Direction: {{ mockGPSData.lonDirection }}</p>
    <p>Latitude Direction: {{ mockGPSData.latDirection }}</p>
    <p>Speed: {{ mockGPSData.speed }} m/s</p>
  </div>
</template>

<script setup lang="ts">
import { Socket } from 'socket.io-client';
import { inject } from 'vue';
import { AttitudeData, GPSData } from '../types/ws-types';

//! todo 封装成hooks
// const socket = inject('socket') as Socket;
// socket.on('GPS', (data) => {
//   console.log(data)
// });
// socket.on('Attitude', (data) => {
//   console.log(data)
// });

//! mock
const mockGPSData: GPSData = {
  gpsTime: "2022-05-20 14:30:59",
  gpsStatus: "valid",
  longitude: "120.123456",
  latitude: "30.654321",
  heading: "180.00",
  height: "100.00",
  heightUnit: "M",
  lonDirection: "E",
  latDirection: "N",
  speed: "80.00",
};
const mockAttitudeData: AttitudeData = {
  roll: 10.5,
  pitch: -3.7,
}

</script>

<style scoped>
</style>
