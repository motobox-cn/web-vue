import { ref } from "vue";
import { IGPSData } from "../types/data";
import { GPSData } from "./gps";

export const useMockData = (interval: number = 500) => {
  const data = ref<IGPSData>();

  const dataArr: IGPSData[] = GPSData as IGPSData[];

  let currentIndex = 0;
  let intervalId: NodeJS.Timeout | null = null;

  const updateData = () => {
    data.value = dataArr[currentIndex];
    currentIndex++;
    if (currentIndex >= dataArr.length) {
      stop();
    }
  };

  const start = () => {
    if (intervalId === null) {
      intervalId = setInterval(updateData, interval);
    }
  };

  const pause = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const stop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    currentIndex = 0;
    data.value = undefined;
  };

  return {
    data,
    start,
    pause,
    stop,
  };
};
