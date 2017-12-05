<template>
	<section class="section section--profile" v-if="user">
		<p>
			<img :src="user.photoURL" :alt="user.displayName" width="150">
		</p>

		<div v-for="provider in user.providerData" :key="provider['.key']">
			<h3>{{ provider.providerId }}</h3>
			<p>
				<strong>Provider-specific UID:</strong> {{ provider.uid }}<br>
				<strong>Name:</strong> {{ provider.displayName }}<br>
				<strong>Email:</strong> {{ provider.email }}<br>
			</p>
		</div>

		<pre style="display: none">{{ user }}</pre>
	</section>
</template>

<script>
	import firebase from 'firebase';
	import toastr from 'toastr';

	export default {
		name: 'profile',
		data() {
			return {
				user: null,
			}
		},
		beforeCreate: function() {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					this.user = user;
				}
			})
		},
		methods: {
			// Logout
			logout() {
				firebase.auth().signOut().then(() => {
					this.$router.replace('login');
					toastr.success('You have been logged out.')
				}).catch(err => {
					toastr.error(err.message);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.section--profile {
		padding: 1rem;
		text-align: center;
	}
</style>
