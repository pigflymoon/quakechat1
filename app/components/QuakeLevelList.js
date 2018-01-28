import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    AppState,
    AsyncStorage,
    Alert,
    FlatList
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import BackgroundTask from 'react-native-background-task';
import PushNotification from 'react-native-push-notification';
// import BackgroundTask from 'react-native-background-task';
//
BackgroundTask.define(async() => {
    // Remember to call finish()
    console.log('Hello from a background task ####index####')
    PushNotification.localNotification({//
        message: 'hello', // (required)
        title: 'hi'
    })
    BackgroundTask.finish()
});


import QuakeItem from './QuakeItem';
import Config from '../config/ApiConfig';
import listStyle from '../styles/list';
import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';

var quakesInterval;
// handleNotificationTask = () => {
//     console.log('************notification task************')
// }



export default class QuakeLevelList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quakes: [],
            loading: true,
            isRefreshing: false,
            isConnected: false,
            notificationQuakes: [],
        };

    }

    /**
     *
     * @param nextProps
     */
    fetchQuakes(nextProps, notificationRule) {
        let self = this;

        if (nextProps) {
            let geoUrl = Config.api.quakes_geonet_url + nextProps.level;
            let usgUrl = Config.api.quakes_usgs_url + nextProps.level;
            let usgLevel = (nextProps.level).toString().split("_")[0];
            if (nextProps.refreshing == true) {
                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi(notificationRule, nextProps.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,

                            }
                        );
                        nextProps.onRefreshData(false);
                        // self.handleNotificationTask();
                        self.props.onNotification(notificationQuakes);

                    });
                } else {
                    fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,

                            }
                        );
                        self.props.onNotification(notificationQuakes);
                        nextProps.onRefreshData(false);
                    })
                }

            } else {
                if (nextProps.tab === 'newzealand') {
                    // console.log('tab is newzealand')
                    fetchQuakesByApi(notificationRule, nextProps.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,
                            }
                        );
                        // self.handleNotificationTask();
                        self.props.onNotification(notificationQuakes);
                    });

                } else {
                    fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,
                            }
                        );
                        self.props.onNotification(notificationQuakes);
                    });
                }

            }
        } else {
            let geoUrl = Config.api.quakes_geonet_url + self.props.level;
            let usgUrl = Config.api.quakes_usgs_url + self.props.level;
            let usgLevel = (self.props.level).toString().split("_")[0];
            if (self.props.tab === 'newzealand') {
                fetchQuakesByApi(notificationRule, self.props.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                    self.setState({
                            quakes: quakes,
                            loading: false,
                            error: null,
                        }
                    );
                    //
                    AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

                    self.props.onNotification(notificationQuakes);
                    // self.handleNotificationTask();

                });
                self.props.onRefreshData(false);
            } else {
                fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                    self.setState({
                            quakes: quakes,
                            loading: false,
                            error: null,
                        }
                    );

                    self.props.onNotification(notificationQuakes);

                });
                self.props.onRefreshData(false);
            }

        }
    }

    async checkStatus() {
        const status = await BackgroundTask.statusAsync()
        console.log('status ', status)
        if (status.available) {
            // Everything's fine
            console.log('status is available')
            // this.handleNotificationTask();
            return
        }

        const reason = status.unavailableReason
        if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
            Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
        } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
            Alert.alert('Restricted', 'Background tasks are restricted on your device')
        }
    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});
        if (nextProps.isConnected && nextProps.currentScreen === 'QuakesList') {
            AsyncStorage.getItem("ruleValue").then((value) => {
                if (value) {
                    var savedRule = value;
                    this.fetchQuakes(nextProps, savedRule);
                }
            });

        }
    }

    componentDidMount() {
        BackgroundTask.schedule();
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

        // this.checkStatus();
        var notificationRule, self = this;
        if (this.props.isConnected) {
            AsyncStorage.getItem("ruleValue").then((value) => {
                // if (value) {
                notificationRule = value;
                if (this.state.quakes.length <= 0) {
                    this.fetchQuakes(false, notificationRule);
                }
                // self.interval = setInterval(
                //     () => { console.log('把一个定时器的引用挂在this上'); },
                //     5000
                // );
                // self.quakesInterval = BackgroundTimer.setInterval(() => {
                //     console.log('fetch data every minute??')
                //     self.fetchQuakes(false, notificationRule);
                //     // Alert.alert('is still running every minute');
                // }, 1000 * 60 * 1);
                self.intervalFetchQuakesData = setInterval(() => {
                    console.log('当前用定时器取数据');
                    self.fetchQuakes(false, notificationRule)
                }, 1000 * 60 * 1);

                if (self.props.refreshing) {
                    self.fetchQuakes(false, notificationRule);
                }
                // }

            });

        }

    }


    componentWillUnmount() {
        // BackgroundTimer.clearInterval(quakesInterval);
        console.log('unmount called');
        this.intervalFetchQuakesData && clearInterval(this.intervalFetchQuakesData);
    }

    keyExtractor = (item, index) => `key${index}`;

    renderList = ({item, index}) => {
        return (
            <QuakeItem key={`list-${index}`} navigation={this.props.navigation} quake={item}
                       isConnected={this.state.isConnected}/>
        );
    }

    render() {
        return (
            <List>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.quakes}
                    renderItem={this.renderList}
                    style={listStyle.listContainer}
                />

            </List>
        )
    }

}
