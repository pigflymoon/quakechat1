import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    NetInfo,
    Alert,
} from 'react-native';

export default class NetInfoChecking extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            isConnected: false,
            connectionInfo: null,
        };
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

                console.log('First, is ' + (isConnected ? 'online' : 'offline'));

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
        isConnected = false;//test no network
        if (!isConnected) {
            Alert.alert(
                'Network unavailable',
                'The Internet connection appears to be offline',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }else{
            console.log('Then, is ' + isConnected);

            this.setState({isConnected: isConnected});
            this.props.connectCheck(isConnected);
        }

    }

    render() {
        return null;
    }

}