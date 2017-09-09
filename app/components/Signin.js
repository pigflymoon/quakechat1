import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get("screen");
import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';

import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedInfo from './AnimatedInfo';
import colors from '../styles/colors';
import chat from '../styles/chat';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            names: [],
            showInfo: false,
            isConnected: false,
            width: width,
            height: height,
            showIcon: true,
        };
    }

    signup = () => {
        Actions.signup();
    }

    handleSignin = (e) => {

        var self = this;
        e.preventDefault();
        // console.log('state',this.state.isConnected)

        // if (this.props.screenProps) {
        //     console.log('sign in isConnected')

        if (!this.state.email) {
            this.setState({
                showInfo: true
            });
        } else {
            firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(function (user) {
                    firebaseApp.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            Actions.chat();
                        } else {
                            console.log('error', user)
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
                    // utils.showError(errorMessage);
                    // console.log(error);
                });
        }


        // }
        // else {
        //     utils.netWorkError();
        // }


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

    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }

    handleRotate = () => {
        let {width, height} = Dimensions.get('screen');
        if (width > height) {
            this.setState({width: width, height: height, showIcon: false})
        } else {
            this.setState({width: width, height: height, showIcon: true})
        }
    }

    componentWillMount() {
        // Event Listener for orientation changes
        Dimensions.addEventListener('change', this.handleRotate);
    }
    componentDidMount() {
        let {width, height} = Dimensions.get('screen');
        if (this.state.width < width) {
            this.setState({width: width, height: height, showIcon: false});
        } else {
            this.setState({width: width, height: height, showIcon: true});
        }
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handleRotate);
    }

    render() {

        return (
            <View style={chat.container}>

                <View style={{width: this.state.width, height: this.state.height, backgroundColor: colors.white}}
                      resizeMode="cover">
                    {this.state.showIcon ?
                        <View style={chat.markWrap}>
                            <View style={chat.circleIcon}>
                                <Icon name="sign-in" size={75} color={colors.primary1}/>
                            </View>
                        </View> : null}
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
                            <AnimatedInfo showInfo={this.handleInfo}>
                                <Text style={chat.infoText}>Sign in fail, please try again.</Text>
                            </AnimatedInfo>
                            : null}
                    </View>

                </View>
            </View>
        );
    }
}
