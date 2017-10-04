import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("screen");

import colors from '../styles/colors';
import chat from '../styles/chat';
let interval = null;
export default class VeriyEmail extends Component {
    constructor(props) {
        super(props);

        const {user} = this.props.navigation.state.params;

        this.state = {
            signin: false,
            isLoading: false,
            user: user,
            isConnected: false,
            width: width,
            height: height,
            showIcon: true,
            showErrorInfo: false,
        };
    }

    errorInfo = (showInfo) => {
        this.setState({
            showErrorInfo: showInfo
        })
    }
    handleVerifyEmail = (e) => {
        var self = this;
        var user = this.state.user;

        e.preventDefault();

        user.sendEmailVerification().then(
            function () {
                self.setState({
                    isLoading: true
                });

                interval = setInterval(() => {
                    user.reload().then(
                        function () {
                            if (interval && user.emailVerified) {
                                clearInterval(interval);
                                interval = null;

                                firebaseApp.auth().onAuthStateChanged((user) => {
                                    self.setState({
                                        isLoading: false
                                    });
                                    clearInterval(interval);
                                    if (user && user.emailVerified) {
                                        self.props.navigation.navigate('ChatRoom', {name: self.state.name});
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
                        }).catch(function (error) {
                        var errorMessage = error.message + ' (' + error.code + ')';
                        self.setState({showErrorInfo: true, errorInfo: errorMessage});
                    });
                }, 1000 * 30);
            }).catch(function (error) {
            var errorMessage = error.message + ' (' + error.code + ')';
            self.setState({showErrorInfo: true, errorInfo: errorMessage});
        });


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
        Dimensions.removeEventListener("change", this.handleRotate);
        interval && clearInterval(interval);
    }

    render() {
        const {email} = this.props.navigation.state.params;

        return (

            <View style={chat.container}>

                {this.state.isLoading ? (
                        <View style={chat.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                    ) : (
                        <View
                            style={{width: this.state.width, height: this.state.height, backgroundColor: colors.white}}
                            resizeMode="cover">
                            {this.state.showIcon ?
                                <View style={[chat.markWrap]}>
                                    <View style={chat.circleIcon}>
                                        <Icon name="envelope" size={75} color={colors.primary1} style={[chat.mark]}/>
                                    </View>

                                </View> : null}
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
                                        value={email}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={.5} onPress={this.handleVerifyEmail}>
                                    <View style={chat.button}>
                                        <Text style={chat.buttonText}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={chat.infoWrapper}>
                                {this.state.showErrorInfo ?
                                    <AnimatedInfo showInfo={this.errorInfo}>
                                        <Text style={chat.infoText}>{this.state.errorInfo}, please try again.</Text>
                                    </AnimatedInfo>
                                    : null}
                            </View>
                        </View>
                    )}
            </View>
        );
    }
}
