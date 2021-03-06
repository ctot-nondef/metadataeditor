// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';

import 'vuetify/dist/vuetify.min.css';
import 'vue2-animate/dist/vue2-animate.min.css';


import { sync } from 'vuex-router-sync';
import vueLogger from 'vue-logger';

import store from './store/index';
import router from './router';
import './components/Fundament/Fundament.css';

Vue.use(vueLogger, {
  dev: process.env.NODE_ENV === 'development',
  shortname: true,
  levels: ['log', 'warn', 'debug', 'error', 'dir', 'info'],
});

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/#/en/authcallback', // Your client app URL
    },
  },
});

Vue.use(Vuetify);

sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  router,
}).$mount('#app');
