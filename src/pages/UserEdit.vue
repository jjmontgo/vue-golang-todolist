<template>
	<div class="user-edit-page">
		<h1>Edit User</h1>
		<router-link :to="{name: 'users'}">Back to Users</router-link>

		<div v-if="errorMessage !== false" class="alert alert-danger" role="alert">
			{{ errorMessage }}
		</div>

		<form @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="username">Username</label>
				<input v-model="user.username" class="form-control" type="text">
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input v-model="user.email" class="form-control" type="text">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input v-model="user.password" class="form-control" type="password">
			</div>
			<input type="submit" value="Save">
		</form>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'UserEdit',
	data() {
		return {
			errorMessage: false,
			user: { id: '', username: '', email: '' },
		};
	},
	created() {
		if (!this.$route.params.hasOwnProperty('id')) {
			// create new user
			return;
		}
		let backendUrl = this.$root.getBackendUrl(
			'user_edit',
			{ id: this.$route.params.id }
		);
		ajaxGet(backendUrl)
			.then(response => {
				this.user = response.user;
			}).fail(() => {
				// do something
			});
	},
	methods: {
		onSubmit() {
			let backendUrl = this.$root.getBackendUrl('user_save');
			ajaxPost(backendUrl, {
				id: this.user.id,
				username: this.user.username,
				email: this.user.email,
				password: this.user.password,
			}).then(() => {
				this.$router.push({ name: 'users' });
			}).fail(err => {
				let response = JSON.parse(err.responseText);
				this.errorMessage = response.message;
			});
		},
	},
};
</script>
