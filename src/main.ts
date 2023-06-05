import App from './App.vue'
import { createApp } from 'vue'
import { store, key } from './store'
import { registerPlugins } from '@/plugins'
import router from "./router";
import VcRegister from '@/components/commons/_vc-register'

const app = createApp(App)
VcRegister.register(app)
registerPlugins(app)
app.use(store, key)
app.use(router).mount('#app')
