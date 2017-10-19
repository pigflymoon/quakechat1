import React, {Component} from 'react';
import {
    NetInfo,
    Alert,
    View,
    Text,
    AppState,
    AsyncStorage
} from 'react-native';
import PushNotification from 'react-native-push-notification';

import {Tabs} from './config/router';
import utils from './utils/utils';
var notificationQuakesData;
export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isConnected: false,
            currentScreen: 'QuakesList',
            connectionInfo: '',
            appState: AppState.currentState,
            previousAppStates: [],
        };
    }


    handleConnectivityChange = (connectionInfo) => {
        let connectionType = connectionInfo.type;
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
            } else {
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

    handleNotificationData = (notificationQuakes) => {
        console.log('~~~~~~~~~~passed notificationQuakes in index~~~~~~~~~~`', notificationQuakes)
        notificationQuakesData = notificationQuakes
        // return notificationQuakes;
    }

    handleNotification = (notificationQuakesData) => {
        // notificationQuakesData = [{message:'test',time:(new Date().getTime())}]
        AsyncStorage.getItem("dataSource").then((value) => {
            // console.log('handleNotifiation', value)
            if (value) {
                // var notificationQuakes = this.handleNotificationData();
                console.log('~~~~~~~~~~~~~~notificationQuakes in Notification ~~~~~~~~~~~~~~~~`', notificationQuakesData)
                if (notificationQuakesData.length >= 1) {
                    // goBack(null);
                    var i = 1;

                    console.log('notificationQuakes')
                    for (var k in notificationQuakesData) {
                        // if (notificationRule <= notificationQuakes[k].magnitude) {//new quakes in the rules
                        console.log('notification message', notificationQuakesData[k].message)
                        PushNotification.localNotificationSchedule({
                            message: notificationQuakesData[k].message,
                            date: new Date(notificationQuakesData[k].time),
                            number: i++,
                            playSound: true,
                            foreground: true,

                        });
                        let lastNotificationTime = notificationQuakesData[0].timeStamp;//get the latest quake in rules

                        console.log("scheduled notifiation for ", new Date(notificationQuakesData[k].time))
                        console.log('lastGeoNetNotificationTime ', lastNotificationTime)

                        // }

                    }
                    // navigate('List');
                }

            }


        });

    }
    _handleAppStateChange = (appState) => {
        var previousAppStates = this.state.previousAppStates.slice();
        previousAppStates.push(this.state.appState);
        this.setState({
            appState,
            previousAppStates,
        });
        var my_array = previousAppStates;
        var previousState = my_array[my_array.length - 1];

        if ((previousState.match(/active/) && appState.match(/inactive/)) ||
            (previousState.match(/inactive/) && appState.match(/background/))) {
            console.log('############running at background@@@@@@@@@@@@@@')
            this.backgroundInterval = setInterval(() => {
                console.log('*************fetch Notification data 4 min*************，notificationQuakesData', notificationQuakesData)

                this.handleNotification(notificationQuakesData);
            }, 1000 * 60 * 2);
        }
        if ((previousState.match(/background/) && appState.match(/active/))) {
            console.log('############running at foreground @@@@@@@@@@@@@@')
            // this.setState({notificationQuakes: []});
            notificationQuakesData = [];
            PushNotification.setApplicationIconBadgeNumber(0);
        }


    }

    componentDidMount() {
        PushNotification.configure({
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true,
        })
        AppState.addEventListener('change', this._handleAppStateChange);
        NetInfo.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );


    }


    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        NetInfo.removeEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
        clearInterval(this.backgroundInterval);

    }


    getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return this.getCurrentRouteName(route);
        }
        return route.routeName;
    }

    // handleNotification = (notificationQuakes) => {
    //     console.log('notificationQuakes', notificationQuakes)
    // }

    render() {
        return (<Tabs
                screenProps={{
                    isConnected: this.state.isConnected,
                    currentScreen: this.state.currentScreen,
                    connectionInfo: this.state.connectionInfo,
                    onNotification: this.handleNotificationData
                }}
                onNavigationStateChange={(prevState, currentState) => {
                    const currentScreen = this.getCurrentRouteName(currentState);
                    const prevScreen = this.getCurrentRouteName(prevState);
                    if (prevScreen !== currentScreen) {
                        this.setState({currentScreen: currentScreen})
                    }
                }}

            />

        )
    }
}