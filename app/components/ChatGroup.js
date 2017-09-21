import React, {Component} from 'react';
import {View, Platform, Dimensions, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';

import CustomActions from './CustomActions';
import CustomView from './CustomView';
import firebase from 'firebase';  // Initialize Firebase
import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
import {GiftedChat, Actions as ChatActions, Bubble} from 'react-native-gifted-chat';


// const Blob = RNFetchBlob.polyfill.Blob
// // const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob
const {fs} = RNFetchBlob

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
            isConnected: true,

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

    // componentWillReceiveProps(nextProps) {
    //     var isConnected = nextProps.isConnected;//update netinfo
    //     console.log('will chatgroup  is ?',isConnected)
    //     this.setState({isConnected: isConnected});
    // }

    uploadImage = (uri, imageName, mime = 'image/jpg') => {
        return new Promise((resolve, reject) => {
            // const uploadUri = Platform.OS === 'ios' ? uri.replace('', '') : uri;
            // console.log('uploadUrl', uploadUri)//asset/asset.JPG?id=ED7AC36B-A150-4C3assets-library://8-BB8C-B6D696F4F2ED&ext=JPG
            let uploadBlob = null
            const imageRef = firebaseApp.database().ref('messages').child(imageName);
            var uploadUri = RNFetchBlob.wrap("assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG");
            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    console.log('data', data)
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                // .then((blob) => {
                //     uploadBlob = blob
                //     return imageRef.put(blob, {contentType: mime})
                // })
                // .then(() => {
                //     uploadBlob.close()
                //     return imageRef.getDownloadURL()
                // })
                // .then((url) => {
                //     resolve(url)
                // })
                .catch((error) => {
                    reject(error)
                })
        })
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

    renderMessageImage = (props) => {
        return (
            <View>

                <Image
                    source={{uri: props.currentMessage.image}}
                    style={{
                        width: 250,
                        height: 150,
                        borderRadius: 13,
                        margin: 3,
                        resizeMode: 'cover',
                    }}
                />

            </View>
        )
    }

    loadMessages(callback) {
        this.messagesRef = firebaseApp.database().ref('messages');
        this.messagesRef.off();
        var image = "assets-library://asset/asset.JPG?id=B84E8479-475C-4727-A4A4-B77AA9980897&ext=JPG";

        // RNFetchBlob.fs.readFile(image, 'base64')
        //     .then((data) => {
        //         console.log(data)
        //     })

        RNFetchBlob.fs.exists(image)
            .then((exist) => {
                console.log(`file ${exist ? '' : 'not'} exists`)
            })
            .catch(() => {
                console.log('error')
            })

        // RNFetchBlob.fs.readStream(image, 'base64')
        //     .then((stream) => {
        //         let data = ''
        //         stream.open()
        //         stream.onData((chunk) => {
        //             data += chunk
        //         })
        //         stream.onEnd(() => {
        //             console.log(data)
        //         })
        //     }).catch(() => {
        //     console.log('read error')
        // })
        RNFetchBlob.fs.readFile(image, 'base64')
            .then((data) => {
                console.log('image',data)
            }).catch(() => {
            console.log('read error')
        });
        let path = fs.asset(image)
        console.log('path', path)
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
                renderBubble={this.renderBubble}
                renderCustomView={this.renderCustomView}
                renderMessageImage={this.renderMessageImage}
            />
        );
    }

}
