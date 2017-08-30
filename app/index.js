import React, {Component} from 'react';
import {
    NetInfo,
    Alert,
} from 'react-native';
import {Tabs} from './config/router';
import utils from './utils/utils';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isConnected: false,
            currentScreen: 'List',
        };
    }

    componentDidMount() {
        //check
        NetInfo.isConnected.addEventListener(
            'change',
            this.handleConnectivityChange
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
        console.log('network', isConnected)
        if (!isConnected) {
            utils.netWorkError();
        }
        this.setState({isConnected: isConnected});
    }

    getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        // console.log('route', route)
        if (route.routes) {
            return this.getCurrentRouteName(route);
        }
        return route.routeName;
    }

    render() {
        return (<Tabs
            screenProps={{isConnected: this.state.isConnected, currentScreen: this.state.currentScreen}}
            onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = this.getCurrentRouteName(currentState);
                const prevScreen = this.getCurrentRouteName(prevState);
                if (prevScreen !== currentScreen) {
                    this.setState({currentScreen: currentScreen})
                }
            }}
        />)
    }
}