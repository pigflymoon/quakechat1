import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Router, Scene, Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import colors from '../styles/colors';

import firebaseApp from '../config/FirebaseConfig';

import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ChatGroup from '../components/ChatGroup';
import VerifyEmail from '../components/VerifyEmail';
import ResetPassword from '../components/ResetPassword';

import chat from '../styles/chat';

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
        };

    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.screenProps.isConnected;//update netinfo
        console.log('chatroom  is ?', nextProps)
        console.log('chatroom  is ?', isConnected)
        this.setState({isConnected: isConnected});
        Actions.signin({isConnected: isConnected});
    }

    // componentDidMount() {
    //     Actions.signin({isConnected: false});
    // }

    signout = () => {
        firebaseApp.auth().signOut().then(function () {
            Actions.signin();
        }).catch(function (error) {
            console.log('sign out error', error);
        })
    }

    render() {
        return (
            <Router barButtonIconStyle={chat.barButtonIconStyle}>
                <Scene key='root' passProps={true} screenProps={this.state.isConnected}>
                    <Scene key='chat' component={ChatGroup} backTitle=" "
                           renderRightButton={
                               () => <TouchableOpacity style={chat.rightButton}
                                                       onPress={this.signout}>
                                   <View style={chat.rightBox}>
                                       <Icon name="exit-to-app" size={28} color={colors.primary1}/>
                                   </View>
                               </TouchableOpacity>
                           }

                    />
                    <Scene key='signin' title='Sign in' component={Signin} hideNavBar={true}/>
                    <Scene key='resetPassword' title='Reset Password' component={ResetPassword} hideNavBar={true}/>
                    <Scene key='signup' title='Sign up' component={Signup} hideNavBar={true}/>
                    <Scene key='verifyEmail' title='verifyEmail' component={VerifyEmail}/>
                </Scene>
            </Router>
        );
    }
}
