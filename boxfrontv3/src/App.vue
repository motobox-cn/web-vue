<template>
  <div>
    <h1>Box Front</h1>
    <!-- 保留2位小数 -->
    <p>Roll: {{ roll }}</p>
    <p>Pitch: {{ pitch }}</p>
    <p>GPS Time: {{ gpsTime }}</p>
    <p>GPS Status: {{ gpsStatus }}</p>
    <p>Longitude: {{ longitude }}</p>
    <p>Latitude: {{ latitude }}</p>
    <p>Heading: {{ heading }}</p>
    <p>Height: {{ height }} {{ heightUnit }}</p>
    <p>Longitude Direction: {{ lonDirection }}</p>
    <p>Latitude Direction: {{ latDirection }}</p>
    <p>Speed: {{ speed }} m/s</p>
  </div>
</template>
  
<script>
export default {
  mounted() {
    // get server ip 
    const ip = window.location.hostname;
    // connect to websocket
    const socket = new WebSocket("ws://"+ip+":3000/ws/gyro");
    const gpssocket = new WebSocket("ws://"+ip+":3000/ws/gps");
    socket.onmessage = (event) => {
      // turn string into object
      const data = JSON.parse(event.data);
      console.log(data);
      // set data to template
      this.roll = Math.round(data.roll * 100) / 100;
      this.pitch = Math.round(data.pitch * 100) / 100;
    };
    gpssocket.onmessage = (event) => {
      // turn string into object
      const data = JSON.parse(event.data);
      console.log(data);
      // set data to template
      this.gpsTime = data.GpsTime;
      this.gpsStatus = data.Status;
      this.longitude = data.Longitude;
      this.latitude = data.Latitude;
      this.heading = data.Heading;
      this.height = data.Hight;
      this.heightUnit = data.Hightude;
      this.lonDirection = data.LonDirection;
      this.latDirection = data.LatDirection;
      this.speed = data.Speed;
    };
  },
  // show event data in template
  data() {
    return {
      roll: null,
      pitch: null,
      gpsTime: null,
      gpsStatus: null,
      longitude: null,
      latitude: null,
      heading: null,
      height: null,
      heightUnit: null,
      lonDirection: null,
      latDirection: null,
      speed: null,
    };
  },
};
</script>
