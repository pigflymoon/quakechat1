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

    componentWillMount() {
        NetInfo.isConnected.fetch().then().done((isConnected) => {
            console.log('index ', isConnected)
            if (!isConnected) {
                Alert.alert(
                    'Network unavailable',
                    `will mount The Internet connection appears to be ${isConnected}`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            }

            // this.setState({isConnected: isConnected});

        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('should update called',nextState.isConnected)
        var isConnected = nextState.isConnected;
        this.setState({isConnected: isConnected});
        if (isConnected) {
            // this.setState({isConnected: isConnected});
            return true;
        }

        return false;
    }

    componentDidMount() {
        //check

        console.log('Did mount');
        NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
        // NetInfo.isConnected.fetch().done(
        //     (isConnected) => {
        //         console.log('index ',isConnected)
        //         Alert.alert(
        //             'Network unavailable',
        //             `index js The Internet connection appears to be ${isConnected}`,
        //             [
        //                 {text: 'OK'},
        //             ],
        //             {cancelable: false}
        //         )
        //         this.setState({isConnected: isConnected});
        //     }
        // );
        // NetInfo.isConnected.addEventListener(
        //     'change',
        //     this.handleConnectivityChange
        // );

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
        console.log('handle connect called', isConnected);
        if (!isConnected) {
            Alert.alert(
                'Network unavailable',
                `handleConnectivity The Internet connection appears to be offline${isConnected}`,
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