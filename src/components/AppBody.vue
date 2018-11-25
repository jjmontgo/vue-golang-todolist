<template>
	<div id="app-body-component">
		<div v-show="loadingData">
			<div class="loader" />
		</div>
		<div v-show="!loadingData">
			<router-view />
		</div>
	</div>
</template>

<style>
	#app-body-component {
		padding: 20px;

		.loader {
			position: absolute;
			left: 50%;
			top: 50%;
			z-index: 1;
			margin: -75px 0 0 -75px;
			border: 16px solid #f3f3f3; /* Light grey */
			border-top: 16px solid #3498db; /* Blue */
			border-radius: 50%;
			width: 120px;
			height: 120px;
			animation: spin 2s linear infinite;
		}

		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}
	}
</style>

<script>
export default {
	name: 'AppBody',
	computed: {
		loadingData() {
			return this.$store.state.loadingData;
		},
	},
};
</script>
