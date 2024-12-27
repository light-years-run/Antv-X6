import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    routes:[
        {
            path:'/',
            name: 'home',
            component: ()=>import('@/views/index.vue')
        }
    ],
    history: createWebHashHistory()
})