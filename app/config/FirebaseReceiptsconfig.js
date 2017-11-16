import firebase from 'firebase';  // Initialize Firebase
var fireBaseconfig = {
    apiKey: "AIzaSyDGbGpQHMTYH-8_4NKCD4Oa9ldktUg4E8k",
    authDomain: "receipts-quakechat.firebaseapp.com",
    databaseURL: "https://receipts-quakechat.firebaseio.com",
    projectId: "receipts-quakechat",
    storageBucket: "receipts-quakechat.appspot.com",
    messagingSenderId: "75520124650"
};
var firebaseReceriptApp = firebase.initializeApp(fireBaseconfig,"other");

export default firebaseReceriptApp
