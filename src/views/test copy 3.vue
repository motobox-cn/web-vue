<template>
  <div class="overflow-hidden bg-[#2a2a2a] p-10 text-center text-white">
    gaugeData:
    <div>{{ gaugeData }}</div>
  </div>
  <div id="mapContainer" class="fixed"></div>
</template>

<script setup lang="ts">
import GPS from '../utils/gps'
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, ref, shallowRef, watch } from 'vue';
import { useMockData } from '../mock';
import NavIcon from '../asserts/nav_icon.png'
import { IGPSData } from '../types/data';

// 高德地图对象
let AMap: any;
// 高德地图实例
let AMapInstance: any;
// 高德地图中心点
let AMapCenterMarker: any;




// 初始化地图
type TProps = {
  plugins: string[],
  mapStyle: string,
  initialCenter: [number, number]
}

const initMap = async ({ plugins, mapStyle, initialCenter }: TProps) => {
  //@ts-ignore
  window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_SECURE_KEY// 您申请的安全密钥
  };
  AMap = await AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
    plugins,
  })


  AMapInstance = new AMap.Map('mapContainer', {
    animateEnable: true,
    mapStyle,
    viewMode: '2D',
    zoom: 19, // 初始化地图层级
    center: initialCenter,// 初始化地图中心点
  });

  AMapInstance.setFitView()
  AMapCenterMarker = new AMap.Marker({
    map: AMapInstance,
    position: initialCenter,
    icon: new AMap.Icon({
      size: new AMap.Size(40, 40), // 图标尺寸
      image: NavIcon, // Icon的图像
      imageSize: new AMap.Size(40, 40), // 根据所设置的大小拉伸或压缩图片
      imageOffset: new AMap.Pixel(0, 0), // 图标取图偏移量
    }),
    offset: new AMap.Pixel(-13, -26),// 相对于基点的位置
  });
  // 监听中心点移动
  AMapCenterMarker.on('moving', function (e: any) {
    // 设置地图中心点
    AMapInstance.setCenter(e.target.getPosition())
    // 设置旋转角
    AMapInstance.setRotation(-e.target.getOrientation())
  });

}

// 初始化地图
initMap({
  initialCenter: [120.673057, 31.179554],
  mapStyle: 'amap://styles/dark',
  plugins: ['AMap.GraspRoad', "AMap.Driving", "AMap.MoveAnimation"]
});


const gaugeData = ref()
const onReceiving = ({ longitude, latitude, speed, hight }: IGPSData) => {
  gaugeData.value = {
    speed,
    hight
  }
  if (!AMap) return
  // 转换为高德坐标
  // AMap.convertFrom([longitude, latitude],
  //   'gps',
  //   (status, result) => {
  //     if (result.info === 'ok') {
  //       const { lat, lng } = result.locations[0]
  //       console.log('[[convertFrom]] OK:', [lat, lng]);
  //       // 移动地图中心点
  //       AMapCenterMarker.moveTo([lng, lat], {
  //         duration: 1000,
  //         delay: 500,
  //       });
  //     } else {
  //       console.log('[[convertFrom]] ERR:', result);
  //     }
  //   })
  const { lat, lng } = GPS.gcj_encrypt(latitude, longitude)
  console.log('[[convertFrom]] OK:', [lat, lng]);
  // 移动地图中心点
  AMapCenterMarker.moveTo([lng, lat], {
    duration: 500,
    delay: 250,
  });
}


const { start, data: GPSDataRef } = useMockData(500)
start()
watch(
  () => GPSDataRef.value,
  (val) => onReceiving)


</script>

<style scoped>
#mapContainer {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
