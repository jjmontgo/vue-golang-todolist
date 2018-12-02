<template>
	<div class="app-header-component">
		<el-menu
			v-if="loggedIn"
			:router="true"
			:default-active="$router.path"
			class="el-menu-demo"
			mode="horizontal">
			<el-menu-item index="/">{{ t.todolistsTitle }}</el-menu-item>
			<el-menu-item index="/users">{{ t.usersTitle }}</el-menu-item>
			<el-menu-item index="/logout">{{ t.logoutLabel }}</el-menu-item>
		</el-menu>
	</div>
</template>

<style>
</style>

<script>
export default {
	name: 'AppHeader',
	props: {
		title: { type: String, default: '' }
	},
	data() {
		return {
			t: window.t,
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.loggedIn;
		},
		homeRoute() {
			return this.loggedIn ? 'dashboard' : 'login';
		},
	},
};
</script>
