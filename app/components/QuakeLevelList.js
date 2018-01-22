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
import BackgroundTimer from 'react-native-background-timer';
import BackgroundTask from 'react-native-background-task';

import QuakeItem from './QuakeItem';
import Config from '../config/ApiConfig';
import listStyle from '../styles/list';
import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';

var quakesInterval;

BackgroundTask.define(async() => {
    var notificationRule, self = this;
    if (this.props.isConnected) {
        AsyncStorage.getItem("ruleValue").then((value) => {

            notificationRule = value;

            self.fetchQuakes(false, notificationRule);
            //
            AsyncStorage.getItem("notificationQuakesData")
                .then(req => JSON.parse(req))
                .then((value) => {
                    if (value.length >= 1) {
                        // goBack(null);


                        AsyncStorage.setItem(value[0].apiType + 'LastNotifiedTime', (value[0].timeStamp).toString(),() => {
                            self.handleNotificationTask(value);
                        })

                    }
                });
            //



        });
    }
    BackgroundTask.finish()
});
//

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
                    console.log('tab is newzealand')
                    fetchQuakesByApi(notificationRule, nextProps.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                loading: false,
                                error: null,
                            }
                        );

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
//
                    self.props.onNotification(notificationQuakes);

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

    //
    handleNotificationTask = (notificationQuakesData) => {
        var j = 1;
        AsyncStorage.getItem("dataSource").then((value) => {
            if (value) {
                if (notificationQuakesData.length >= 1) {
                    // goBack(null);

                    AsyncStorage.getItem(notificationQuakesData[0].apiType + 'LastNotifiedTime').then((notificateTime) => {

                        if (notificateTime) {
                            if (notificateTime > 0) {
                                var lastTime;

                                for (var i = 0, len = notificationQuakesData.length; i < len; i++) {

                                    if (parseInt(notificateTime) < notificationQuakesData[i].timeStamp) {
                                        PushNotification.localNotificationSchedule({
                                            message: notificationQuakesData[i].message,
                                            date: new Date(notificationQuakesData[i].time),
                                            number: j++,
                                            playSound: true,
                                            foreground: true,

                                        });
                                    }

                                }
                                //
                                // const {navigate} = this.props.navigation;
                                // navigate('QuakesList');

                                lastTime = notificationQuakesData.find(function (el) {
                                    return (el.timeStamp > parseInt(notificateTime))
                                });
                                // console.log('lastTime ', lastTime)
                                if (lastTime) {
                                    AsyncStorage.setItem(notificationQuakesData[0].apiType + 'LastNotifiedTime', (lastTime.timeStamp).toString())
                                }

                                // this.setState({navigateScreen: 'QuakesList'})
                            }


                        } else {
                            console.log('called notification', notificateTime)
                            // var k = 1;

                            PushNotification.localNotificationSchedule({
                                message: notificationQuakesData[0].message,
                                date: new Date(notificationQuakesData[0].time),
                                number: j,
                                playSound: true,
                                foreground: true,

                            });
                            AsyncStorage.setItem(notificationQuakesData[0].apiType + 'LastNotifiedTime', (notificationQuakesData[0].timeStamp).toString())
                        }

                    });

                }
            }


        });

    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});

        if (nextProps.isConnected) {
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

        var notificationRule, self = this;
        if (this.props.isConnected) {
            AsyncStorage.getItem("ruleValue").then((value) => {
                // if (value) {
                notificationRule = value;
                if (this.state.quakes.length <= 0) {
                    this.fetchQuakes(false, notificationRule);
                }
                self.quakesInterval = BackgroundTimer.setInterval(() => {
                    console.log('fetch data every minute??')
                    self.fetchQuakes(false, notificationRule);
                    // Alert.alert('is still running every minute');
                }, 1000 * 60 * 1);

                if (self.props.refreshing) {
                    self.fetchQuakes(false, notificationRule);
                }
                // }

            });

        }

    }


    componentWillUnmount() {
        BackgroundTimer.clearInterval(quakesInterval);
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
