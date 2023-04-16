import dashboardVue from "../../views/dashboard.vue"

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
  }
]

export default routes
