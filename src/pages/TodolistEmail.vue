<template>
	<div class="todolist-email-page">
		<h1>Send Todolist</h1>
		<p>Who would you like to send the todolist to?</p>
		<p>
			<input
				v-model="email"
				type="email"
				placeholder="Email Address"
				class="form-control">
		</p>
		<p>
			<button class="btn btn-primary" @click="sendEmail()">Send</button>
			<router-link
				:to="{name: 'dashboard'}"
				class="btn btn-link">Cancel</router-link>
		</p>
	</div>
</template>

<script>
import { ajaxPost } from './../lib/ajax';

export default {
	name: 'TodolistEmail',
	data() {
		return {
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
