<template>
	<div class="user-edit-page">
		<h1>{{ t.editUserTitle }}</h1>

		<p v-if="errorMessage !== false">
			<el-alert type="error" :title="errorMessage"></el-alert>
		</p>

		<el-form @submit.prevent.native="onSubmit" label-width="120px">
			<el-form-item :label="t.usernameLabel">
				<el-input v-model="user.username"></el-input>
			</el-form-item>
			<el-form-item :label="t.emailLabel">
				<el-input v-model="user.email" type="email"></el-input>
			</el-form-item>
			<el-form-item :label="t.passwordLabel">
				<el-input v-model="user.password" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">{{ t.saveLabel }}</el-button>&nbsp;
				<router-link :to="{name: 'users'}">
					<el-button>{{ t.backToUsersLabel }}</el-button>
				</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'UserEdit',
	data() {
		return {
			t: window.t,
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
