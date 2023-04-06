import { createApp } from "vue";
import App from "./App.vue";
import { VueAmap } from "@vuemap/vue-amap";

const app = createApp(App);

// 注册 VueAmap 组件
app.use(VueAmap, {
  // 替换成您自己的高德地图API Key
  key: "your_amap_key",
  // 引入的插件列表
  plugin: [
    "AMap.Geolocation",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
  ],
  // 高德地图 Web API 版本号
  v: "1.4.15",
});

app.mount("#app");
