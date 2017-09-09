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


    stopTimer() {
        console.log('stop timer');
        this.interval && clearInterval(this.interval);
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
                    // url = Config.api.quakes_geonet_url + nextProps.level;
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
                        // this.stopTimer();
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
            console.log('called api')
            let geoUrl = Config.api.quakes_geonet_url + self.props.level;
            let usgUrl = Config.api.quakes_usgs_url + self.props.level;
            if (self.props.tab === 'newzealand') {
                // url = Config.api.quakes_geonet_url + self.props.level;
                fetchQuakesByApi(geoUrl, function (quakes, notificationQuakes) {
                    console.log('called quake',quakes)
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
        console.log('next props',nextProps.isConnected)
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});
        if (nextProps.isConnected) {
            this.fetchQuakes(nextProps);
        }
        else {
            console.log('not connected')
            utils.netWorkError();
        }

    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        console.log(' props',this.props.isConnected)
        if (this.props.isConnected) {

            if (this.state.quakes.length <= 0) {

                this.fetchQuakes();
            }

            if (this.props.refreshing) {
                this.fetchQuakes();
            }
        }

        // this.interval = setInterval(() => {
        //     // console.log('called interval')
        //     this.fetchQuakes();
        //
        // }, 1000 * 10);


        // //Every half hour call data api.
        // timer = setInterval(() => {
        //     this.fetchQuakes();
        //     console.log('6min!')
        // }, 1000 * 60);


    }

    componentDidUpdate() {
        // console.timeEnd('testTimer');
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.stopTimer();
        // clearInterval(timer);
        // console.log('unmount', this.interval)
        // this.interval && clearInterval(this.interval);
        // console.log('unmount', this.interval)
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
                                    if (notificationRule <= notificationQuakes[k].mmi) {
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

    /**
     *
     * @param isConnected
     * @param quake
     */
    // onQuakeDetail = (isConnected, quake) => {
    //     this.props.navigation.navigate('Detail', {isConnected, quake});
    // };

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
