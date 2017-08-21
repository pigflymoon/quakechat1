import React, {Component} from 'react';
import {
    NetInfo,
    Alert,
} from 'react-native';
import {Root} from './config/router';
// import PushNotification from 'react-native-push-notification';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isConnected: false,
        };
    }
    //
    // shouldComponentUpdate(nextProps, nextState) {
    //     var isConnected = nextState.isConnected;
    //     this.setState({isConnected: isConnected});
    //     if (isConnected) {
    //         return true;
    //     }
    //     return false;
    // }

    componentWillReceiveProps(nextProps) {
        console.log('QuakesList', nextProps);
        var isConnected = nextProps.isConnected;//update netinfo
        this.setState({isConnected: isConnected});
    }


    componentDidMount() {
        //check
        NetInfo.isConnected.addEventListener(
            'change',
            this.handleConnectivityChange
        );

    }

    componentWillUnmount() {
        console.log('will unmount called');
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
                `The Internet connection appears to be offline`,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }
        this.setState({isConnected: isConnected});
    }

    render() {
        return <Root screenProps={this.state.isConnected}/>
    }
}