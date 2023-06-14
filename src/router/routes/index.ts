import dashboardVue from "../../views/dashboard.vue"
import testVue from "../../views/test.vue"

export const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/dash'
  },
  {
    name: 'dash',
    path: '/dash',
    component: dashboardVue
  },
  {
    name: 'test',
    path: '/test',
    component: testVue
  }
]

export default routes
