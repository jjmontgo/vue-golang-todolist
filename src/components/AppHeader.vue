<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#">{{ title }}</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation">
			<span class="navbar-toggler-icon" />
		</button>
		<div id="navbarSupportedContent" class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<router-link :to="{ name: 'dashboard' }" class="nav-link">Home</router-link>
				</li>
				<li v-if="loggedIn" class="nav-item active">
					<router-link :to="{ name: 'users' }" class="nav-link">Users</router-link>
				</li>
				<li v-if="!loggedIn" class="nav-item">
					<router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
				</li>
				<li v-if="loggedIn" class="nav-item">
					<router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<style>
</style>

<script>
export default {
	name: 'AppHeader',
	props: {
		title: { type: String, default: '' }
	},
	computed: {
		loggedIn() {
			return this.$store.state.loggedIn;
		},
		homeRoute() {
			return this.loggedIn ?
				{ name: 'dashboard' } :
				{ name: 'login' };
		},
	},
};
</script>
