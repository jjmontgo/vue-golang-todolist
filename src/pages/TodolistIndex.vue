<template>
	<div id="todolist-index-page">
		<div style="float: right">
			<router-link title="new todolist" :to="{name: 'todolist_new'}">
				<v-icon name="plus-circle" label="new todolist" scale="3" />
			</router-link>
		</div>
		<h1>Todo Lists</h1>

		<p>These are your todo lists:</p>
		<div class="cards">
			<el-card
				v-for="todolist in todolists"
				:key="todolist.id"
				class="box-card">
				<div slot="header" class="clearfix">
					<span>{{ todolist.name }}</span>
					<div style="float:right">
						<router-link
							title="edit"
							:to="{name: 'todolist_edit', params: {id: todolist.id}}"
							class="btn btn-secondary">
							<v-icon name="edit" label="edit" />
						</router-link>&nbsp;

						<router-link
							title="see todos"
							:to="{name: 'todos', params: {id: todolist.id}}"
							class="btn btn-secondary">
							<v-icon name="list-ol" label="see todos" />
						</router-link>&nbsp;

						<router-link
							title="email"
							:to="{name: 'todolist_email', params: {id: todolist.id}}"
							class="btn btn-secondary">
							<v-icon name="at" label="email" />
						</router-link>&nbsp;

						<a href="#"
							title="delete"
							type="submit"
							@click.prevent="deleteTodolist(todolist.id)">
							<v-icon name="trash" label="delete" />
						</a>
					</div>
				</div>
				<div>
					<router-link
						:to="{name: 'todolist_image', params: {id: todolist.id}}"
						class="btn btn-link">
						<img v-if="todolist.img_src" :src="todolist.img_src" style="width: 100%">
						<div v-else>No Image</div>
					</router-link>
				</div>
			</el-card>
		</div>
	</div>
</template>

<style lang="scss">
	#todolist-index-page {
		@media (min-width: 768px) {
			.cards {
				display: flex;
				flex-wrap: wrap;
			}
		}

		.cards {
			>.box-card {
				flex-basis: 31%;
				margin: 1%;

				:nth-of-type(3n) {
					margin-right: 0;
				}
				:nth-of-type(3n+1) {
					margin-left: 0;
				}
			}
		}
	}
</style>

<script>
import { ajaxGet, ajaxPost } from './../lib/ajax';
import 'vue-awesome/icons/plus-circle';
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/list-ol'
import 'vue-awesome/icons/at'
import 'vue-awesome/icons/trash'
import Icon from 'vue-awesome/components/Icon'

export default {
	name: 'TodolistIndex',
	components: {
		'v-icon': Icon,
	},
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
