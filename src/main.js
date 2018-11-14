import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'purecss'
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.use(VCalendar);
Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
