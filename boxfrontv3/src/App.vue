<template>
  <div>
    <h1>Box Front</h1>
    <!-- 保留2位小数 -->
    <p>roll: {{ roll }}</p>
    <p>pitch: {{ pitch }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const socket = new WebSocket("ws://192.168.1.21:3000/ws");

    socket.onmessage = (event) => {
      // turn string into object
      const data = JSON.parse(event.data);
      console.log(data);
      // set data to template
      this.roll = Math.round(data.roll * 100) / 100;
      this.pitch = Math.round(data.pitch * 100) / 100;
    };
  },
  // show event data in template
  data() {
    return {
      roll: null,
      pitch: null,
    };
  },
};
</script>
