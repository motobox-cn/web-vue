import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import socket from './ws'
import { getIpAddress } from './utils'

const app = createApp(App)
app.use(router)
app.use(socket, {
  connection: getIpAddress() + '/ws',
  options: {
    autoConnect: true,
  },
});
app.mount('#app')
