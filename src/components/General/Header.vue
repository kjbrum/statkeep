<template>
	<header class="header">
        <h1>
            <template v-if="user && title">
                {{ title }}
            </template>

            <template v-else>
                StatKeep 📝
            </template>
        </h1>

        <v-nav/>
	</header>
</template>

<script>
	import firebase from 'firebase';
    import Nav from '@/components/General/Nav';

	export default {
		name: 'header',
		components: {
			'v-nav': Nav
		},
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
		}
	}
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/settings";

    .header {
        position: relative;
        padding: 1rem;
        border-bottom: 1px solid $primary;
    }

    h1 {
        margin: 0;
        font-weight: bolder;
        font-size: 1.5rem;
        text-transform: uppercase;
    }
</style>
