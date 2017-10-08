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
var notificationRule;
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
    async fetchQuakes(nextProps, notificationRule) {
        let self = this;

        if (nextProps) {
            console.log('**********nextProps***********')

            let geoUrl = Config.api.quakes_geonet_url + nextProps.level;
            let usgUrl = Config.api.quakes_usgs_url + nextProps.level;
            let usgLevel = (nextProps.level).toString().split("_")[0];
            if (nextProps.refreshing == true) {
                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi('lastGeoNetNotificationTime', 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        console.log('**********nextProps refreshing newzealand***********', notificationQuakes)
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
                    fetchQuakesByApi('lastUsgsNotificationTime', 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        console.log('**********nextProps refreshing usgs***********', notificationQuakes)

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
                    fetchQuakesByApi(notificationRule, nextProps.level, 'lastGeoNetNotificationTime', 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        console.log('**********nextProps  newzealand***********', notificationQuakes)

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
                    fetchQuakesByApi(notificationRule, usgLevel, 'lastUsgsNotificationTime', 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        console.log('**********nextProps  usgs***********', notificationQuakes)

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
            let usgLevel = (self.props.level).toString().split("_")[0];
            console.log('********first time*********', self.props.tab)
            if (self.props.tab === 'newzealand') {
                fetchQuakesByApi(notificationRule, self.props.level, 'lastGeoNetNotificationTime', 'geonet', geoUrl, function (quakes, notificationQuakes) {
                    console.log('newzealand tab notificationQuakes', notificationQuakes)
                    self.setState({
                            quakes: quakes,
                            // notificationQuakes: notificationQuakes,
                            geonetNotificationQuakes: notificationQuakes,//first filter only by time
                            loading: false,
                            error: null,
                        }
                    );
                });
                self.props.onRefreshData(false);
            } else {
                fetchQuakesByApi(notificationRule, usgLevel, 'lastUsgsNotificationTime', 'usgs', usgUrl, function (quakes, notificationQuakes) {
                    console.log('usgs tab notificationQuakes', notificationQuakes)

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
            AsyncStorage.getItem("ruleValue").then((value) => {
                var savedRule = value;
                console.log('savedRule :', value)
                this.fetchQuakes(nextProps, savedRule);
            });

        }
    }


    handleAppStateChange = (nextAppState) => {
        const {navigate, dispatch, goBack} = this.props.navigation;
        if ((this.state.appState.match(/background|active/)) && nextAppState.match(/background|inactive/)) {
            // const currentScreen = this.props.currentScreen;
            var notificationQuakes, notificationType;
            AsyncStorage.getItem("dataSource").then((value) => {
                if (value === 'geonet') {
                    notificationQuakes = this.state.geonetNotificationQuakes;
                    console.log(' geonet notificationQuakes', notificationQuakes)
                    console.log('state geonetNotificationQuakes ', this.state.geonetNotificationQuakes)

                    notificationType = 'geonet';
                } else {
                    notificationQuakes = this.state.usgsNotificationQuakes;
                    console.log('usgs notificationQuakes', notificationQuakes)
                    notificationType = 'usgs';
                }
                console.log('notificationQuakes', notificationQuakes)

                if (notificationQuakes.length >= 1) {
                    // goBack(null);
                    var i = 1;

                    console.log('notificationQuakes')
                    for (var k in notificationQuakes) {
                        // if (notificationRule <= notificationQuakes[k].magnitude) {//new quakes in the rules
                        console.log('notification message', notificationQuakes[k].message)
                        PushNotification.localNotificationSchedule({
                            message: notificationQuakes[k].message,
                            date: new Date(notificationQuakes[k].time),
                            number: i++,
                            playSound: true,
                            foreground: true,

                        });
                        console.log("scheduled notifiation for ", new Date(notificationQuakes[k].time))
                        // }

                    }
                    navigate('List');
                }


            });
        } else {
            this.setState({usgsNotificationQuakes: [], geonetNotificationQuakes: []});
            // navigate('List');
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
        });
        AppState.addEventListener('change', this.handleAppStateChange);
        var notificationRule;
        if (this.props.isConnected) {
            AsyncStorage.getItem("ruleValue").then((value) => {
                notificationRule = value;

                if (this.state.quakes.length <= 0) {
                    this.fetchQuakes('', notificationRule);
                }
                //
                this.interval = setInterval(() => {
                    this.fetchQuakes('', notificationRule);
                }, 1000 * 60 * 10);


                if (this.props.refreshing) {
                    this.fetchQuakes('', notificationRule);
                }
            });
        }


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
