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
            isConnected: true,
            currentScreen: 'List',
            connectionInfo: '',
        };
    }


    handleConnectivityChange = (connectionInfo) => {
        let connectionType = connectionInfo.type;
        console.log('network is', connectionType);
        if (connectionType === 'none' || connectionType === 'unknown') {
            utils.netWorkError();
            this.setState({
                isConnected: false
            });
        } else {
            this.setState({
                connectionInfo: connectionType,
                isConnected: true
            });
        }

    }


    componentWillMount() {
        //Intial connection check
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                this.setState({
                    isConnected: true
                });
            }else{
                // utils.netWorkError();
                this.setState({
                    isConnected: false
                });
            }
        });
        //Check connection change
        const handleFirstConnectivityChange = (isConnected) => {
            this.setState({
                isConnected: isConnected
            });
            NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChange);
        };
        NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);
    }

    componentDidMount() {

        NetInfo.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );

    }


    componentWillUnmount() {
        NetInfo.removeEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
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
        console.log('Net work type ', JSON.stringify(this.state.connectionInfo))
        return (<Tabs
            screenProps={{
                isConnected: this.state.isConnected,
                currentScreen: this.state.currentScreen,
                connectionInfo: this.state.connectionInfo,

            }}
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