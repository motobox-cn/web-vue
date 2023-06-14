<template>
  <div id="mapContainer" class="fixed"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, ref, shallowRef, watch } from 'vue';
import { useMockData } from '../mock';
import NavIcon from '../asserts/nav_icon.png'
const map = shallowRef<any>(null);
// let AMapObj: any;

// 高德地图对象
let AMap: any;
// 高德地图实例
let AMapInstance: any;
// 高德地图中心点
let AMapCenterMarker: any;
// let graspRoad: any;
// let marker: any;





const initMap = async () => {
  window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_SECURE_KEY// 您申请的安全密钥
  };
  AMap = await AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY,
    version: '2.0',
    plugins: ['AMap.GraspRoad', "AMap.Driving", "AMap.MoveAnimation"],
  })

  AMapInstance = new AMap.Map('mapContainer', {
    animateEnable: true,
    mapStyle: 'amap://styles/dark',
    viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
    zoom: 19, // 初始化地图层级
    center: [120.673057, 31.179554],// 初始化地图中心点
  });

  AMapInstance.setFitView()
  // graspRoad = new AMapObj.GraspRoad()
  AMapCenterMarker = new AMap.Marker({
    map: AMapInstance,
    position: [120.673057, 31.179554],
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
  //
  // AMapLoader.load({
  //   key: import.meta.env.VITE_AMAP_KEY,
  //   version: '2.0',
  //   plugins: ['AMap.GraspRoad', "AMap.Driving", "AMap.MoveAnimation"],
  // }).then((Amap) => {
  //   AMapObj = Amap;
  //   map.value = new Amap.Map('mapContainer', {
  //     animateEnable: true,
  //     mapStyle: 'amap://styles/dark',
  //     viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  //     zoom: 19, // 初始化地图层级
  //     center: [120.673057, 31.179554],// 初始化地图中心点
  //   });

  //   map.value.setFitView()
  //   graspRoad = new AMapObj.GraspRoad()

  //   //
  //   marker = new AMapObj.Marker({
  //     map: map.value,
  //     position: [120.673057, 31.179554],
  //     icon: new AMapObj.Icon({
  //       size: new AMapObj.Size(40, 40), // 图标尺寸
  //       image: NavIcon, // Icon的图像
  //       imageSize: new AMapObj.Size(40, 40), // 根据所设置的大小拉伸或压缩图片
  //       imageOffset: new AMapObj.Pixel(0, 0), // 图标取图偏移量
  //     }),
  //     offset: new AMapObj.Pixel(-13, -26),// 相对于基点的位置
  //   });
  //   marker.on('moving', function (e: any) {
  //     // 设置地图中心点
  //     map.value.setCenter(e.target.getPosition())
  //     // 设置旋转角
  //     map.value.setRotation(-e.target.getOrientation())
  //   });
  // })
}
initMap();


const { start, data: GPSDataRef } = useMockData(1000)
start()
watch(() => GPSDataRef.value, (val) => {
  if (!AMap) return
  // @ts-ignore

  // 转换为高德坐标
  AMap.convertFrom([val?.longitude, val?.latitude],
    'gps',
    (status, result) => {
      if (result.info === 'ok') {
        console.log(result.locations);
        const { lat, lng } = result.locations[0]
        const pixel =
          new AMap.LngLat(lng, lat)
        // map.value.panTo(pixel)
        AMapCenterMarker.moveTo([lng, lat], {
          duration: 1000,
          delay: 500,
        });
        // 角度
        // map.value.setRotation()


      }
    })

})


</script>

<style scoped>
#mapContainer {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
