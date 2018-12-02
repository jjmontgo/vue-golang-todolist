<template>
	<div class="todo-edit-page">
		<h1>{{ t.editTodoTitle }}</h1>
		<p v-if="errorMessage !== false">
			<el-alert type="error" :title="errorMessage"></el-alert>
		</p>
		<el-form :inline="true" @submit.prevent.native="onSubmit()">
			<el-form-item>
				<el-input
					v-model="todo.name"
					:placeholder="t.todoDescriptionLabel">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">{{ t.saveLabel }}</el-button>&nbsp;
				<router-link
					:to="{ name: 'todos', params: { id: todo.todo_list_id } }">
					<el-button>{{ t.backToTodolistsLabel }}</el-button>
				</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodoEdit',
	data() {
		return {
			t: window.t,
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
