import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Alert,
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
            isConnected: this.props.screenProps.isConnected,
        };

    }

    signout = () => {
        console.log('sign out called')
        firebaseApp.auth().signOut().then(function () {
            Actions.signin();
        }).catch(function (error) {
            console.log('sign out error', error);
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isConnected: nextProps.screenProps.isConnected});
        Alert.alert(
            'ChatRoom',
            `ChatRoom next props` + nextProps.screenProps.isConnected,
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        )
    }

    render() {

        return (
            <Router barButtonIconStyle={chat.barButtonIconStyle}>
                <Scene key='root' passProps={true} >
                    <Scene key='signin' title='Sign in' component={Signin} hideNavBar={true} screenProps={this.props.screenProps}
                    />
                    <Scene key='chat' component={ChatGroup} backTitle=" " screenProps={this.props.screenProps}
                           renderRightButton={
                               () => <TouchableOpacity style={chat.rightButton}
                                                       onPress={this.signout}>
                                   <View style={chat.rightBox}>
                                       <Icon name="exit-to-app" size={28} color={colors.primary1}/>
                                   </View>
                               </TouchableOpacity>
                           }
                    />

                    <Scene key='resetPassword' title='Reset Password' component={ResetPassword} hideNavBar={true} screenProps={this.props.screenProps}/>
                    <Scene key='signup' title='Sign up' component={Signup} hideNavBar={true} screenProps={this.props.screenProps}/>
                    <Scene key='verifyEmail' title='verifyEmail' component={VerifyEmail} screenProps={this.props.screenProps}/>
                </Scene>
            </Router>
        );
    }
}
