// Initialize Firebase

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "XXX",
    authDomain: "XXX",
    databaseURL: "XXX",
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX"
});

export const db = firebaseApp.database();
export const postsRef = db.ref('stats');
