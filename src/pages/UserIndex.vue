<template>
	<div class="user-index-page">
		<h1>{{ t.usersTitle }}</h1>
		<p>
			<router-link
				:to="{ name: 'user_new' }"
				class="btn btn-primary">
				<el-button type="primary">{{ t.newUserLabel }}</el-button>
			</router-link>&nbsp;
			<router-link
				:to="{ name: 'dashboard' }"
				class="btn btn-link">
				<el-button>
					{{ t.backToTodolistsLabel }}
				</el-button>
			</router-link>
		</p>
		<el-table :data="users" style="width: 100%">
			<el-table-column :label="t.usernameLabel" prop="username"></el-table-column>
			<el-table-column :label="t.emailLabel" prop="email"></el-table-column>
			<el-table-column fixed="right" :label="t.operationsLabel" width="120">
				<template slot-scope="scope">
					<router-link
						:to="{ name: 'user_edit', params: {id: scope.row.id} }"
						class="btn btn-secondary">{{ t.editLabel }}</router-link>
					&nbsp;
					<el-button
						type="text"
						@click="deleteUser(scope.row.id)">
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
	name: 'UserIndex',
	data() {
		return {
			t: window.t,
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
			if (confirm(this.t.deleteConfirmation)) {
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
