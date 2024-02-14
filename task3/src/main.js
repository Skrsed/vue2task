import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store } from './store/whatcmsStore'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark'
    }
})

app.use(store)
app.use(vuetify)

app.mount('#app')
