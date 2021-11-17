import Vue from 'vue';
import App from './App.vue';
import store from './store';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { createNamespacedHelpers } from 'vuex';
Vue.config.productionTip = false;

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
 
new Vue({
  store,
  render: (h) => h(App),

}) 

.$mount('#app');


