// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import App from './App'
import 'element-theme-chalk'
import './beingcricket.css'
import locale from 'element-ui/lib/locale/lang/en'
import 'mdi-vue/Video'
import 'mdi-vue/CalendarToday'
import 'mdi-vue/Delete'
import 'mdi-vue/LockOpen'
import 'mdi-vue/Lock'
import 'mdi-vue/Settings'
import 'mdi-vue/Check'
import 'mdi-vue/Contacts'
import i18n from './i18n'
import router from './router'

Vue.config.productionTip = false

Vue.use(Element, { locale })

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
