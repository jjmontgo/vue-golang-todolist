import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './element-ui-imports';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
	created() {
		this.$store.commit('setBackendUrls');
	},
	methods: {
		getBackendUrl(name, params) {
			return this.$store.getters.getBackendUrl(name, params);
		}
	},
  render: h => h(App)
}).$mount("#app");
