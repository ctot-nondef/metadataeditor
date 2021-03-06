import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import VueAxios from 'vue-axios';
// import createLogger from 'vuex/dist/logger';
import jowl from './modules/jowl/index';
import n3 from './modules/n3/index';
import JSONschema from './modules/JSONschema/index';
import app from './modules/app/index';
import localStorageInfo from './modules/localStorageInfo/index';
import dialogs from './modules/dialogs/index';
import config from './modules/config/index';
import batchCreate from './modules/batchCreate/index';
import plugins from './plugins';


Vue.use(Vuex);
Vue.use(VueAxios, Axios);


if (process.env.NODE_ENV !== 'production') {
  // plugins.push(createLogger());
}

export default new Vuex.Store({
  modules: {
    jowl,
    n3,
    JSONschema,
    app,
    localStorageInfo,
    dialogs,
    config,
    batchCreate,
  },
  plugins,
  strict: false,
});


export const STORAGE_KEY = 'MetaDataEditor';
export const SESSION_ID = `SESSION_${Date.now().valueOf().toString(36)}`;
