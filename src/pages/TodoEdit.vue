<template>
	<div class="todo-edit-page">
		<h1>Edit Todo</h1>
		<router-link
			:to="{ name: 'todos', params: { id: todo.todo_list_id } }"
			class="btn btn-link">Back to Todo List</router-link>

		<div v-if="errorMessage !== false" class="alert alert-danger" role="alert">
			{{ errorMessage }}
		</div>

		<form @submit.prevent="onSubmit">
			<div class="form-group">
				<input v-model="todo.name" class="form-control" type="text">
			</div>
			<input type="submit" value="Save">
		</form>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodoEdit',
	data() {
		return {
			errorMessage: false,
			todo: { id: '', name: '', todo_list_id: '' },
		};
	},
	created() {
		if (this.$route.params.hasOwnProperty('todo_list_id')) {
			// create new todo
			this.todo.todo_list_id = this.$route.params.todo_list_id;
			return;
		}
		let backendUrl = this.$root.getBackendUrl(
			'todo_edit',
			{ id: this.$route.params.id }
		);
		ajaxGet(backendUrl)
			.then(response => {
				this.todo = response.todo;
			}).fail(() => {
				// do something
			});
	},
	methods: {
		onSubmit() {
			let backendUrl = this.$root.getBackendUrl('todo_save');
			ajaxPost(backendUrl, {
				id: this.todo.id,
				name: this.todo.name,
				todo_list_id: this.todo.todo_list_id,
			}).then(() => {
				this.$router.push({
					name: 'todos',
					params: { id: this.todo.todo_list_id },
				});
			}).fail(err => {
				let response = JSON.parse(err.responseText);
				this.errorMessage = response.message;
			});
		},
	},
};
</script>
