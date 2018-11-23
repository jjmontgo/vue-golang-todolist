import $ from 'jquery';
import router from '../router';
import store from '../store';

export function ajaxGet(url, data = {}) {
	return ajax('GET', url, data);
}

export function ajaxPost(url, data = {}) {
	return ajax('POST', url, data);
}

function ajax(method, url, data) {
	store.commit('startLoadingData');
	return $.ajax({
		method,
		url,
		data,
		// allow session cookie to be sent
		xhrFields: {
			withCredentials: true
		},
		// redirect to login when there's a 403 response
		complete(jqXHR) {
			store.commit('finishLoadingData');
			if (jqXHR.status === 403) {
				store.commit('logout');
				router.push({ name: 'login' });
			}
		},
	});
}
