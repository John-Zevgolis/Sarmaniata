import Vue from 'vue';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'hamburgers/dist/hamburgers.min.css';
import 'bootstrap/js/dist/modal';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAtlassian } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMeta from 'vue-meta';
import * as VueGoogleMaps from 'vue2-google-maps';
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
library.add(faFacebookF, faTwitter, faLocationDot, faPhone, faEnvelope, faAtlassian);
import VueLazyload from 'vue-lazyload';
import Lightbox from 'vue-lightbox-lite';
import 'vue-lightbox-lite/dist/index.css';
import VueSocialSharing from 'vue-social-sharing';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(VueLazyload);
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCBmUXYXi_Zufpz1rKucKIT1dsU9yIdx_Y',
	}
});
Vue.component('GmapCluster', GmapCluster);
Vue.use(Lightbox);
Vue.use(VueSocialSharing);

export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
