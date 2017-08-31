import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
import utils from '../utils/utils';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import chat from '../styles/chat';
let interval = null;
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

    // componentWillReceiveProps(nextProps) {
    //     var isConnected = nextProps.isConnected;//update netinfo
    //     this.setState({isConnected: isConnected});
    // }
    //
    handleVerifyEmail = (e) => {
        var self = this;
        var user = this.state.user
        e.preventDefault();
        // if (this.props.isConnected) {
            user.sendEmailVerification().then(
                // setTimeout(
                () => {
                    self.setState({
                        isLoading: true
                    });

                    interval = setInterval(() => {
                        user.reload().then(
                            () => {
                                if (interval && user.emailVerified) {
                                    clearInterval(interval);
                                    interval = null;

                                    firebaseApp.auth().onAuthStateChanged((user) => {
                                        self.setState({
                                            isLoading: false
                                        });
                                        clearInterval(interval);
                                        if (user && user.emailVerified) {
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
        // } else {
        //     utils.netWorkError();
        // }

    }

    componentWillUnmount() {
        interval && clearInterval(interval);
    }

    render() {
        return (

            <View style={chat.container}>

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
                            <View style={[chat.wrapper, chat.verifyWrapper]}>
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
