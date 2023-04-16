import { inject } from 'vue';
import { Socket } from 'socket.io-client';

const useSocket = () => {
  const socket = inject('socket') as Socket;

  const onGPSData = (handler: (data: any) => void) => {
    socket.on('GPS', handler);
  };

  const onAttitudeData = (handler: (data: any) => void) => {
    socket.on('Attitude', handler);
  };

  return {
    onGPSData,
    onAttitudeData,
  };
};

export default useSocket;
