import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("screen");

import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedInfo from './AnimatedInfo';
import colors from '../styles/colors';
import chat from '../styles/chat';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            isLoading: false,
            showInfo: false,
            isConnected: false,
            width: width,
            height: height,
        };
    }


    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;//update netinfo
        this.setState({isConnected: isConnected});
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     var isConnected = nextProps.isConnected;//from root scene props
    //     if (isConnected) {
    //         this.setState({isConnected: isConnected});
    //         return true;
    //     }
    //     return false;
    // }

    handleSignin = () => {
        Actions.signin();
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    setName = (text) => {
        this.setState({name: text});
    }

    setPassword = (text) => {
        this.setState({password: text});
    }

    registerUserAndWaitEmailVerification(email, password) {
        var self = this;
        console.log('sign up?')
        return new Promise(function (resolve, reject) {
            // let interval = null;
            console.log('new promise');
            firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(
                user => {
                    user.updateProfile({
                        displayName: self.state.name
                    });

                    Actions.verifyEmail({user: user, email: email});
                }, error => {
                    console.log('registerUserAndWaitEmailVerification: createUserWithEmailAndPassword failed ! ' + error.message + ' (' + error.code + ')');
                    reject(error);
                }
            );
        });
    }

    handleSignup = (e) => {
        e.preventDefault();
        console.log('hi sign up?')
        if (this.props.isConnected) {
            console.log('hi sign up')
            if (!this.state.email) {
                this.setState({
                    showInfo: true
                });
            } else if (!this.state.password) {
                this.setState({
                    showInfo: true
                });
            } else {

                this.registerUserAndWaitEmailVerification(this.state.email, this.state.password);
            }
        }

    }
    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }

    handleRotate = () => {
        let {width, height} = Dimensions.get('screen');
        this.setState({width: width, height: height});

    }
    componentWillMount() {
        // Event Listener for orientation changes
        Dimensions.addEventListener('change', this.handleRotate);
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
                    <View style={[chat.markWrap]}>
                        <View style={chat.circleIcon}>
                            <Icon name="user-plus" size={75} color={colors.primary1} style={[chat.mark]}/>
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
                                <Icon name="user" size={20} style={chat.icon}/>
                            </View>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={colors.white}
                                style={chat.input}
                                onChangeText={(text) => this.setName(text)}
                                value={this.state.name}
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

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignup}>
                            <View style={chat.button}>
                                <Text style={chat.buttonText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={chat.container}>
                        <View style={chat.footerWrap}>
                            <Text style={chat.accountText}>Already have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                                <View>
                                    <Text style={chat.linkText}>Sign In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={chat.infoWrapper}>
                        {this.state.showInfo ?
                            <AnimatedInfo showInfo={this.handleInfo}>
                                <Text style={chat.infoText}>Sign up fail, please try again.</Text>
                            </AnimatedInfo>
                            : null}
                    </View>

                </View>
            </View>
        );
    }
}
