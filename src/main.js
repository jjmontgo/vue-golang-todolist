import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './element-ui-imports';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
	methods: {
		getBackendUrl(name, params) {
			var param;
			var urlParamRegexp;
			if (!window.urls) {
				console.error('window.urls not set');
				return null;
			}
			if (!window.urls[name]) {
				console.error('Invalid route name: ' + name);
				return null;
			}
			let urlPath = window.urls[name];
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
  render: h => h(App)
}).$mount("#app");
