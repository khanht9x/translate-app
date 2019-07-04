import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'translate',
      component: require('@/components/Translate/Translate')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})