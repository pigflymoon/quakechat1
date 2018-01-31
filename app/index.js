import React, {Component} from 'react';
import {
    NetInfo,
    Alert,
    View,
    Text,
    AppState,
    AsyncStorage
} from 'react-native';
import {Tabs} from './config/router';
import utils from './utils/utils';

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
        //设置一个标记，表示从后台进入前台的时候，处理其他逻辑
        this.flage = false;
        AsyncStorage.setItem("notificationQuakesData", "");
    }


    handleConnectivityChange = (connectionInfo) => {
        let connectionType = connectionInfo.type;
        console.log('connectionInfo is ************',connectionInfo)
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
        notificationQuakes = notificationQuakes.slice(0, 10);//get first 10 data
        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

    }


    handleAppStateChange = (nextAppState) => {
        if (nextAppState != null && nextAppState === 'active') {

            //如果是true ，表示从后台进入了前台 ，请求数据，刷新页面。或者做其他的逻辑
            if (this.flage) {
                //这里的逻辑表示 ，第一次进入前台的时候 ，不会进入这个判断语句中。
                // 因为初始化的时候是false ，当进入后台的时候 ，flag才是true ，
                // 当第二次进入前台的时候 ，这里就是true ，就走进来了。
                // 这个地方进行网络请求等其他逻辑。
                //
                //foreground
                // BackgroundTimer.clearInterval(this.intervalId);
                // PushNotification.setApplicationIconBadgeNumber(0);
                AsyncStorage.getItem("notificationQuakesData")
                    .then(req => JSON.parse(req))
                    .then((value) => {
                        if (value.length >= 1) {
                            // goBack(null);

                            AsyncStorage.setItem(value[0].apiType + 'LastNotifiedTime', (value[0].timeStamp).toString())
                        }
                    });
                //
            }
            this.flage = false;

        } else if (nextAppState != null && nextAppState === 'background') {
            this.flage = true;
            /*
            this.intervalId = BackgroundTimer.setInterval(() => {
                AsyncStorage.getItem('notificationQuakesData')
                    .then(req => JSON.parse(req))
                    .then((value) => {
                        if (value.length >= 1) {
                            this.handleNotification(value);
                        }
                    })
                    .catch((error) => {
                        console.warn('run at background data error: ', error)
                    })
            }, 1000 * 60 * 3);
            */
            //
        }

    }

    componentDidMount() {
        // BackgroundTask.schedule();
        // PushNotification.configure({
        //     // (required) Called when a remote or local notification is opened or received
        //     onNotification: function (notification) {
        //         console.log('NOTIFICATION:', notification);
        //     },
        //
        //     // IOS ONLY (optional): default: all - Permissions to register.
        //     permissions: {
        //         alert: true,
        //         badge: true,
        //         sound: true
        //     },
        //
        //     // Should the initial notification be popped automatically
        //     // default: true
        //     popInitialNotification: true,
        //
        //     /**
        //      * (optional) default: true
        //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
        //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
        //      */
        //     requestPermissions: true,
        // })

        // AppState.addEventListener('change', this.handleAppStateChange);

        NetInfo.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );


    }


    componentWillUnmount() {
        // AppState.removeEventListener('change', this.handleAppStateChange);
        NetInfo.removeEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
        // BackgroundTimer.clearInterval(this.intervalId);

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


    render() {
        return (<Tabs
                screenProps={{
                    isConnected: this.state.isConnected,
                    currentScreen: this.state.currentScreen,
                    navigateScreen: this.state.navigateScreen,
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