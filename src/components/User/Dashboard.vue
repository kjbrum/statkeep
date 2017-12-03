<template>
	<section class="section section--dashboard">
		<div class="stats">
			<div class="stat" v-for="stat of stats" :key="stat['.key']">
				<!-- Edit Stat -->
				<template v-if="stat.isEditing">
					<div class="stat__content">
						<input type="text" placeholder="Name" v-model="stat.name" @keyup.enter="addStat">
						<input type="number" placeholder="Count" v-model="stat.count" @keyup.enter="addStat">
					</div>

					<div class="stat__actions">
						<div @click="updateStat(stat)" class="stat__save">Save</div>
						<div @click="toggleEditStat(stat)" class="stat__cancel">Cancel</div>
					</div>
				</template>

				<!-- Display Stat -->
				<template v-else>
					<div class="stat__content">
						<div class="stat__name">{{ stat.name }}</div>
						<div class="stat__count">{{ stat.count }}</div>
					</div>

					<div class="stat__actions">
						<div @click="removeStat(stat)" class="stat__remove"><i class="fa fa-close"></i></div>
						<div @click="toggleEditStat(stat)" class="stat__edit"><i class="fa fa-pencil"></i></div>
					</div>
				</template>
			</div>

			<div class="stat__add">
				<input type="text" placeholder="Name" v-model="newStat.name" @keyup.enter="addStat">
				<input type="number" placeholder="Count" v-model="newStat.count" @keyup.enter="addStat">
				<div @click="addStat">Add</div>
			</div>
		</div>
	</section>
</template>

<script>
	import firebase from 'firebase';
	import { db, statsRef } from '@/helpers/firebase';
	import toastr from 'toastr';

	export default {
		name: 'dashboard',
		data() {
			return {
				user: null,
				stats: null,
				newStat: {
					name: '',
					count: '',
					isEditing: false
				}
			}
		},
		beforeCreate() {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.user = user;
					this.$bindAsArray('stats', db.ref(`stats/${user.uid}`));
				}
			})
		},
		methods: {
			// Add a new post
			addStat() {
				this.$firebaseRefs.stats.push({
					name: this.newStat.name,
					count: this.newStat.count,
					isEditing: false
				}).then(() => {
					this.newStat = {
						name: '',
						count: '',
						isEditing: false
					};
					toastr.success('Stat added successfully.');
				});
			},

			// Toggle editing a stat
			toggleEditStat(stat) {
				this.$firebaseRefs.stats.child(stat['.key']).update({
					isEditing: !stat.isEditing
				});
			},

			// Remove a stat
			removeStat(stat) {
				if (confirm(`Are you sure you want to remove "${stat.name}"?`)) {
					this.$firebaseRefs.stats.child(stat['.key']).remove().then(() => {
						toastr.error('Stat removed successfully.');
					});
				}
			},

			// Update a stat
			updateStat(stat) {
				this.$firebaseRefs.stats.child(stat['.key']).set({
					name: stat.name,
					count: stat.count,
					isEditing: false
				}).then(() => {
					toastr.success('Stat updated successfully.');
				});
			},

			// Logout
			logout() {
				firebase.auth().signOut().then(() => {
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

	.container {
		padding: 0;
	}

	.stat {
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
		border-bottom: 1px solid $black;
		@include r-font-size(0.7rem, 3rem);
	}

	.stat__content,
	.stat__name,
	.stat__count,
	.stat__actions,
	.stat__remove,
	.stat__edit {
		float: left;
	}

	.stat__name,
	.stat__count {
		padding: 0 1rem;
	}

	.stat__content {
		// overflow: hidden;
		display: flex;
		align-items: center;
		float: left;
		width: 85%;
		padding: 1rem 0;
	}

	.stat__name {
		width: 75%;
		line-height: 1;
	}

	.stat__count {
		width: 25%;
	}

	.stat__count {
		text-align: right;
	}

	.stat__actions {
		width: 15%;
		text-align: center;

		.stat__remove,
		.stat__edit {
			width: 50%;
			padding: 1rem 0;
		}
	}
</style>
