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
import utils from '../utils/utils';
import Config from '../config/ApiConfig';
import PushNotification from 'react-native-push-notification';
// import PushController from '../components/PushController';
import { NavigationActions } from 'react-navigation'

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
        console.log('current state', AppState.currentState)

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
                    // url = Config.api.quakes_usgs_url + nextProps.level;
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

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});
        if (nextProps.isConnected) {
            this.fetchQuakes(nextProps);
        }
        else {
            utils.netWorkError();
        }

    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        if (this.props.isConnected) {

            if (this.state.quakes.length <= 0) {
                this.fetchQuakes();
            }
            //
            // this.interval = setInterval(() => {
            //     this.fetchQuakes();
            // }, 1000*10);
            //

            if (this.props.refreshing) {
                this.fetchQuakes();
            }
        }

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        // clearInterval(this.interval);
    }

    /**
     *
     * @param appState
     */
    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/background/) && nextAppState.match(/background|inactive/) ||
            this.state.appState.match(/active/) && nextAppState.match(/inactive/)) {

            this.setState({appState: 'background'})
            console.log('app is running in background')
        }
        // else {
            var self = this;
            console.log('nextAppState', nextAppState, 'appState', this.state.appState)
            console.log(this.state.appState == 'background')
            console.log(nextAppState === 'active')

            console.log((this.state.appState == 'background')&& (nextAppState === 'active'))
            const {navigate,dispatch} = this.props.navigation;
            let notificationQuakes = this.state.notificationQuakes;
            // var detailQuakes;
            //


            var lastIndex = [];
            AsyncStorage.getItem("isNotified").then((isNotifiedValue) => {
                AsyncStorage.getItem("isSilent").then((isSlientValue) => {
                    var isSilent = (isSlientValue === "true");
                    var isNotified = (isNotifiedValue === "true");

                    if (isNotified) {

                        AsyncStorage.getItem("ruleValue").then((value) => {
                            let notificationRule = value;

                            if (notificationQuakes.length > 0) {
                                for (k in notificationQuakes) {
                                    if (notificationRule <= notificationQuakes[k].mmi) {//new quakes in the rules
                                        PushNotification.localNotificationSchedule({
                                            message: notificationQuakes[k].message,
                                            date: new Date(notificationQuakes[k].time),//(Date.now() + (5 * 1000)),//(notificationQuakes[k].time),
                                            number: 0,
                                            playSound: isSilent,
                                            foreground: true
                                            // userInteraction: true,

                                        });
                                        lastIndex.push(k);
                                    }

                                }
                                if (lastIndex.length <= 0) {
                                    console.log('No new notification')
                                } else {
                                    let lastNotificationTime = notificationQuakes[lastIndex[0]].timeStamp;
                                    AsyncStorage.setItem("lastNotificationTime", lastNotificationTime.toString());
                                    console.log('called')
                                    if ((this.state.appState == 'background') && (nextAppState === 'active')) {
                                        console.log('app is running in foreground')
                                        PushNotification.configure({
                                            onNotification: function (notification) {
                                                console.log('NOTIFICATION:', notification);
                                                var isConnected = true;
                                                var quake = notificationQuakes[0];
                                                const navigateAction = NavigationActions.navigate({
                                                    routeName: 'Detail',
                                                    params: {isConnected, quake},

                                                    // navigate can have a nested navigate action that will be run inside the child router
                                                    action: NavigationActions.navigate({ routeName: 'Detail',params: {isConnected, quake }})
                                                })
                                                dispatch(navigateAction)
                                                // navigate('Detail', {isConnected, quake});
                                            },

                                        })

                                    }

                                }
                            } else {
                                console.log('No new notification - no new data')
                            }
                        });


                    }


                })

            }).done();


        // }
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
                />

            </List>
        )
    }

}
