import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    Animated,
    Easing,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';

import Icon from 'react-native-vector-icons/FontAwesome';
import Fade from './Fade';
import colors from '../styles/colors';
import chat from '../styles/chat';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            names: [],
            showInfo: false,
        };


    }


    signup = () => {
        Actions.signup();
    }

    handleSignin = (e) => {
        var self = this;
        e.preventDefault()
        if (!this.state.email) {
            this.setState({
                showInfo: true
            });
        }

        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (user) {
                firebaseApp.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log('********** In Sign in moudle********* ', user, ' is signed in');
                        Actions.chat();
                    } else {
                        console.log('error')
                    }
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        self.setState({
                            showInfo: true
                        });
                        break;
                    default:
                        self.setState({
                            showInfo: true
                        });


                }

                console.log(error);
            });


    }

    setEmail = (text) => {
        this.setState({email: text});
    }


    setPassword = (text) => {
        this.setState({password: text});
    }

    handleResetPassword = () => {
        Actions.resetPassword();

    }
    removeInfo = () => {
        console.log('called')
        this.setState({
            showInfo: false,
        });

    }

    render() {
        return (
            <View style={chat.container}>
                <View style={chat.background} resizeMode="cover">
                    <View style={chat.markWrap}>
                        <View style={chat.circleIcon}>
                            <Icon name="sign-in" size={75} color={colors.primary1} />
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
                        <View style={chat.inputWrap}>
                            <View style={chat.iconWrap}>
                                <Icon name="lock" size={25} style={chat.icon}/>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.white}
                                placeholder="Password"
                                style={chat.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleResetPassword}>
                            <View>
                                <Text style={chat.forgotPasswordText}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                            <View style={chat.button}>
                                <Text style={chat.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                    <View style={chat.container}>
                        <View style={chat.footerWrap}>

                            <Text style={chat.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.signup}>
                                <View>
                                    <Text style={chat.linkText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={chat.infoWrapper}>

                        {this.state.showInfo ?
                            <TouchableOpacity activeOpacity={.5} onPress={this.removeInfo}>

                                <Fade>
                                    <Text style={chat.infoText}>Sign in fail, please try again.</Text>
                                </Fade>
                            </TouchableOpacity> : null}

                    </View>


                </View>
            </View>
        );
    }
}
