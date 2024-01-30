import { createRouter, createWebHistory } from 'vue-router'
// const Employee = () => import('../views/Employees.vue' /* webpackChunkName: "employee" */)
// const Languages = () => import('../views/Languages.vue' /* webpackChunkName: "languages" */)
const routes = [
  {
    path: '/',
    name: 'employee',
    component: () => import('../views/Employees.vue' /* webpackChunkName: "employee" */)
  },
  {
    path: '/:id',
    name: 'employeeDetail',
    component: () => import('../views/EmployeeDetail.vue' /* webpackChunkName: "employeeDTL" */),
    props:true
  },
  {
    path: '/languages',
    name: 'languages',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Languages.vue' /* webpackChunkName: "languages" */)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
