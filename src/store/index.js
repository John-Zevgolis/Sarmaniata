import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { bus } from '../main';

Vue.use(Vuex);

const Cosmic = require('cosmicjs');
const api = Cosmic();
const bucket = api.bucket({
  slug: 'sarmaniata-production',
  read_key: 'PZSFvEaXhYIidLNTHeOpqPaNiVU85UQg77TUsFbNwlM28Az94K'
});

const store = new Vuex.Store({
	state() {
		return {
			objData: null,
			homepageObjData: null,
			logo: null,
			response: null
		};
	},
	mutations: {
		storeData(state, payload) {
			state.objData = payload;
		},
		storeHomepageData(state, payload) {
			state.homepageObjData = payload;
		},
		storeLogo(state, payload) {
			state.logo = payload;
		},
		saveResponse(state, payload) {
			state.response = payload;
		}
	},
	actions: {
		fetchContent({commit}, payload) {
			bucket.getObject({
				id: payload.id,
				props: payload.props
			}).then(response => commit('storeData', response.object));
		},
		fetchHomepage({commit}, payload) {
			bucket.getObject({
				id: payload.id,
				props: payload.props
			}).then(response => {
				commit('storeHomepageData', response.object)
			});
		},
		fetchLogo({commit}) {
			bucket.getSingleMedia({
				id: '6249ee0841ddce0e52b038d3',
				props: 'url'
			}).then(response => commit('storeLogo', response.media.url));
		},
		sendEmail({commit}, payload) {
			const data = new FormData();
			data.append('name', payload.name);
			data.append('email', payload.email);
			data.append('subject', payload.subject);
			data.append('message', payload.message);
			axios.post('/process.php', data).then(res => res.data, err => console.log(err.message))
			.then(res => {
				commit('saveResponse', res);
				if(res.status === 'success') bus.$emit('reset');
			})
			.catch(err => console.log(err.message));
		}
	},
	getters: {
		objData(state) {
			return state.objData;
		},
		logo(state) {
			return state.logo;
		},
		homepageObjData(state) {
			return state.homepageObjData;
		},
		response(state) {
			return state.response;
		}
	}
});

export default store;
