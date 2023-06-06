import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@mdi/font/css/materialdesignicons.css'

import store from './store/store'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' }
})

const app = createApp(App).use(vuetify)

app.use(VueSweetalert2, { confirmButtonColor: '#99DEC0' })
app.use(store)
app.use(router)

app.mount('#app')
