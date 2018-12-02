<template>
	<div class="todolist-email-page">
		<h1>{{ t.emailTodolistTitle }}</h1>
		<p>{{ t.emailTodolistEmailLabel }}</p>
		<el-form :inline="true" @submit.prevent.native="onSubmit()">
			<el-form-item>
				<el-input
					v-model="email"
					type="email"
					:placeholder="t.emailAddressLabel">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sendEmail()">{{ t.sendEmailLabel }}</el-button>&nbsp;
				<router-link
					:to="{name: 'dashboard'}">
					<el-button>{{ t.cancelLabel }}</el-button>
				</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { ajaxPost } from './../lib/ajax';

export default {
	name: 'TodolistEmail',
	data() {
		return {
			t: window.t,
			email: '',
		};
	},
	methods: {
		sendEmail() {
			let backendUrl = this.$root.getBackendUrl(
				'todolist_send_email',
				{ id: this.$route.params.id }
			);
			ajaxPost(
				backendUrl,
				{ email: this.email })
				.then(() => {
					this.$router.push({ name: 'dashboard' });
				}).fail(err => {
					console.error(err);
				});
		},
	},
};
</script>
