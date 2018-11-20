// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './style/theElePublicClass.css'
Vue.use(ElementUI);

import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css'
import scrollConfig from '../config/vuescroll'
Vue.use(vuescroll,{
  ops:scrollConfig
});

import person_title from './components/personPage/personContTitle'
Vue.component('person-title', person_title);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
