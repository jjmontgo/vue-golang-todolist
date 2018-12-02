<template>
	<div class="todo-index-page">
		<h1>{{ todolist.name }}</h1>
		<p>
			<router-link
				:to="{ name: 'todo_new', params: {todo_list_id: todolist.id} }"
				class="btn btn-primary">
				<el-button type="primary">
					{{ t.addTodoLabel }}
				</el-button>
			</router-link>&nbsp;
			<router-link
				:to="{ name: 'dashboard' }"
				class="btn btn-link">
				<el-button>
					{{ t.backToTodolistsLabel }}
				</el-button>
			</router-link>
		</p>
		<el-table :data="todos" style="width: 100%">
			<el-table-column :label="t.nameLabel" prop="name"></el-table-column>
			<el-table-column fixed="right" :label="t.operationsLabel" width="120">
				<template slot-scope="scope">
					<router-link
						:to="{ name: 'todo_edit', params: {id: scope.row.id} }">
						{{ t.editLabel }}
					</router-link>
					&nbsp;
					<el-button
						type="text"
						@click="deleteTodo(scope.row.id)">
						{{ t.deleteLabel }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodoIndex',
	data() {
		return {
			t: window.t,
			todolist: {id: 0},
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
			if (confirm(this.t.deleteConfirmation)) {
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
