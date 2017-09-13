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
import Utils from '../utils/utils';
import quakeStyle from '../styles/quake';
import {fetchQuakesByApi, fetchQuakesByUsgsApi} from '../utils/FetchQuakesByApi';
var timer;
export default class QuakeLevelList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quakes: [],
            loading: true,
            isRefreshing: false,
            isConnected: false,
            notificationQuakes: [],
            appState: AppState.currentState
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
                    fetchQuakesByApi(geoUrl, function (quakes, notificationQuakes) {
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
                    fetchQuakesByUsgsApi(usgUrl, function (quakes, notificationQuakes) {
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
                    fetchQuakesByApi(geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                notificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                    });
                } else {
                    fetchQuakesByUsgsApi(usgUrl, function (quakes, notificationQuakes) {
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
                fetchQuakesByApi(geoUrl, function (quakes, notificationQuakes) {
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
                fetchQuakesByUsgsApi(usgUrl, function (quakes, notificationQuakes) {
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
            this.interval = setInterval(()=>{
                console.log('Fetching quake info');
                this.fetchQuakes();
            },10000);
            //

            if (this.props.refreshing) {
                this.fetchQuakes();
            }
        }

    }

    componentDidUpdate() {
        // console.timeEnd('testTimer');
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        clearInterval(this.interval);
    }

    /**
     *
     * @param appState
     */
    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            PushNotification.setApplicationIconBadgeNumber(0);
            // AsyncStorage.setItem("notification", '');//clear notification
            // AsyncStorage.removeItem("notification");
            // console.log('notification clear:');
            this.setState({appState: nextAppState});

        } else {
            var lastIndex = [];
            AsyncStorage.getItem("isNotified").then((isNotifiedValue) => {
                AsyncStorage.getItem("isSilent").then((isSlientValue) => {
                    var isSilent = (isSlientValue === "true");
                    var isNotified = (isNotifiedValue === "true");
                    if (isNotified) {

                        let notificationQuakes = this.state.notificationQuakes;
                        AsyncStorage.getItem("ruleValue").then((value) => {
                            let notificationRule = value;


                            if (notificationQuakes.length > 0) {
                                for (k in notificationQuakes) {
                                    if (notificationRule < notificationQuakes[k].mmi) {
                                        PushNotification.localNotificationSchedule({
                                            message: notificationQuakes[k].message,
                                            date: new Date(notificationQuakes[k].time),//(Date.now() + (5 * 1000)),//(notificationQuakes[k].time),
                                            number: 0,
                                            playSound: isSilent,

                                        });
                                        lastIndex.push(k);
                                    }

                                }
                                if (lastIndex.length <= 0) {
                                    console.log('No new notification')
                                } else {
                                    let lastNotificationTime = notificationQuakes[lastIndex[0]].timeStamp;
                                    AsyncStorage.setItem("lastNotificationTime", lastNotificationTime.toString());

                                }
                            } else {
                                console.log('No new notification')
                            }
                        });


                    }

                })

            }).done();

        }


    }

    keyExtractor = (item, index) => `key${index}`;

    renderList=({item, index})=> {
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
