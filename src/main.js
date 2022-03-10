import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// mixins
import publicMixins from './mixins/public'
Vue.mixin(publicMixins)
Vue.config.productionTip = false
Vue.use(ElementUI)
import './style/public.css'
import './style/main.css'
import './plugins'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
