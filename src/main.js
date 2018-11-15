import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'purecss/build/buttons-min.css'
import 'purecss/build/forms-min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'typeface-montserrat'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
