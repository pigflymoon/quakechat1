import firebase from 'firebase';  // Initialize Firebase
var fireBaseconfig = {
    apiKey: "AIzaSyCw3l2aclhS873v0GI-RchQNMDAyIM6YJw",
    authDomain: "quakechat-3317e.firebaseapp.com",
    databaseURL: "https://quakechat-3317e.firebaseio.com",
    storageBucket: "quakechat-3317e.appspot.com",
};
var firebaseApp = firebase.initializeApp(fireBaseconfig);

export default firebaseApp