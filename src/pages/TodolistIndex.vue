<template>
	<div id="todolist-index-page">
		<div style="float: right">
			<router-link title="new todolist" :to="{name: 'todolist_new'}">
				<v-icon name="plus-circle" :label="t.newTodolistLabel" scale="3" />
			</router-link>
		</div>
		<h1>{{ t.todolistsTitle }}</h1>

		<p>{{ t.todolistsListLabel }}</p>
		<div class="cards">
			<el-card
				v-for="todolist in todolists"
				:key="todolist.id"
				class="box-card">
				<div slot="header" class="clearfix">
					<span>{{ todolist.name }}</span>
					<div style="float:right">
						<router-link
							:title="t.editLabel"
							:to="{name: 'todolist_edit', params: {id: todolist.id}}"
							class="btn btn-secondary">
							<v-icon name="edit" :label="t.editLabel" />
						</router-link>&nbsp;

						<router-link
							:title="t.seeTodosLabel"
							:to="{name: 'todos', params: {id: todolist.id}}"
							class="btn btn-secondary">
							<v-icon name="list-ol" :label="t.seeTodosLabel" />
						</router-link>&nbsp;

						<router-link
							:title="t.emailLabel"
							:to="{name: 'todolist_email', params: {id: todolist.id}}"
							class="btn btn-secondary">
							<v-icon name="at" :label="t.emailLabel" />
						</router-link>&nbsp;

						<a href="#"
							:title="t.deleteLabel"
							type="submit"
							@click.prevent="deleteTodolist(todolist.id)">
							<v-icon name="trash" :label="t.deleteLabel" />
						</a>
					</div>
				</div>
				<div>
					<router-link
						:to="{name: 'todolist_image', params: {id: todolist.id}}"
						class="btn btn-link">
						<img v-if="todolist.img_src" :src="todolist.img_src" style="width: 100%">
						<div v-else>{{ t.noImage }}</div>
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
			t: window.t,
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
			if (confirm(this.t.deleteConfirmation)) {
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
