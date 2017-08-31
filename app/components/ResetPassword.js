import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import chat from '../styles/chat';
import AnimatedInfo from './AnimatedInfo';
import utils from '../utils/utils';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            showInfo: false,
            isConnected: false,

        };
    }

    // componentWillReceiveProps(nextProps) {
    //     var isConnected = nextProps.isConnected;//update netinfo
    //     this.setState({isConnected: isConnected});
    // }

    setEmail = (text) => {
        this.setState({email: text});
    }

    handleSignup = () => {
        Actions.signup();
    }

    handleResetPassword = () => {
        // if (this.props.isConnected) {
        if (!this.state.email) {
            this.setState({
                showInfo: true
            });
        } else {
            var auth = firebase.auth();
            var emailAddress = this.state.email;
            auth.sendPasswordResetEmail(emailAddress).then(function () {
                // Email sent.
                utils.infoAlert('Success', `Reset password sent to the emailAddress,please check your email ${emailAddress}`);
                Actions.signin();
            }, function (error) {
                // An error happened.
                utils.showError(error);

            });
        }

        // }


    }

    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }

    render() {
        return (
            <View style={chat.container}>

                <View style={chat.background}>
                    <View style={[chat.markWrap]}>
                        <View style={chat.circleIcon}>
                            <Icon name="pencil" size={75} color={colors.primary1} style={[chat.mark]}/>
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
                                value={this.state.email}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleResetPassword}>
                            <View style={chat.button}>
                                <Text style={chat.buttonText}>Rest Password</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={chat.container}>
                        <View style={chat.footerWrap}>
                            <Text style={chat.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignup}>
                                <View>
                                    <Text style={chat.linkText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={chat.infoWrapper}>
                        {this.state.showInfo ?
                            <AnimatedInfo showInfo={this.handleInfo}>
                                <Text style={chat.infoText}>Reset password fail, please try again.</Text>
                            </AnimatedInfo>
                            : null}
                    </View>

                </View>
            </View>
        );
    }
}
