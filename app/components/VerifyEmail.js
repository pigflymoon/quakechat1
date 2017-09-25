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

// import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../utils/utils';

import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("screen");

import colors from '../styles/colors';
import chat from '../styles/chat';
let interval = null;
export default class VeriyEmail extends Component {
    constructor(props) {
        super(props);

        const {user} = this.props.navigation.state.params;
        console.log('user',user)

        this.state = {
            signin: false,
            isLoading: false,
            user: user,
            isConnected: false,
            width: width,
            height: height,
            showIcon: true,
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     var isConnected = nextProps.isConnected;//update netinfo
    //     this.setState({isConnected: isConnected});
    // }
    //
    handleVerifyEmail = (e) => {
        var self = this;
        var user = this.state.user;

        e.preventDefault();
        //
        // if (!this.state.isConnected) {
        //     Utils.netWorkError();
        // }
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
                                        self.props.navigation.navigate('ChatRoom',{name: self.state.name});
                                        // Actions.chat({name: self.state.name});
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

    //
    // componentWillReceiveProps(nextProps) {
    //     var isConnected = nextProps.screenProps;//update netinfo
    //     this.setState({isConnected: isConnected});
    // }
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.handleRotate);
        interval && clearInterval(interval);
    }

    render() {
        // const {user,email} = this.props.navigation.state.params;
        // console.log('user',this.props.navigation.state.params)
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

                        </View>
                    )}
            </View>
        );
    }
}
