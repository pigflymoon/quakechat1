import React, {Component} from 'react';
import {View, Platform, Dimensions, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {GiftedChat, Actions as ChatActions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import firebase from 'firebase';  // Initialize Firebase
import firebaseApp from '../config/FirebaseConfig';
import Utils from '../utils/utils';

const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;

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
            names: [],
            isConnected: false,

        };
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
            <ChatActions
                {...props}
                options={options}
            />
        );
    }

    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }


    renderCustomView = (props) => {
        return (
            <CustomView
                {...props}
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
                text: message.text || '',
                image: message.image || '',
                location: message.location || '',
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
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text || '',
                image: message[i].image || '',
                location: message[i].location || '',
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });

        }
    }

    componentWillMount() {
        var isConnected = this.props.screenProps;
        console.log('isConnected will mount chat group',isConnected)
        var user = firebase.auth().currentUser;
        console.log('user', user)
        if (user) {
            this.setUid(user.uid);
            this.setName(user.displayName);
        } else {
            console.log('user is not signed in', user)
            Actions.signin();
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

    componentWillReceiveProps(nextProps) {
        console.log('ChatGroup nextprops in ', nextProps)

        var isConnected = nextProps.screenProps;//update netinfo
        this.setState({isConnected: isConnected});
    }

    componentWillUnmount() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }

    render() {

        // if (!isConnected) {
        //     return Utils.renderOffline();
        // }
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
                renderBubble={this.renderBubble}
                renderCustomView={this.renderCustomView}

            />
        );
    }

}
