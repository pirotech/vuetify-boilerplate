import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router';
import store from './store';
import i18n from './i18n';
import './shared/api/settings';
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
