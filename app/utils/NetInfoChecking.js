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
        var self = this;
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({isConnected});
            setTimeout(function () {

                console.log('connected?', self.state.isConnected)
                if (!self.state.isConnected) {
                    Alert.alert(
                        'Network unavailable',
                        'The Internet connection appears to be offline',
                        [
                            {text: 'OK'},
                        ],
                        {cancelable: false}
                    )
                }
            }, 5000)


        });

        //检测网络连接信息
        NetInfo.fetch().done((connectionInfo) => {
            this.setState({connectionInfo});
        });

        //监听网络变化事件
        NetInfo.addEventListener('change', (networkType) => {
            this.setState({isConnected: networkType})
        })
    }

    render() {
        return null;
    }

}