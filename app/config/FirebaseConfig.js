import firebase from 'firebase';  // Initialize Firebase
var fireBaseconfig = {
    apiKey: 'AIzaSyB9fwkkRNv_iorCojjim82_p7G_oUlE3eM',
    authDomain: 'geochat-cc681.firebaseapp.com',
    databaseURL: 'https://geochat-cc681.firebaseio.com',
    storageBucket: 'geochat-cc681.appspot.com',
};
var firebaseApp = firebase.initializeApp(fireBaseconfig);
export default firebaseApp