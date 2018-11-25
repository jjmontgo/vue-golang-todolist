<template>
	<div class="todolist-edit-page">
		<h1>Edit Todolist</h1>

		<p v-if="errorMessage !== false">
			<el-alert type="error" :title="errorMessage"></el-alert>
		</p>

		<el-form :inline="true" @submit.prevent.native="onSubmit()">
			<el-form-item>
				<el-input
					v-model="todolist.name"
					placeholder="Name of Todo List">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">Save</el-button>
				&nbsp;
				<router-link
					:to="{ name: 'dashboard' }"
					class="btn btn-link">
					<el-button>Back to todo lists</el-button>
				</router-link>
			</el-form-item>
		</el-form>
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
