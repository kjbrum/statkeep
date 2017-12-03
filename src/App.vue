<template>
	<div id="app">
		<v-header></v-header>
		<router-view/>
	</div>
</template>

<script>
	import Header from '@/components/General/Header'

	export default {
		name: 'app',
		components: {
			'v-header': Header
		}
	}
</script>

<style lang="scss">
	@import 'src/assets/scss/style';
</style>
