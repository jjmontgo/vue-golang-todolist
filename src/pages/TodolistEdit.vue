<template>
	<div class="todolist-edit-page">
		<h1>Edit Todolist</h1>

		<router-link
			:to="{ name: 'dashboard' }"
			class="btn btn-link">Back to todo lists</router-link>

		<div v-if="errorMessage !== false" class="alert alert-danger" role="alert">
			{{ errorMessage }}
		</div>

		<form @submit.prevent="onSubmit">
			<div class="form-group">
				<input v-model="todolist.name" class="form-control" type="text">
			</div>
			<input type="submit" value="Save">
		</form>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodolistEdit',
	data() {
		return {
			errorMessage: false,
			todolist: { id: '', name: '' },
		};
	},
	created() {
		if (!this.$route.params.hasOwnProperty('id')) {
			// create new todolist
			return;
		}
		let backendUrl = this.$root.getBackendUrl(
			'todolist_edit',
			{ id: this.$route.params.id }
		);
		ajaxGet(backendUrl)
			.then(response => {
				this.todolist = response.todolist;
			}).fail(() => {
				// do something
			});
	},
	methods: {
		onSubmit() {
			let backendUrl = this.$root.getBackendUrl('todolist_save');
			ajaxPost(backendUrl, {
				id: this.todolist.id,
				name: this.todolist.name,
			}).then(() => {
				this.$router.push({ name: 'dashboard' });
			}).fail(err => {
				let response = JSON.parse(err.responseText);
				this.errorMessage = response.message;
			});
		},
	},
};
</script>
