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
        //检测网络是否连接


        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {
            console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
            NetInfo.isConnected.removeEventListener(
                'change',
                handleFirstConnectivityChange
            );
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

        }
        NetInfo.isConnected.addEventListener(
            'change',
            handleFirstConnectivityChange
        );
    }

    render() {
        return null;
    }

}