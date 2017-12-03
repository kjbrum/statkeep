// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './helpers/firebase'
import firebase from 'firebase'
import VueFire from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueFire);

let vm;

firebase.auth().onAuthStateChanged((user) => {
    if (!vm) {
        vm = new Vue({
            el: '#app',
            router,
            template: '<App/>',
            components: { App }
        });
    }
});
