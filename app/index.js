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
// var notificationQuakesData;
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
        AsyncStorage.setItem("usgsLastNotifiedTime", "0");
        AsyncStorage.setItem("geonetLastNotifiedTime", "0");
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
        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

    }

    handleNotification = (notificationQuakesData) => {
        AsyncStorage.getItem("dataSource").then((value) => {
            if (value) {
                console.log('~~~~~~~~~~~~~~notificationQuakes in Notification ~~~~~~~~~~~~~~~~`', notificationQuakesData)
                if (notificationQuakesData.length >= 1) {
                    // goBack(null);
                    var i = 1;


                    AsyncStorage.getItem(notificationQuakesData[0].apiType + 'LastNotifiedTime').then((value) => {
                        if (value) {
                            console.log('saved last notifiation time', value)
                            if (value > 0) {
                                for (var k in notificationQuakesData) {
                                    console.log(' value ', parseInt(value), 'timeStamp ,', notificationQuakesData[k].timeStamp);
                                    if (parseInt(value) < notificationQuakesData[k].timeStamp) {
                                        PushNotification.localNotificationSchedule({
                                            message: notificationQuakesData[k].message,
                                            date: new Date(notificationQuakesData[k].time),
                                            number: i++,
                                            playSound: true,
                                            foreground: true,

                                        });
                                    }

                                }
                            } else {
                                PushNotification.localNotificationSchedule({
                                    message: notificationQuakesData[k].message,
                                    date: new Date(notificationQuakesData[k].time),
                                    number: i++,
                                    playSound: true,
                                    foreground: true,

                                });
                            }
                        }
                    });
                    // for (var k in notificationQuakesData) {
                    //     PushNotification.localNotificationSchedule({
                    //         message: notificationQuakesData[k].message,
                    //         date: new Date(notificationQuakesData[k].time),
                    //         number: i++,
                    //         playSound: true,
                    //         foreground: true,
                    //
                    //     });
                    // }
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
            AsyncStorage.getItem('notificationQuakesData')
                .then(req => JSON.parse(req))
                .then((value) => {
                    this.backgroundInterval = setInterval(() => {
                        console.log('*************fetch Notification data 4 min*************，notificationQuakesData', value)
                        if (value.length >= 1) {
                            this.handleNotification(value);
                        }

                    }, 1000 * 60 * 2);
                })
                .catch(error => console.log('error!'));

        }
        if ((previousState.match(/background/) && appState.match(/active/))) {
            console.log('############running at foreground @@@@@@@@@@@@@@')
            PushNotification.setApplicationIconBadgeNumber(0);
            AsyncStorage.setItem("notificationQuakesData", "");

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