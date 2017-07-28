import React, {Component} from 'react';
import {
    NetInfo,
    Alert,
} from 'react-native';
import {StacksOverTabs} from './config/router';
// import PushNotification from 'react-native-push-notification';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isConnected: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('called')
        var isConnected = nextState.isConnected;
        // console.log('called', isConnected)
        if (isConnected) {
            this.setState({isConnected: isConnected});
            return true;
        }
        return false;
    }

    componentDidMount() {
        //check
        NetInfo.isConnected.addEventListener(
            'change',
            this.handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnected: isConnected});
                // console.log('First, is ' + (isConnected ? 'online' : 'offline'));

            }
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this.handleConnectivityChange
        );
    }

    handleConnectivityChange = (isConnected) => {
        // isConnected = false;//test no network
        if (!isConnected) {
            Alert.alert(
                'Network unavailable',
                'The Internet connection appears to be offline',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }
        console.log('Then, is ' + isConnected);
        this.setState({isConnected: isConnected});
    }

    render() {
        return <StacksOverTabs screenProps={this.state.isConnected}/>
    }
}