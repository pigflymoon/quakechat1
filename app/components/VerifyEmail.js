import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
import NetInfoChecking from '../utils/NetInfoChecking';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import chat from '../styles/chat';

export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            isLoading: false,
            user: this.props.user,
            isConnected: false,

        };
    }

    connectChecking = (isConnected) => {
        this.setState({isConnected: isConnected});
    }


    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextState.isConnected;
        if (isConnected) {
            return true;
        }
        return false;
    }


    handleVerifyEmail = () => {
        let interval = null;
        var self = this;
        var user = this.state.user
        if (this.state.isConnected) {
            user.sendEmailVerification().then(
                // setTimeout(
                () => {
                    self.setState({
                        isLoading: true
                    });

                    interval = setInterval(() => {
                        console.log('interval called?', user)
                        console.log('user.emailVerified?', user.emailVerified);
                        user.reload().then(
                            () => {
                                console.log('sign up user', user);
                                if (interval && user.emailVerified) {
                                    clearInterval(interval);
                                    interval = null;

                                    console.log('email sent');

                                    firebaseApp.auth().onAuthStateChanged((user) => {
                                        self.setState({
                                            isLoading: false
                                        });
                                        console.log('to sign in? user', user)
                                        if (user && user.emailVerified) {
                                            console.log('auth state changed user emailVerified', user.emailVerified);
                                            Actions.chat({name: self.state.name});
                                            clearInterval(interval);
                                            interval = null;
                                        } else {
                                            self.setState({
                                                isLoading: false
                                            });
                                        }
                                    });

                                } else {
                                    self.setState({
                                        isLoading: false
                                    });
                                }
                            }, error => {
                                if (interval) {
                                    clearInterval(interval);
                                    interval = null;
                                    console.log('interval registerUserAndWaitEmailVerification: reload failed ! ' + error.message + ' (' + error.code + ')');

                                }
                            }
                        );
                    }, 1000 * 30);

                }, error => {
                    console.log('registerUserAndWaitEmailVerification: sendEmailVerification failed ! ' + error.message + ' (' + error.code + ')');

                })
        }

    }

    render() {
        return (

            <View style={chat.container}>
                <NetInfoChecking connectCheck={this.connectChecking}/>

                {this.state.isLoading ? (
                        <View style={chat.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                    ) : (
                        <View style={chat.background}>
                            <View style={[chat.markWrap]}>
                                <View style={chat.circleIcon}>
                                    <Icon name="envelope" size={75} color={colors.primary1} style={[chat.mark]}/>
                                </View>

                            </View>
                            <View style={chat.wrapper}>
                                <View style={chat.inputWrap}>
                                    <View style={chat.iconWrap}>
                                        <Icon name="envelope-o" size={20} style={chat.icon}/>
                                    </View>
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor={colors.white}
                                        style={chat.input}
                                        onChangeText={(text) => this.setEmail(text)}
                                        value={this.props.email}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={.5} onPress={this.handleVerifyEmail}>
                                    <View style={chat.button}>
                                        <Text style={chat.buttonText}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
            </View>
        );
    }
}
