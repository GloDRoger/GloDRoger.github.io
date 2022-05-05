import { createApp } from 'vue'
import App from './App.vue'
import {
    // create naive ui
    create,
    // component
    NButton,
    NSpin,
    NResult,
  } from 'naive-ui'
  
const naive = create({
    components: [NButton,NSpin,NResult]
  })

const app = createApp(App)
app.use(naive)

app.mount('#app')
