<template>
	<section class="section section--dashboard">
		<div class="stats">
			<div :class="['stat', { 'stat--editing': stat.isEditing } ]" v-for="stat of stats" :key="stat['.key']">
				<!-- Display Stat -->
				<div class="stat__content">
					<div class="stat__name">{{ stat.name }}</div>
					<div class="stat__count">
						<div class="decrease" @click="decreaseCount(stat)"><i class="fa fa-minus"></i></div>
						{{ stat.count }}
						<div class="increase" @click="increaseCount(stat)"><i class="fa fa-plus"></i></div>
					</div>
				</div>

				<div class="stat__actions">
					<div @click="removeStat(stat)" class="stat__remove">
						<i class="fa fa-trash-o"></i>
						<span class="hide-vis">Remove</span>
					</div>
				</div>
			</div>

			<div class="stat stat--form">
				<div class="stat__content">
					<div class="input--name">
						<input type="text" placeholder="Name" v-model="newStat.name" @keyup.enter="addStat">
					</div>
				</div>

				<div class="stat__actions">
					<div @click="addStat" class="stat__add">
						<i class="fa fa-plus"></i>
						<span class="hide-vis">Add</span>
					</div>
				</div>
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
				if (this.newStat.name) {
					this.$firebaseRefs.stats.push({
						name: this.newStat.name,
						count: 0,
						isEditing: false
					}).then(() => {
						this.newStat = {
							name: '',
							count: '',
							isEditing: false
						};
						toastr.success('Stat added successfully.', {timeOut: 500000});
					});
				}
			},

			// Toggle editing a stat
			// toggleEditStat(stat) {
			// 	this.$firebaseRefs.stats.child(stat['.key']).update({
			// 		isEditing: !stat.isEditing
			// 	});
			// },

			// Remove a stat
			removeStat(stat) {
				if (confirm(`Are you sure you want to remove "${stat.name}"?`)) {
					this.$firebaseRefs.stats.child(stat['.key']).remove().then(() => {
						toastr.error('Stat removed successfully.', {timeOut: 500000});
					});
				}
			},

			// Update a stat
			// updateStat(stat) {
			// 	this.$firebaseRefs.stats.child(stat['.key']).set({
			// 		name: stat.name,
			// 		count: stat.count,
			// 		isEditing: false
			// 	}).then(() => {
			// 		toastr.success('Stat updated successfully.');
			// 	});
			// },

			// Increase a stat's count
			increaseCount(stat) {
				this.$firebaseRefs.stats.child(stat['.key']).update({
					count: stat.count + 1
				});
			},

			// Decrease a stat's count
			decreaseCount(stat) {
				this.$firebaseRefs.stats.child(stat['.key']).update({
					count: stat.count - 1
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
		border-bottom: 1px solid $black;
		@include r-font-size(0.7rem, 3rem);

		@include bp(xs-max) {
			text-align: center;
		}

		@include bp(s) {
			display: flex;
			align-items: center;
		}
	}

	.stat__content {
		width: 100%;
		padding: 1rem;

		@include bp(s) {
			display: flex;
			align-items: center;
		}
	}

	.stat__name {
		line-height: 1;

		@include bp(xs-max) {
			margin-bottom: 1.5rem;
			font-weight: bold;
		}

		@include bp(s) {
			width: 60%;
			padding-right: 1rem;
		}
	}

	.stat__count {
		$size: 40px;
		position: relative;
		text-align: center;
		line-height: $size;
		padding: 0 ($size + 5px);

		@include bp(s) {
			width: 40%;
		}

		@include bp(m) {
			width: 30%;
		}

		.decrease,
		.increase {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			font-size: 1.2rem;
			width: $size;
			height: $size;
			background-color: $gray-ultralight;
			border-radius: 100%;
			color: $black;
			line-height: $size;
		}

		.decrease {
			left: 0;
		}

		.increase {
			right: 0;
		}
	}

	.stat__actions {
		text-align: center;

		@include bp(xs-max) {
			display: inline-block;
			display: none;
		}

		@include bp(s) {
			width: 80px;
		}

		> div {
			padding: 1rem;
		}
	}

	.stat--form {
		.stat__actions {
			@include bp(xs-max) {
				display: inline-block
			}
		}
	}

	.input--name {
		float: left;
		width: 100%;

		input {
			margin: 0;
			padding: 0;
			width: 100%;
			@include r-font-size(0.7rem, 3rem);
			border: none;
			outline: none;

			@include bp(xs-max) {
				text-align: center;
			}
		}
	}
</style>
