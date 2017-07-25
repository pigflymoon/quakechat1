import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    AppState,
    AsyncStorage,
    Alert

} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import quakeStyle from '../styles/quake';
import showInfo from '../styles/showInfo';

import axios from 'axios';
import {colorByMmi} from '../utils/utils';
import PushNotification from 'react-native-push-notification';
var quakes;

export default class QuakeLevelList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: true,
            isRefreshing: false,
            isConnected: false,
        };


    }

    getList = (url, refresh) => {
        axios.get(url)
            .then(res => {

                // AsyncStorage.getItem("lastNotificationTime", lastNotificationTime);
                AsyncStorage.getItem("lastNotificationTime").then((lastNotificationTimeItem) => {
                    const filterData = [];
                    var timestamp = {};
                    let lastNotificationTime;
                    lastNotificationTime = lastNotificationTimeItem;
                    console.log('lastNotificationTime ', lastNotificationTime)
                    quakes = res.data.features.reduce((array, value) => {
                        // if condition is our filter
                        if (value.properties.mmi >= 2) {
                            // what happens inside the filter is the map
                            let time = value.properties.time;
                            var utime = new Date(time);
                            utime = new Date(utime.toUTCString().slice(0, -4));
                            utime = utime.toString().split('GMT')[0];

                            time = new Date(time);
                            let notificationDate = time.toString();

                            var notificationTime = time.getTime();


                            time = time.toString().split('GMT')[0];

                            value.utime = utime;
                            value.properties.time = time;
                            value.properties.magnitude = value.properties.magnitude.toFixed(1);
                            value.properties.depth = value.properties.depth.toFixed(1) + ' km';
                            if (value.properties.mmi >= 2.8) {
                                // AppState.addEventListener('change', this.handleAppStateChange);

                                // AsyncStorage.getItem("lastNotificationTime").then((lastNotificationTime) => {

                                // if (Object.keys(lastNotificationTime).length === 0 && lastNotificationTime.constructor === Object) {
                                //     timestamp['time' + notificationTime] = {
                                //         notificationTime: notificationTime.toString(),
                                //         date: notificationDate,
                                //         time: time,
                                //         magnitude: value.properties.magnitude,
                                //         location: value.properties.locality
                                //
                                //     };
                                //     console.log('first time called')
                                // } else {

                                // lastNotificationTime = lastNotificationTime;
                                console.log('lastNotificationTime  is', lastNotificationTime)
                                if (notificationTime > lastNotificationTime) {
                                    timestamp['time' + notificationTime] = {
                                        notificationTime: notificationTime.toString(),
                                        date: notificationDate,
                                        time: time,
                                        magnitude: value.properties.magnitude,
                                        location: value.properties.locality

                                    };
                                }
                                console.log(timestamp)
                                // }


                                // }).done();

                            }
                            array.push(value);
                        }


                        return array;
                    }, filterData)
                    if (timestamp.length > 0) {
                        console.log('notification is not null')
                        AsyncStorage.setItem("notification", JSON.stringify(timestamp));
                    }else{
                        AsyncStorage.setItem("notification", 'noData');
                    }
                    this.setState({
                        dataSource: quakes,
                        isLoading: false,
                    })

                    if (refresh) {
                        this.props.onRefreshData(false);
                        // console.log('refresh data');
                    }
                }).done();

                // if (timestamp) {
                //     AsyncStorage.setItem("notification", JSON.stringify(timestamp));
                // }


            });
    }

    fetchApiData(url, refresh) {
        if (refresh == 'refreshing') {
            // console.log('refeshing')
            this.getList(url, true)
        } else {
            this.getList(url, false)
        }


    }

    fetchQuakes(nextProps) {

        let self = this
        let url = self.props.nps_source


        if (nextProps) {
            // console.log('props refreshing is ', nextProps.refreshing, (nextProps.refreshing == true))
            if (nextProps.refreshing == true) {
                url = url + nextProps.level;
                this.fetchApiData(url, 'refreshing');
            } else {
                url = url + nextProps.level;
                this.fetchApiData(url, 'notRefreshing');
            }
        } else {
            url = url + self.props.level;
            this.fetchApiData(url, 'notRefreshing');
        }


    }

    componentWillReceiveProps(nextProps) {
        // console.log('nextprop refreshing is ', nextProps.refreshing)
        // if (!nextProps.refreshing) return;
        this.fetchQuakes(nextProps);

    }

    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});
        if (isConnected) {
            // console.log('fetch quakes')
            return true;
        }
        return false;
    }

    componentDidMount() {
        // console.log('level list this.props.screenProps', this.props.isConnected)
        AppState.addEventListener('change', this.handleAppStateChange);

        if (this.props.isConnected) {

            if (this.state.dataSource.length <= 0) {
                this.fetchQuakes();
            }

            if (this.props.refreshing) {
                this.fetchQuakes();

            }
        }


        // //Every half hour call data api.
        // this.timer = setInterval(() => {
        //     this.fetchQuakes();
        //     console.log('6min!')
        // }, 1000 * 60);


    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);

    }

    /**
     * notifications
     * */
    handleAppStateChange = (appState) => {
        console.log('called?')


        if (appState === 'background') {
            // console.log('background notified')
            // let date = new Date(Date.now() + (5 * 1000));
            AsyncStorage.getItem("isNotified").then((isNotifiedValue) => {

                AsyncStorage.getItem("isSilent").then((isSlientValue) => {
                    var isSilent = (isSlientValue === "true");

                    //
                    var isNotified = (isNotifiedValue === "true");
                    if (isNotified) {
                        var timestamp;
                        AsyncStorage.getItem("notification").then((notificationValue) => {
                            console.log('notificationValue******')

                            if (notificationValue =='noData') {
                                console.log('notification is empty')
                                return false;
                            } else {
                                console.log('notification', notificationValue);

                                timestamp = JSON.parse(notificationValue);
                                let lastNotificationTime = timestamp[Object.keys(timestamp)[0]].notificationTime;

                                for (var k in timestamp) {
                                    let time = new Date(timestamp[k]);
                                    let date = new Date(timestamp[k].date);
                                    let message = `${timestamp[k].time} happened ${timestamp[k].magnitude} earthquake in ${timestamp[k].location}`;


                                    PushNotification.localNotificationSchedule({
                                        message: message,
                                        date: date,
                                        number: 0,
                                        playSound: isSilent,

                                    });

                                }
                                AsyncStorage.setItem("lastNotificationTime", lastNotificationTime.toString());
                            }

                        }).done();

                    }

                })

            }).done();


        } else if (appState === 'active') {
            PushNotification.setApplicationIconBadgeNumber(0);
            // AsyncStorage.setItem("notification", '');
            console.log('notification clear:');
        }

        PushNotification.configure({
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                PushNotification.setApplicationIconBadgeNumber(0);
                // console.log('NOTIFICATION:', notification);
            },
        });
    }


    renderLoadingView = () => {
        return (
            <Text>Loading...</Text>
        )
    }
    renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>

        )
    }

    onQuakeDetail = (isConnected, quake) => {
        this.props.navigation.navigate('Detail', {isConnected, ...quake});
    };


    render() {
        var isConnected = this.props.isConnected;
        if (!isConnected) {
            return this.renderOffline();
        }
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }


        return (
            <List>

                {this.state.dataSource.map((quake, index) => (
                    <ListItem key={`list-${index}`}
                              leftIcon={{
                                  name: 'map-marker',
                                  type: 'font-awesome',
                                  size: 35,
                                  color: colorByMmi(quake.properties.mmi)
                              }}
                              title={`NZST: ${quake.properties.time}`}
                              subtitle={
                                  <View style={quakeStyle.info}>
                                      <Text>Magnitude: {quake.properties.magnitude}</Text>
                                      <Text>Depth: {quake.properties.depth}</Text>
                                      <Text>Locality: {quake.properties.locality}</Text>
                                  </View>
                              }

                              onPress={() => this.onQuakeDetail(isConnected, quake)}
                    />
                ))}
            </List>

        )
    }

}
