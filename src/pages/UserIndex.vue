<template>
	<div class="user-index-page">
		<h1>Users</h1>
		<router-link
			:to="{ name: 'user_new' }"
			class="btn btn-primary">New User</router-link>
		<p>&nbsp;</p>
		<table class="table">
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tr v-for="user in users" :key="user.id">
				<td>{{ user.username}}</td>
				<td>{{ user.email }}</td>
				<td>
					<router-link
						:to="{ name: 'user_edit', params: {id: user.id} }"
						class="btn btn-secondary">Edit</router-link>
					&nbsp;
					<button
						type="submit"
						class="btn btn-danger"
						@click="deleteUser(user.id)">Delete</button>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';

export default {
	name: 'UserIndex',
	data() {
		return {
			users: [],
		};
	},
	created() {
		this.fetchUsers();
	},
	methods: {
		fetchUsers() {
			let backendUrl = this.$root.getBackendUrl('users');
			ajaxGet(backendUrl)
				.then(response => {
					this.users = response.users;
				}).fail(err => {
					console.error(err);
				});
		},
		deleteUser(id) {
			if (confirm('Are you sure?')) {
				let backendUrl = this.$root.getBackendUrl(
					'user_delete',
					{ id }
				);
				ajaxPost(backendUrl)
					.then(() => {
						this.fetchUsers();
					}).fail(err => {
						console.error(err);
					});
			}
		},
	},
};
</script>
