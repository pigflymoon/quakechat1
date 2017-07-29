import React, {Component} from 'react';
import {View} from 'react-native';
// import {Actions} from 'react-native-router-flux';
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase';  // Initialize Firebase
import firebaseApp from '../config/FirebaseConfig';

import {GiftedChat} from 'react-native-gifted-chat';

export default class ChatGroup extends Component {
    uid = '';
    messagesRef = null;

    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            messages: [],
            names: []
        };
    }

    componentWillMount() {


    }


    setUid = (value) => {
        this.uid = value;
    }

    getUid = () => {
        return this.uid;
    }

    setName = (value) => {
        this.displayName = value;
    }

    getName = () => {
        return this.displayName;
    }

    loadMessages(callback) {
        this.messagesRef = firebaseApp.database().ref('messages');
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

    sendMessage(message) {
        // console.log('messsage',message)
            for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    componentDidMount() {
        // console.log('chat group called')
        //


        // var user = firebase.auth().currentUser;
        // console.log('*******in Chat Group ********* and current user is ', user)
        // if (user) {
        //     console.log('hi user',user)
        //     this.setUid(user.uid);
        //     this.setName(user.displayName);
        // } else {
        //     console.log('*******todo')
        //     const resetAction = NavigationActions.reset({
        //         index: 0,
        //         actions: [
        //             NavigationActions.navigate({ routeName: 'SignIn'})
        //         ]
        //     })
        //     this.props.navigation.dispatch(resetAction);
        // }
        //
        this.setState({
            signin: true
        });

        this.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });

    }


    componentWillUnmount() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    this.sendMessage(message);
                }}
                user={{
                    _id: this.getUid(),
                    name: this.getName()
                }}
            />


        );
    }


}

ChatGroup.defaultProps = {
    name: 'John Smith',
};

ChatGroup.propTypes = {
    name: React.PropTypes.string,
};
