import React, {Component} from 'react';
import {View, Platform, Dimensions, Image, Text} from 'react-native';
import {GiftedChat, Actions as ChatActions, Bubble} from 'react-native-gifted-chat';
import {Icon} from 'react-native-elements';

import CustomActions from '../components/CustomActions';
import CustomView from '../components/CustomView';
import firebase from 'firebase';  // Initialize Firebase
import RNFetchBlob from 'react-native-fetch-blob';

import firebaseApp from '../config/FirebaseConfig';
import Utils from '../utils/utils';
import colors from '../styles/colors';
import navigationStyle from '../styles/navigation';
import chat from '../styles/chat';

const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;

export default class Chat extends Component {
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
            loadEarlier: true,
            typingText: null,
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

    renderCustomAvatar = (props) => {
        return (
            <View style={chat.avatarContainer}>
                <Icon name="account-circle" size={40} color={colors.grey2} style={chat.avatarStyle}/>
                <Text style={chat.userNameStyle}>{props.user.name}</Text>
            </View>
        )
    }

    loadMessages(callback) {
        this.messagesRef = firebaseApp.database().ref('messages');
        this.messagesRef.off();

        const onReceive = (data) => {
            const message = data.val();

            callback({
                _id: data.key,
                text: message.text || '',
                location: message.location || '',
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                },
                ...(message.image) && {image: message.image}
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    guid = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    }


    getSelectedImages = (message) => {
        var self = this;
        const image = message.image;

        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        let uploadBlob = null;
        var uuid = this.guid();
        const imageRef = firebaseApp.storage().ref('images').child('image' + uuid);
        // imagesRef = imageRef.child('image');
        let mime = 'image/jpg'
        fs.readFile(image, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, {contentType: mime})
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                // URL of the image uploaded on Firebase storage
                console.log(url);
                self.messagesRef.push({
                    text: message.text || '',
                    image: url,
                    location: message.location || '',
                    user: message.user,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                });

            })
            .catch((error) => {
                console.log(error);

            })

    }

    sendMessage(message) {

        for (let i = 0; i < message.length; i++) {

            if (message[i].image) {
                this.getSelectedImages(message[i]);
            } else {
                this.messagesRef.push({
                    text: message[i].text || '',
                    location: message[i].location || '',
                    user: message[i].user,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                });
            }

        }

    }


    componentWillMount() {
        var isConnected = this.props.isConnected;
        // console.log('isConnected will mount chat group',isConnected)
        var user = firebase.auth().currentUser;
        // console.log('user', user)
        if (user) {
            this.setUid(user.uid);
            this.setName(user.displayName);
        } else {
            // console.log('user is not signed in', user)

            this.props.navigation.navigate('Signin');

        }
    }

    componentDidMount() {
        this.setState({
            signin: true
        });
        this.loadMessages((message) => {

            this.setState((previousState) => {
                console.log('message', message)
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
                loadEarlier={this.state.loadEarlier}
                user={{
                    _id: this.getUid(),
                    name: this.getName()
                }}
                showUserAvatar={true}
                renderAvatarOnTop={true}
                renderActions={this.renderCustomActions}
                renderBubble={this.renderBubble}
                renderCustomView={this.renderCustomView}
                renderAvatar={this.renderCustomAvatar}
            />
        );
    }

}
Chat.navigationOptions = props => {

    return {
        // Render a button on the right side of the header.
        headerRight: (
            <View style={navigationStyle.rightContainer}>
                <Icon name="settings" size={28} color={colors.primary1} style={navigationStyle.rightTitle}
                      onPress={() => {
                          props.navigation.navigate('Edit')
                      }}
                />
                <Icon name="exit-to-app" size={28} color={colors.primary1} style={navigationStyle.rightTitle}
                      onPress={() => {
                          props.navigation.navigate('Signin')
                      }}
                />
            </View>


        ),
    };
};