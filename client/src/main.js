import { createApp } from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import { createRouter,createWebHistory} from 'vue-router'

import './assets/main.scss'
import Home from "@/components/Home.vue";
import Profile from "@/components/Profile.vue";
import Chat from "@/components/Chat.vue";



const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/chat', component: Chat },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

const app = createApp(App)

app.use(router)

//this.$http.get("http://localhost:8120/", {credentials: true}).then( res => {});


app.mount("#app")
