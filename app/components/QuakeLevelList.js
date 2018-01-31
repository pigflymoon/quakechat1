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

import QuakeItem from './QuakeItem';
import Config from '../config/ApiConfig';
import listStyle from '../styles/list';
import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';

BackgroundTask.define(async() => {
    // Remember to call finish()
    console.log('Hello from a background task ####index####');
    var url = "https://api.geonet.org.nz/quake?MMI=0";
    /*
    fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            // console.log('responseData',responseData.features)
            let quakesData = responseData.features;
            console.log('quakesData is ',quakesData[0])
            // quakesData = quakesData.slice(0, 100);
            // let quakesArray = [],
            //     notificationQuakes = [];



            // console.log('return notificationQuakes', (notificationQuakes));


            // callback(quakesArray, notificationQuakes);

        })
        .catch((error)=>{console.warn('fetch quake data error: ',error)})
    */

    // fetchQuakesByApi(0, 0, 'geonet', url, function (quakes, notificationQuakes) {
    //
    //     console.log('background fetch quake', quakes[0]);
    //
    // });
    AsyncStorage.getItem("notificationRule").then((rule) => {
        if (rule) {
            console.log('rule is ', rule)
            fetchQuakesByApi(0, 0, 'geonet', url, function (quakes, notificationQuakes) {

                console.log('###########AsyncStorage background fetch quake', quakes[0]);

            });
        }
    });


    // utils.notificationGenerator();
    // PushNotification.localNotification({//
    //     message: 'hello', // (required)
    //     title: 'hi'
    // })

    BackgroundTask.finish();
});


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
            //
            // AsyncStorage.setItem("geoUrl", JSON.stringify(geoUrl));
            // AsyncStorage.setItem("usgUrl", JSON.stringify(usgUrl));
            // AsyncStorage.setItem("usgLevel", JSON.stringify(usgLevel));

            //
            if (nextProps.refreshing == true) {
                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi(notificationRule, nextProps.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,

                            }
                        );


                        AsyncStorage.setItem("notificationRule", JSON.stringify(notificationRule));
                        AsyncStorage.setItem("geonetLevel", JSON.stringify(nextProps.level));
                        AsyncStorage.setItem("geoUrl", JSON.stringify(geoUrl));

                        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

                        // self.handleNotificationTask();
                        // self.props.onNotification(notificationQuakes);

                    });
                    nextProps.onRefreshData(false);

                } else {
                    fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,

                            }
                        );
                        // self.props.onNotification(notificationQuakes);
                        // self.getNotificationData(notificationQuakes);

                        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));


                    });
                    nextProps.onRefreshData(false);
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

                        AsyncStorage.setItem("notificationRule", JSON.stringify(notificationRule));
                        AsyncStorage.setItem("geonetLevel", JSON.stringify(nextProps.level));
                        AsyncStorage.setItem("geoUrl", JSON.stringify(geoUrl));
                        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

                        // self.handleNotificationTask();
                        // self.props.onNotification(notificationQuakes);
                    });


                } else {
                    fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,
                            }
                        );
                        // self.props.onNotification(notificationQuakes);
                        // self.getNotificationData(notificationQuakes);
                        AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));


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

                    AsyncStorage.setItem("notificationRule", JSON.stringify(notificationRule));
                    AsyncStorage.setItem("geonetLevel", JSON.stringify(self.props.level));
                    AsyncStorage.setItem("geoUrl", JSON.stringify(geoUrl));

                    AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));

                    // self.props.onNotification(notificationQuakes);
                    // self.handleNotificationTask();
                    // self.getNotificationData(notificationQuakes);


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
                    AsyncStorage.setItem("notificationQuakesData", JSON.stringify(notificationQuakes));
                    // self.getNotificationData(notificationQuakes);

                    // self.props.onNotification(notificationQuakes);

                });
                self.props.onRefreshData(false);
            }

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
        // BackgroundTask.schedule();
        BackgroundTask.schedule({
            period: 60*20, // Aim to run every 30 mins - more conservative on battery
        })
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
                // self.intervalFetchQuakesData = setInterval(() => {
                //     console.log('当前用定时器取数据');
                //     self.fetchQuakes(false, notificationRule)
                // }, 1000 * 60 * 1);

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
