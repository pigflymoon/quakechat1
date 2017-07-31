import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';

import {NavigationActions} from 'react-navigation';

import firebaseApp from '../config/FirebaseConfig';

import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedInfo from '../components/AnimatedInfo';
import colors from '../styles/colors';
import chat from '../styles/chat';

import NetInfoChecking from '../utils/NetInfoChecking';

export default class SignIn extends Component {
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
        };
        // console.log('sign in this.props);',this.props);
    }



    // shouldComponentUpdate(nextProps, nextState) {
    //     var isConnected = nextProps.isConnected;//update netinfo
    //     // console.log('sign in isConnected',isConnected)
    //     if (isConnected) {
    //         this.setState({isConnected: isConnected});
    //         return true;
    //     }
    //     return false;
    // }


    handleSignUp = () => {
        // const {navigate} = this.props.navigation;
        // navigate('SignUp', {});
        this.props.navigation.navigate('SignUp', {});

        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'SignUp',
        //     params: {},
        // });
        // this.props.navigation.dispatch(navigateAction);
    }

    handleSignIn = (e) => {
        var self = this;
        e.preventDefault()
        // console.log(' signin connected',this.props.isConnected)

        // if (this.props.screenProps) {
            console.log(' signin is connected')

            if (!this.state.email) {
                this.setState({
                    showInfo: true
                });
            }

            firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(function (user) {
                    firebaseApp.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            console.log('sign in user is ');
                            console.log(user);
                            // Actions.chat();
                            // console.log(self.props)
                            // self.props.navigation.navigate('ChatRoom', { name: user.displayName });
                            const navigateAction = NavigationActions.navigate({
                                routeName: 'ChatRoom',
                                params: {},
                            });
                            console.log('props.navigation sign in')
                            console.log(self.props.navigation)
                            self.props.navigation.dispatch(navigateAction);
                        } else {
                            console.log('go to sign in')
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
        // }


    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    setPassword = (text) => {
        this.setState({password: text});
    }

    handleResetPassword = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ResetPassword',
            params: {},
        });
        this.props.navigation.dispatch(navigateAction);
    }

    handleInfo = (showInfo) => {
        console.log('showinfo')
        this.setState({
            showInfo: showInfo
        })
    }

    render() {
        return (
            <View style={chat.container}>

                <View style={chat.background} resizeMode="cover">
                    <View style={chat.markWrap}>
                        <View style={chat.circleIcon}>
                            <Icon name="sign-in" size={75} color={colors.primary1}/>
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
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignIn}>
                            <View style={chat.button}>
                                <Text style={chat.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                    <View style={chat.container}>
                        <View style={chat.footerWrap}>

                            <Text style={chat.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignUp}>
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
