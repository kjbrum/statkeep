<template>
	<section class="section section--login">
		<ul class="list--plain list--inline">
			<li><button class="btn btn--outline twitter" @click="login('twitter')">Twitter</button></li>
			<li><button class="btn btn--outline github" @click="login('github')">Github</button></li>
			<li><button class="btn btn--outline google" @click="login('google')">Google</button></li>
			<li><button class="btn btn--outline facebook" @click="login('facebook')">Facebook</button></li>
		</ul>
	</section>
</template>

<script>
	import firebase from 'firebase';
	import toastr from 'toastr';

	export default {
		name: 'login',
		data() {
			return {
				provider: {},
			}
		},
		methods: {
			login(name) {
				switch (name) {
					case 'twitter':
						this.provider = new firebase.auth.TwitterAuthProvider();
						break;
					case 'github':
						this.provider = new firebase.auth.GithubAuthProvider();
						break;
					case 'google':
						this.provider = new firebase.auth.GoogleAuthProvider();
						break;
					case 'facebook':
						this.provider = new firebase.auth.FacebookAuthProvider();
						break;
				}

				firebase.auth().signInWithPopup(this.provider).then(result => {
					toastr.success('You have been logged in.');
					this.$router.replace('dashboard');
				}).catch(err => {
					toastr.error(err.message);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "src/assets/scss/settings";

	.section--login {
		padding: 1rem;
		text-align: center;

		ul {
			display: inline-block;
		}
	}

	.btn {
		&.twitter { color: $twitter; }
		&.github { color: $github; }
		&.google { color: $google; }
		&.facebook { color: $facebook; }
	}
</style>
