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
                    fetchQuakesByApi('geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                notificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                        nextProps.onRefreshData(false);
                        // this.stopTimer();
                    });
                } else {
                    fetchQuakesByApi('usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                notificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                        nextProps.onRefreshData(false);
                    })
                }

            } else {

                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi('geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                notificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                    });
                } else {
                    fetchQuakesByApi('usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                notificationQuakes: notificationQuakes,
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
                fetchQuakesByApi('geonet', geoUrl, function (quakes, notificationQuakes) {
                    self.setState({
                            quakes: quakes,
                            notificationQuakes: notificationQuakes,
                            loading: false,
                            error: null,
                        }
                    );
                });
                self.props.onRefreshData(false);
            } else {
                fetchQuakesByApi('usgs', usgUrl, function (quakes, notificationQuakes) {
                    self.setState({
                            quakes: quakes,
                            notificationQuakes: notificationQuakes,
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
        const {navigate, dispatch, goBack} = this.props.navigation;
        const currentScreen = this.props.currentScreen;
        let notificationQuakes = this.state.notificationQuakes;
        console.log('notificationQuakes', notificationQuakes)


        // else {
        var self = this;

        var lastIndex = [];
        if ((this.state.appState.match(/background|active/)) && nextAppState.match(/background|inactive/)) {
            // goBack(null);
            console.log('navigate to back?')


            // console.log('app is running in background')
            AsyncStorage.getItem("isNotified").then((isNotifiedValue) => {
                AsyncStorage.getItem("isSilent").then((isSlientValue) => {
                    var playSound = (isSlientValue === "false");
                    var isNotified = (isNotifiedValue === "true");

                    if (isNotified) {

                        AsyncStorage.getItem("ruleValue").then((value) => {
                            let notificationRule = value;

                            if (notificationQuakes.length > 1) {
                                goBack(null);
                                var i = 1;
                                for (var k in notificationQuakes) {

                                    if (notificationRule <= notificationQuakes[k].mmi) {//new quakes in the rules

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
                                    console.log('lastIndex', lastIndex)
                                    let lastNotificationTime = notificationQuakes[lastIndex[0]].timeStamp;
                                    AsyncStorage.setItem("lastNotificationTime", lastNotificationTime.toString()).then((value) => {
                                        console.log('navigate to list?')
                                        PushNotification.configure({
                                            onNotification: function (notification) {
                                                navigate('List');
                                            },


                                        });

                                    }).done();


                                }
                            } else {
                                console.log('No new notification - no new data')
                            }
                        });


                    }


                })

            }).done();

        } else {
            // console.log('app is running in foreground')
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
