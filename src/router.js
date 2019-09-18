import Vue from 'vue'
import Router from 'vue-router'
import BeingCricket from "./views/BeingCricket";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [  { path: '/', component: () => import('./views/Landing.vue') },
                {
                    path: '/BeingCricket',
                    component: BeingCricket,
                    children: [
                        { path: 'Videos', component: () => import('./views/Videos.vue') },
                        { path: 'Coaches', component: () => import('./views/Coaches.vue') },
                        { path: 'Sessions', component: () => import('./views/Sessions.vue') },
                        { path: '/CoachDetail', component: () => import('./views/CoachDetail.vue') },
                        { path: '/SessionDetail', component: () => import('./views/SessionDetail.vue') },
                        { path: '/VideoDetail', component: () => import('./views/SessionDetail.vue') }
                    ]
                }
        ]
})