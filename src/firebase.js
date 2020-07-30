import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCVT-I_VfprE3jlyVEbV8ym0gljtacBby8",
    authDomain: "cookie-site-5a8b8.firebaseapp.com",
    databaseURL: "https://cookie-site-5a8b8.firebaseio.com",
    projectId: "cookie-site-5a8b8",
    storageBucket: "cookie-site-5a8b8.appspot.com",
    messagingSenderId: "652114808883",
    appId: "1:652114808883:web:5ddcd1a68834076d371346"
};

firebase.initializeApp(firebaseConfig);

export default firebase;