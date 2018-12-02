<template>
	<div id="login-page">
		<el-form>
			<h1>{{ t.loginLabel }}</h1>

			<p v-if="loginError">
				<el-alert
					type="error"
					title="Username or password incorrect.">
				</el-alert>
			</p>

			<el-form-item :label="t.usernameLabel">
				<el-input v-model="username" @keyup.enter.native="onSubmit"></el-input>
			</el-form-item>

			<el-form-item :label="t.passwordLabel">
				<el-input
					type="password"
					v-model="password"
					@keyup.enter.native="onSubmit">
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click.prevent="onSubmit">{{ t.loginLabel }}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style lang="scss">
	#login-page {
		display: flex;

		>form {
			margin: auto;
		}
	}
</style>

<script>
import { ajaxPost } from './../lib/ajax';

export default {
	name: 'Login',
	data() {
		return {
			loginError: false,
			username: '',
			password: '',
			t: window.t
		};
	},
	mounted() {
		// console.log(this.t);
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
