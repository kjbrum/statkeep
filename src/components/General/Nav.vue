<template>
	<nav class="nav" v-if="user">
		<ul class="list--plain list--inline nav__link-list">
			<li class="nav__link">
				<router-link to="/dashboard">
					<i class="fa fa-tachometer"></i>
					<span class="hide-vis">Dashboard</span>
				</router-link>
			</li>

			<li class="nav__link">
				<router-link to="/profile">
					<i class="fa fa-user"></i>
					<span class="hide-vis">Profile</span>
				</router-link>
			</li>

			<li class="nav__link">
				<a href="#" @click="logout">
					<i class="fa fa-sign-out"></i>
					<span class="hide-vis">Logout</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
	import firebase from 'firebase';
	import toastr from 'toastr';

	export default {
		name: 'nav',
		data() {
			return {
				user: null
			}
		},
		beforeCreate() {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.user = user;
				}
			})
        },
        computed: {
            title() {
                return this.$route.meta.title;
            }
        },
		methods: {
			// Logout
			logout() {
				firebase.auth().signOut().then(() => {
                    this.user = null;
					this.$router.replace('login');
					toastr.success('You have been logged out.');
				}).catch((err) => {
					toastr.error(err.message);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/settings";

	.nav {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);

		.nav__link {
			margin-left: 1rem;

			a {
				color: $gray;
				font-size: 2rem;

				&.router-link-active {
					color: $primary;
				}
			}
		}
	}
</style>
