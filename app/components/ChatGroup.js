import React, {Component} from 'react';
import {View, Platform,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CustomActions from './CustomActions';

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
        var user = firebase.auth().currentUser;
        if (user) {
            this.setUid(user.uid);
            this.setName(user.displayName);
        } else {
            Actions.signin();
        }
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

    renderCustomActions = (props) => {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {
            },
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }


    loadMessages(callback) {
        this.messagesRef = firebaseApp.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text|'',
                image: message.image||'',
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
            console.log('message', message)
            this.messagesRef.push({
                text: message[i].text||'',
                image: message[i].image||'',
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    componentDidMount() {
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
                renderActions={this.renderCustomActions}
            />
        );
    }

}
