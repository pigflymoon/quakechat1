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
import BackgroundTimer from 'react-native-background-timer';
// var notificationQuakesData;
var j = 1;
// var intervalId;
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
        // AsyncStorage.setItem("usgsLastNotifiedTime", "0");
        // AsyncStorage.setItem("geonetLastNotifiedTime", "0");
        AsyncStorage.setItem("notificationQuakesData", "");
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
        console.log('~~~~~~~~~~passed notificationQuakes in index~~~~~~~~~~`', notificationQuakes.slice(0, 10))
        notificationQuakes = notificationQuakes.slice(0, 10);//get first 10 data
        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

    }


    handleNotification = (notificationQuakesData) => {

        AsyncStorage.getItem("dataSource").then((value) => {
            if (value) {
                console.log('~~~~~~~~~~~~~~notificationQuakes in Notification ~~~~~~~~~~~~~~~~`', notificationQuakesData)
                if (notificationQuakesData.length >= 1) {
                    // goBack(null);

                    AsyncStorage.getItem(notificationQuakesData[0].apiType + 'LastNotifiedTime').then((notificateTime) => {

                        if (notificateTime) {
                            console.log('saved last notifiation time', notificateTime, 'apiType', notificationQuakesData[0].apiType)
                            if (notificateTime > 0) {
                                var lastTime;


                                for (var i = 0, len = notificationQuakesData.length; i < len; i++) {
                                    console.log(' notificateTime ', parseInt(notificateTime), 'timeStamp ,', notificationQuakesData[i].timeStamp);
                                    console.log(parseInt(notificateTime) < notificationQuakesData[i].timeStamp)
                                    // var lastTime = notificationQuakesData.findIndex(this.isLatest(parseInt(notificateTime), notificationQuakesData[i].timeStamp));
                                    // console.log('lastTieme is ', lastTime)
                                    if (parseInt(notificateTime) < notificationQuakesData[i].timeStamp) {
                                        console.log('called notification', notificationQuakesData[i].timeStamp, ' j is ', j)
                                        PushNotification.localNotificationSchedule({
                                            message: notificationQuakesData[i].message,
                                            date: new Date(notificationQuakesData[i].time),
                                            number: j++,
                                            playSound: true,
                                            foreground: true,

                                        });
                                    }

                                }
                                lastTime = notificationQuakesData.find(function (el) {
                                    return (el.timeStamp > parseInt(notificateTime))
                                });
                                console.log('lastTime ', lastTime)
                                if (lastTime) {
                                    console.log('last time ', lastTime)
                                    AsyncStorage.setItem(notificationQuakesData[0].apiType + 'LastNotifiedTime', (lastTime.timeStamp).toString())
                                }

                            }


                        } else {
                            console.log('called notification', notificateTime)

                            PushNotification.localNotificationSchedule({
                                message: notificationQuakesData[0].message,
                                date: new Date(notificationQuakesData[0].time),
                                number: j,
                                playSound: true,
                                foreground: true,

                            });

                            AsyncStorage.setItem(notificationQuakesData[0].apiType + 'LastNotifiedTime', (notificationQuakesData[0].timeStamp).toString())
                            /*
                             for (var k in notificationQuakesData) {
                             PushNotification.localNotificationSchedule({
                             message: notificationQuakesData[k].message,
                             date: new Date(notificationQuakesData[k].time),
                             number: i++,
                             playSound: true,
                             foreground: true,

                             });
                             }
                             */
                        }

                    });

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


        // if ((previousState.match(/active/) && appState.match(/inactive/)) ||
        //     (previousState.match(/inactive/) && appState.match(/background/))) {
        //     console.log('Test interval', previousState, 'appState ', appState)
        //     console.log('############running at background@@@@@@@@@@@@@@')
        // }


        if ((previousState.match(/active|unknown/) && appState.match(/inactive/)) ||
            (previousState.match(/inactive/) && appState.match(/background/))) {
            this.intervalId = BackgroundTimer.setInterval(() => {
                console.log('Test interval', previousState, 'appState ', appState)
                AsyncStorage.getItem('notificationQuakesData')
                    .then(req => JSON.parse(req))
                    .then((value) => {
                        // console.log('*************fetch Notification data 4 min*************，notificationQuakesData', value)
                        console.log('Test @@@@@@@@@@@@@')
                        if (value.length >= 1) {
                            this.handleNotification(value);
                        }
                    })
                    .catch(error => console.log('error!'));
            }, 1000 * 60 * 2);
        }

        if ((previousState.match(/background/) && appState.match(/active/))) {
            console.log('############running at foreground @@@@@@@@@@@@@@')
            console.log('this intervalId at foreground', this.intervalId)
            BackgroundTimer.clearInterval(this.intervalId - 1);
            BackgroundTimer.clearInterval(this.intervalId);
            // BackgroundTimer.clearInterval(1);
            PushNotification.setApplicationIconBadgeNumber(0);
            AsyncStorage.getItem("notificationQuakesData")
                .then(req => JSON.parse(req))
                .then((value) => {
                    console.log('foreground value', value[0].timeStamp)
                    if (value.length >= 1) {
                        // goBack(null);

                        AsyncStorage.setItem(value[0].apiType + 'LastNotifiedTime', (value[0].timeStamp).toString())
                    }
                });


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
        BackgroundTimer.clearInterval(this.intervalId);

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