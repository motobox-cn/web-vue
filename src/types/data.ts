// 定义 GPS 数据类型
export interface IGPSData {
  gps_time: number;                 // GPS 时间戳
  status: "A" | "B" | "C" | "";                // 状态枚举类型
  heading: number;                   // 方向
  hight: number;                     // 高度
  high_tube: string;                 // 高管
  lon_direction: "N" | "S" | "E" | "W";      // 经度方向枚举类型
  lat_direction: "N" | "S" | "E" | "W";      // 纬度方向枚举类型
  longitude: number;                 // 经度
  latitude: number;                  // 纬度
  is_gps_normal: boolean;            // 是否 GPS 正常
  speed: number;                     // 速度
}


// 定义传感器数据类型
interface SensorData {
  AccelX: number;   // X轴加速度
  AccelY: number;   // Y轴加速度
  AccelZ: number;   // Z轴加速度
  GyroX: number;    // X轴陀螺仪
  GyroY: number;    // Y轴陀螺仪
  GyroZ: number;    // Z轴陀螺仪
  Pitch: number;    // 俯仰角
  Roll: number;     // 横滚角
  Temp: number;     // 温度
}
