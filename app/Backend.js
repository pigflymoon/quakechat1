import firebase from 'firebase';

class Backend {
    uid = '';
    messagesRef = null;
    // initialize Firebase Backend
    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB9fwkkRNv_iorCojjim82_p7G_oUlE3eM',
            authDomain: 'geochat-cc681.firebaseapp.com',
            databaseURL: 'https://geochat-cc681.firebaseio.com',
            storageBucket: 'geochat-cc681.appspot.com',
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
            } else {
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message);
                });
            }
        });

    }

    setUid(value) {
        this.uid = value;
    }

    getUid() {
        return this.uid;
    }


    // retrieve the messages from the Backend
    loadMessages(callback) {
        this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    // send the message to the Backend
    sendMessage(message) {

        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    signup(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error, userData) {
            // Handle Errors here.
            if (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        alert("there already exists an account with the given email address.");
                        break;
                    case "auth/invalid-email":
                        alert("The email address is not valid");
                        break;
                    case "auth/operation-not-allowed":
                        alert("email/password accounts are not enabled");
                        break;
                    case "auth/weak-password":
                        alert("the password is not strong enough.");
                        break;

                    default:
                        alert("Error creating user:");
                }

            } else {
                alert('Your account was created!');
            }


            // ...
        });

    }

    signin(email, password,callback) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                callback(user);
                return user;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                switch(errorCode){
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        return(errorMessage);
                        break;
                    default:
                        // alert('Please try again');
                        return 'try again';

                }
            });
    }

    // Signs out the current user.
    signout() {
        firebase.auth().signOut();
    }

    // close the connection to the Backend
    /**
     * Calling off() on a parent listener will not automatically remove listeners registered on child nodes,
     * off() must also be called on any child listeners to remove the callback.
     */
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default new Backend();
