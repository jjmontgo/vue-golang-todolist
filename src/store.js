import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import { ajaxGet } from './lib/ajax';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		backendUrls: false, // set to object{} after loaded
		loggedIn: false,
		loadingData: false,
	},
	getters: {
		getBackendUrl: (state) => (name, params) => {
			var param;
			var urlParamRegexp;
			if (!state.backendUrls[name]) {
				console.error('Invalid route name: ' + name);
				return null;
			}
			let urlPath = state.backendUrls[name];
			if (params) {
				for (param in params) {
					// eg. replace {id:[0-9]+} with the id
					urlParamRegexp = new RegExp('{' + param + '\\S*}', 'g');
					urlPath = urlPath.replace(urlParamRegexp, params[param]);
				}
			}
			return urlPath;
		}
	},
	mutations: {
		setBackendUrls(state) {
			if (state.backendUrls === false) {
				ajaxGet(process.env.VUE_APP_BACKEND_URL + '/urls')
					.then((response) => {
						state.backendUrls = response.urls;
					});
			}
		},
		login(state) {
			state.loggedIn = true;
		},
		logout(state) {
			state.loggedIn = false;
		},
		startLoadingData(state) {
			state.loadingData = true;
		},
		finishLoadingData(state) {
			state.loadingData = false;
		},
	}
});
