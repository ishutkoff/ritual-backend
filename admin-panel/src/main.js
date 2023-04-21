import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import components from './components/UI'
import router from './router/router'

import store from './store'

const app = createApp(App)

components.forEach(component => {
	app.component(component.name, component)
})

app.use(store)
app.use(router)
app.mount('#app')
