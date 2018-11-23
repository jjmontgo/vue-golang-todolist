<template>
	<div class="login-page">
		<h1>Login</h1>

		<div v-if="loginError" class="alert alert-danger" role="alert">
			Username or password incorrect.
		</div>

		<form @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="username">Username</label>
				<input
					id="username"
					v-model="username"
					class="form-control"
					type="text"
					name="username">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					id="password"
					v-model="password"
					class="form-control"
					type="password"
					name="password">
			</div>
			<input type="submit" value="Login">
		</form>
	</div>
</template>

<script>
import { ajaxPost } from './../lib/ajax';

export default {
	name: 'Login',
	data() {
		return {
			loginError: false,
			username: '',
			password: '',
		};
	},
	methods: {
		onSubmit() {
			let backendUrl = this.$root.getBackendUrl('login');
			ajaxPost(backendUrl, {
				username: this.username,
				password: this.password,
			}).then(() => {
				this.$store.commit('login');
				this.$router.push({ name: 'dashboard' });
			}).fail(() => {
				this.loginError = true;
			});
		}
	},
};
</script>
