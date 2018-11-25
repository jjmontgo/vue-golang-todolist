<template>
	<div />
</template>

<script>
import { ajaxGet } from './../lib/ajax';

export default {
	name: 'Logout',
	created() {
		let backendUrl = this.$root.getBackendUrl('logout');
		ajaxGet(backendUrl)
			.then(() => {
				this.$store.commit('logout');
				this.$router.push({ name: 'login' });
			}).fail(err => {
				console.error(err);
			});
	},
};
</script>
