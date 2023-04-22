import { io } from "socket.io-client";
import { App } from 'vue';

interface SocketPluginOptions {
  connection: string;
  options?: any;
}

export default {
  install: (app: App, { connection, options }: SocketPluginOptions) => {
    const socket = io(connection, options);
    app.config.globalProperties.$socket = socket;
    app.provide("socket", socket);
  },
}
