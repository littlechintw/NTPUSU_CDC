import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Vue-Resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')