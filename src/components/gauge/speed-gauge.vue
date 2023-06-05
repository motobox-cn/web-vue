<template>
  <div ref="speed_gauge_ref" class="w-full"/>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { computed, onMounted, ref, watch } from "vue";

const speed_gauge_ref = ref<HTMLElement | null>(null)

let chart: echarts.ECharts | null = null;

const props=defineProps<{
  speed: number
}>()

const option = computed(() => ({
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 12,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'inherit'
        }
      },
      axisTick: {
        distance: -15,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 1
        }
      },
      splitLine: {
        distance: -55,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'inherit',
        distance: 40,
        fontSize: 11
      },
      detail: {
        fontSize: 14,
        valueAnimation: true,
        formatter: '{value} km/h',
        color: 'inherit'
      },
      data: [
        {
          value: props.speed
        }
      ]
    }
  ]
}))
const renderChart = () => {
  if (!chart) {
    chart = echarts.init(speed_gauge_ref.value as HTMLElement,);
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
