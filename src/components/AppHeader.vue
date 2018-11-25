<template>
	<div class="app-header-component">
		<el-menu
			v-if="loggedIn"
			:router="true"
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal">
			<el-menu-item index="/">Todo Lists</el-menu-item>
			<el-menu-item index="/users">Users</el-menu-item>
			<el-menu-item index="/logout">Logout</el-menu-item>
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
			activeIndex: null,
		};
	},
	mounted () {
		this.activeIndex = this.$route.path;
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
