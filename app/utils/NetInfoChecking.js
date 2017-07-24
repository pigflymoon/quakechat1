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
            isConnected: null,
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
        console.log('Then, is ' + isConnected);

        this.setState({isConnected: isConnected});
        this.props.connectCheck(isConnected);
    }

    render() {
        return null;
    }

}