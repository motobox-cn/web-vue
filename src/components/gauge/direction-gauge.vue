<template>
  <div ref="direction_gauge_ref" class="w-full"/>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { computed, onMounted, ref, watch } from "vue";

const direction_gauge_ref = ref<HTMLElement | null>(null)

let chart: echarts.ECharts | null = null;

const props=defineProps<{
  longitude:number,
  latitude:number,
}>()

const option = computed(() => ({
  series: [
  {
    type: 'gauge',
    startAngle: 90,
    endAngle: -269.9999,
    axisLine: {
      lineStyle: {
        width: 12,
        color: [
          [0.25, '#67e0e3'],
          [0.5, '#37a2da'],
          [0.75, '#ffb980'],
          [1, '#fd666d']
        ]
      }
    },
    pointer: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    detail: {
      show: false
    },
    data: [
      {
        value: 0,
        name: '方位',
        title: {
          fontSize: 14,
          fontWeight: 'bolder',
          color: '#333',
          offsetCenter: [0, '90%']
        },
        detail: {
          fontSize: 16,
          fontWeight: 'bolder',
          color: '#333',
          formatter: function (value:number) {
            var direction = '';
            if (value >= 0 && value < 22.5) {
              direction = '北';
            } else if (value >= 22.5 && value < 67.5) {
              direction = '东北';
            } else if (value >= 67.5 && value < 112.5) {
              direction = '东';
            } else if (value >= 112.5 && value < 157.5) {
              direction = '东南';
            } else if (value >= 157.5 && value < 202.5) {
              direction = '南';
            } else if (value >= 202.5 && value < 247.5) {
              direction = '西南';
            } else if (value >= 247.5 && value < 292.5) {
              direction = '西';
            } else if (value >= 292.5 && value < 337.5) {
              direction = '西北';
            } else if (value >= 337.5 && value <= 360) {
              direction = '北';
            }
            return direction;
          },
          offsetCenter: [0, '80%']
        }
      }
    ]
  }
]

}))
const renderChart = () => {
  if (!chart) {
    chart = echarts.init(direction_gauge_ref.value as HTMLElement,);
  }
  chart.setOption(option.value);
};

onMounted(() => {
      renderChart();
      //
      watch(
        () => props.speed,
        () => {
          renderChart();
        },
        { immediate: true }
      );
    });

</script>

<style scoped>
</style>
