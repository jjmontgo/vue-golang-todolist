<template>
	<div class="todolist-index-page">
		<h1>Todo Lists</h1>
		<router-link :to="{name: 'todolist_new'}">New Todolist</router-link>
		<p>These are your todo lists:</p>
		<ul class="list-group">
			<li
				v-for="todolist in todolists"
				:key="todolist.id"
				class="list-group-item">
				<div class="row">
					<div class="col-sm">
						<router-link
							:to="{name: 'todolist_image', params: {id: todolist.id}}"
							class="btn btn-link">
							<img v-if="todolist.img_src" :src="todolist.img_src">
							<div v-else>No Image</div>
						</router-link>
					</div>
					<div class="col-sm">
						{{ todolist.id }} {{ todolist.name }}
					</div>
					<div class="col-sm">
						<router-link
							:to="{name: 'todos', params: {id: todolist.id}}"
							class="btn btn-secondary">Open</router-link>&nbsp;
						<router-link
								:to="{name: 'todolist_edit', params: {id: todolist.id}}"
								class="btn btn-secondary">Edit</router-link>&nbsp;
						<router-link
								:to="{name: 'todolist_email', params: {id: todolist.id}}"
								class="btn btn-secondary">Email</router-link>&nbsp;
						<button
							type="submit"
							class="btn btn-danger"
							@click="deleteTodolist(todolist.id)">Delete</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'TodolistIndex',
	data() {
		return {
			todolists: [],
		};
	},
	created() {
		this.fetchTodolists();
	},
	methods: {
		fetchTodolists() {
			let backendUrl = this.$root.getBackendUrl('index');
			ajaxGet(backendUrl)
				.then(response => {
					this.todolists = response.todolists;
				}).fail(err => {
					console.error(err);
				});
		},
		deleteTodolist(id) {
			let backendUrl = this.$root.getBackendUrl('todolist_delete', { id });
			if (confirm('Are you sure?')) {
				ajaxPost(backendUrl)
					.then(() => {
						this.fetchTodolists();
					}).fail(err => {
						console.error(err);
					});
			}
		},
	},
};
</script>
