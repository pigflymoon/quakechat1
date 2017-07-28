import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
// import {Router, Scene} from 'react-native-router-flux';
// import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';  // Initialize Firebase
import firebaseApp from '../config/FirebaseConfig';

import Signin from '../screens/Signin';
// import Signup from '../components/Signup';
import ChatGroup from '../screens/ChatGroup';
// import VerifyEmail from '../components/VerifyEmail';
// import ResetPassword from '../components/ResetPassword';

import chat from '../styles/chat';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        console.log('chat this.props);',this.props);

    }

    signout = () => {
        firebaseApp.auth().signOut().then(function () {
            // Actions.signin();
        }).catch(function (error) {
            console.log('sign out error', error);
        })
    }

    render() {
        var user = firebase.auth().currentUser;
        if (user) {
            return (<ChatGroup navigation={this.props.navigation} screenProps={this.props.screenProps} />)
        } else {
            return <Signin navigation={this.props.navigation} screenProps={this.props.screenProps} />
        }

    }
}
