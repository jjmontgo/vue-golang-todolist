import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		loggedIn: false,
		loadingData: false,
	},
	mutations: {
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
