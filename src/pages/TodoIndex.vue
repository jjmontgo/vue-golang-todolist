<template>
	<div class="todo-index-page">
		<h1>{{ todolist.name }}</h1>
		<p>
			<router-link
				:to="{ name: 'todo_new', params: {todo_list_id: todolist.id} }"
				class="btn btn-primary">Add todo</router-link>
			<router-link
				:to="{ name: 'dashboard' }"
				class="btn btn-link">Back to todo lists</router-link>
		</p>
		<ul class="list-group">
			<li v-for="todo in todos" :key="todo.id" class="list-group-item">
				<div class="row">
					<div class="col-sm">
						{{ todo.id }} {{ todo.name }}
					</div>
					<div class="col-sm">
						<router-link
							:to="{ name: 'todo_edit', params: {id: todo.id} }"
							class="btn btn-secondary">Edit</router-link>
						&nbsp;
						<button
							type="submit"
							class="btn btn-danger"
							@click="deleteTodo(todo.id)">Delete</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodoIndex',
	data() {
		return {
			todolist: {},
			todos: [],
		};
	},
	created() {
		this.fetchTodos();
	},
	methods: {
		fetchTodos() {
			let backendUrl = this.$root.getBackendUrl(
				'todolist',
				{ id: this.$route.params.id }
			);
			ajaxGet(backendUrl)
				.then(response => {
					this.todolist = response.todolist;
					this.todos = response.todos;
				}).fail(err => {
					console.error(err);
				});
		},
		deleteTodo(id) {
			if (confirm('Are you sure?')) {
				let backendUrl = this.$root.getBackendUrl(
					'todo_delete',
					{ id }
				);
				ajaxPost(backendUrl)
					.then(() => {
						this.fetchTodos();
					}).fail(err => {
						console.error(err);
					});
			}
		},
	},
};
</script>
