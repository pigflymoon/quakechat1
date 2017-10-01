import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../utils/utils';

import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("screen");

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
            showIcon: true,
        };
    }

    handleTerms= () => {
        this.props.navigation.navigate('Terms');
    }
    handleSignin = () => {
        this.props.navigation.navigate('Signin');
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
        return new Promise(function (resolve, reject) {
            // let interval = null;

            firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(
                user => {
                    user.updateProfile({displayName: self.state.name});
                    self.props.navigation.navigate('VerifyEmail', {user: user, email: email});
                }, error => {
                    console.log('registerUserAndWaitEmailVerification: createUserWithEmailAndPassword failed ! ' + error.message + ' (' + error.code + ')');
                    reject(error);
                }
            );
        });
    }

    handleSignup = (e) => {
        e.preventDefault();

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
    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }

    handleRotate = () => {
        // console.log('width,height',this.state.width,this.state.height)

        let {width, height} = Dimensions.get('screen');
        if (width > height) {
            this.setState({width: width, height: height, showIcon: false})
        } else {
            this.setState({width: width, height: height, showIcon: true})
        }
    }

    componentDidMount() {
        let {width, height} = Dimensions.get('screen');
        if (this.state.width < width) {
            this.setState({width: width, height: height, showIcon: false});
        } else {
            this.setState({width: width, height: height, showIcon: true});
        }
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
        var isConnected = this.props.screenProps.isConnected;
        console.log('sign in isConnected is ', isConnected)

        if (!isConnected) {
            return Utils.renderOffline();
        }
        return (
            <View style={chat.container}>

                <View style={{width: this.state.width, height: this.state.height, backgroundColor: colors.white}}
                      resizeMode="cover">
                    {this.state.showIcon ?
                        <View style={[chat.markWrap]}>
                            <View style={chat.circleIcon}>
                                <Icon name="user-plus" size={75} color={colors.primary1} style={[chat.mark]}/>
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
                                <Text style={chat.buttonText}>Sign up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={chat.container}>
                        <View style={chat.footerWrap}>
                            <Text style={chat.accountText}>By signing up, you agree to the</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleTerms}>
                                <View>
                                    <Text style={chat.linkText}>Terms of Service</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={chat.footerWrap}>
                            <Text style={chat.accountText}>Already have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                                <View>
                                    <Text style={chat.linkText}>Sign in</Text>
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
