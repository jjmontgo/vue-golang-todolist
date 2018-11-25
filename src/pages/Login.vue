<template>
	<div id="login-page">
		<el-form>
			<h1>Login</h1>

			<p v-if="loginError">
				<el-alert
					type="error"
					title="Username or password incorrect.">
				</el-alert>
			</p>

			<el-form-item label="Username">
				<el-input v-model="username"></el-input>
			</el-form-item>

			<el-form-item label="Password">
				<el-input type="password" v-model="password"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">Login</el-button>
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
