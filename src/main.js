// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import App from './App'
import VueRouter from 'vue-router'
import 'element-theme-chalk'
import './beingcricket.css'
import Videos from './components/Videos'
import Sessions from './components/Sessions'
import BeingCricket from './components/BeingCricket'
import Landing from './components/Landing'
import Coaches from './components/Coaches'
import CoachDetail from './components/CoachDetail'
import VideoDetail from './components/VideoDetail'
import SessionDetail from './components/SessionDetail'
import locale from 'element-ui/lib/locale/lang/en'
import 'mdi-vue/VideoIcon'
import 'mdi-vue/CalendarTodayIcon'
import 'mdi-vue/DeleteIcon'
import 'mdi-vue/LockOpenIcon'
import 'mdi-vue/LockIcon'
import 'mdi-vue/SettingsIcon'
import 'mdi-vue/CheckIcon'
import 'mdi-vue/ContactsIcon'

Vue.config.productionTip = false

Vue.use(Element, { locale })
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Landing },
  { path: '/BeingCricket',
    component: BeingCricket,
    children: [
      { path: 'Videos', component: Videos },
      { path: 'Coaches', component: Coaches },
      { path: 'Sessions', component: Sessions },
      { path: '/CoachDetail', component: CoachDetail },
      { path: '/SessionDetail', component: SessionDetail },
      { path: '/VideoDetail', component: VideoDetail }
    ]}

]

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
