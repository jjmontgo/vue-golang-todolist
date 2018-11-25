<template>
	<div id="app">
		<header>
			<app-header title="Not so poopy" />
		</header>
		<main class="content">
			<app-body />
		</main>
		<footer>
			<app-footer />
		</footer>
	</div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppBody from './components/AppBody.vue';
import AppFooter from './components/AppFooter.vue';

export default {
	name: 'App',
	components: { AppHeader, AppBody, AppFooter }
};
</script>
