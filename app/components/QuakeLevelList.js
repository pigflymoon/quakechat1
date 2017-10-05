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
import QuakeItem from './QuakeItem';
import Config from '../config/ApiConfig';
import listStyle from '../styles/list';

import PushNotification from 'react-native-push-notification';

import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';

export default class QuakeLevelList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quakes: [],
            loading: true,
            isRefreshing: false,
            isConnected: false,
            notificationQuakes: [],
            geonetNotificationQuakes: [],
            usgsNotificationQuakes: [],
            appState: AppState.currentState,
            foreground: true,
        };

    }

    /**
     *
     * @param nextProps
     */
    async fetchQuakes(nextProps) {
        let self = this;

        if (nextProps) {

            let geoUrl = Config.api.quakes_geonet_url + nextProps.level;
            let usgUrl = Config.api.quakes_usgs_url + nextProps.level;
            if (nextProps.refreshing == true) {
                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi('lastGeoNetNotificationTime', 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                geonetNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                        nextProps.onRefreshData(false);
                        // this.stopTimer();
                    });
                } else {
                    fetchQuakesByApi('lastGeoNetNotificationTime', 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                usgsNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                        nextProps.onRefreshData(false);
                    })
                }

            } else {

                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi('lastGeoNetNotificationTime', 'geonet', geoUrl, function (quakes, notificationQuakes) {

                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                geonetNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                    });
                } else {
                    fetchQuakesByApi('lastGeoNetNotificationTime', 'usgs', usgUrl, function (quakes, notificationQuakes) {

                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                usgsNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,
                            }
                        );
                    });
                }

                // this.stopTimer();
            }
        } else {
            let geoUrl = Config.api.quakes_geonet_url + self.props.level;
            let usgUrl = Config.api.quakes_usgs_url + self.props.level;
            if (self.props.tab === 'newzealand') {
                fetchQuakesByApi('lastGeoNetNotificationTime', 'geonet', geoUrl, function (quakes, notificationQuakes) {

                    self.setState({
                            quakes: quakes,
                            // notificationQuakes: notificationQuakes,
                            geonetNotificationQuakes: notificationQuakes,
                            loading: false,
                            error: null,
                        }
                    );
                });
                self.props.onRefreshData(false);
            } else {
                fetchQuakesByApi('lastGeoNetNotificationTime', 'usgs', usgUrl, function (quakes, notificationQuakes) {

                    self.setState({
                            quakes: quakes,
                            // notificationQuakes: notificationQuakes,
                            usgsNotificationQuakes: notificationQuakes,
                            loading: false,
                            error: null,
                        }
                    );
                });
                self.props.onRefreshData(false);
            }

            // this.stopTimer();
        }
    }

    /**
     *
     * @param appState
     */
    handleAppStateChange = (nextAppState) => {

        // const currentScreen = this.props.currentScreen;
        var notificationQuakes, notificationType;
        AsyncStorage.getItem("dataSource").then((value) => {
            if (value === 'geonet') {
                notificationQuakes = this.state.geonetNotificationQuakes;
                console.log(' geonet notificationQuakes', notificationQuakes)
                notificationType = 'geonet';
            } else {
                notificationQuakes = this.state.usgsNotificationQuakes;
                console.log('usgs notificationQuakes', notificationQuakes)
                notificationType = 'usgs';
            }
            this.handleNotification(notificationQuakes, notificationType, nextAppState)
        });
    }
    handleNotification = (notificationQuakes, notificationType, nextAppState) => {
        const {navigate, dispatch, goBack} = this.props.navigation;
        var self = this;

        var lastIndex = [];
        if ((this.state.appState.match(/background|active/)) && nextAppState.match(/background|inactive/)) {
            AsyncStorage.getItem("isNotified").then((isNotifiedValue) => {
                AsyncStorage.getItem("isSilent").then((isSlientValue) => {
                    var playSound = (isSlientValue === "false");
                    var isNotified = (isNotifiedValue === "true");
                    if (isNotified) {

                        AsyncStorage.getItem("ruleValue").then((value) => {
                            let notificationRule = value;
                            console.log('ruleValue ', notificationRule)
                            if (notificationQuakes.length >= 1) {
                                goBack(null);
                                var i = 1;
                                for (var k in notificationQuakes) {
                                    if (notificationRule <= notificationQuakes[k].mmi) {//new quakes in the rules
                                        console.log('notification message', notificationQuakes[k].message)
                                        PushNotification.localNotificationSchedule({
                                            message: notificationQuakes[k].message,
                                            date: new Date(notificationQuakes[k].time),
                                            number: i++,
                                            playSound: playSound,
                                            foreground: true,

                                        });
                                        lastIndex.push(k);
                                    }

                                }
                                if (lastIndex.length <= 0) {
                                    console.log('No new notification')
                                } else {
                                    if (notificationType == 'geonet') {
                                        let lastGeoNetNotificationTime = notificationQuakes[lastIndex[0]].timeStamp;
                                        AsyncStorage.setItem("lastGeoNetNotificationTime ", lastGeoNetNotificationTime.toString()).then((value) => {
                                            console.log('navigate to list?', lastGeoNetNotificationTime)
                                            this.setState({geonetNotificationQuakes: []});
                                            navigate('List');
                                        }).done();
                                    } else {
                                        let lastUsgsNotificationTime = notificationQuakes[lastIndex[0]].timeStamp;
                                        AsyncStorage.setItem("lastUsgsNotificationTime", lastUsgsNotificationTime.toString()).then((value) => {
                                            console.log('navigate to list? usgs ', lastUsgsNotificationTime)
                                            this.setState({usgsNotificationQuakes: []});
                                            navigate('List');
                                        }).done();
                                    }
                                }
                            } else {
                                console.log('No new notification - no new data')
                            }
                        });


                    }


                })

            }).done();

        } else {
            PushNotification.setApplicationIconBadgeNumber(0);
        }
    }

    keyExtractor = (item, index) => `key${index}`;

    renderList = ({item, index}) => {
        return (
            <QuakeItem key={`list-${index}`} navigation={this.props.navigation} quake={item}
                       isConnected={this.state.isConnected}/>
        );
    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});
        if (nextProps.isConnected) {
            this.fetchQuakes(nextProps);
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        if (this.props.isConnected) {

            if (this.state.quakes.length <= 0) {
                this.fetchQuakes();
            }
            //
            this.interval = setInterval(() => {
                this.fetchQuakes();
            }, 1000 * 60 * 10);


            if (this.props.refreshing) {
                this.fetchQuakes();
            }
        }

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
        });

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        clearInterval(this.interval);
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
