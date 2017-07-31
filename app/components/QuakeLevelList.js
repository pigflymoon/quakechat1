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
import PushNotification from 'react-native-push-notification';

import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';
import {colorByMmi} from '../utils/utils';

var quakes;

export default class QuakeLevelList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quakes: [],
            loading: true,
            isRefreshing: false,
            isConnected: false,
        };


    }

    fetchQuakes(nextProps) {

        let self = this
        let url = self.props.nps_source


        if (nextProps) {
            // console.log('props refreshing is ', nextProps.refreshing, (nextProps.refreshing == true))
            if (nextProps.refreshing == true) {
                url = url + nextProps.level;
                // this.fetchApiData(url, 'refreshing');
                fetchQuakesByApi(url, function (quakes) {
                    self.setState({
                            quakes: quakes,
                            loading: false,
                            error: null
                        }
                    );
                   nextProps.onRefreshData(false);
                });


            } else {
                url = url + nextProps.level;
                fetchQuakesByApi(url, function (quakes) {
                    self.setState({
                            quakes: quakes,
                            loading: false,
                            error: null
                        }
                    );
                });
                // this.fetchApiData(url, 'notRefreshing');
            }
        } else {
            url = url + self.props.level;
            fetchQuakesByApi(url, function (quakes) {
                self.setState({
                        quakes: quakes,
                        loading: false,
                        error: null
                    }
                );
            });
            self.props.onRefreshData(false);
            // this.fetchApiData(url, 'notRefreshing');
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

            if (this.state.quakes.length <= 0) {
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
        // console.log('called?')


        if (appState === 'background') {
            // console.log('background notified')
            // let date = new Date(Date.now() + (5 * 1000));
            AsyncStorage.getItem("isNotified").then((isNotifiedValue) => {
                // console.log('background isnotified', isNotifiedValue)
                AsyncStorage.getItem("isSilent").then((isSlientValue) => {
                    var isSilent = (isSlientValue === "true");

                    //
                    var isNotified = (isNotifiedValue === "true");
                    if (isNotified) {
                        var timestamp;
                        AsyncStorage.getItem("notification").then((notificationValue) => {
                            // console.log('*********notificationValue******', notificationValue)

                            if (notificationValue === 'noData' || notificationValue == null) {
                                // console.log('notification is empty')
                                return false;
                            } else {
                                // console.log('backgound notification value is ', notificationValue);

                                timestamp = JSON.parse(notificationValue);
                                let lastNotificationTime = timestamp[Object.keys(timestamp)[0]].notificationTime;//get latest notification time from notification

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
                                AsyncStorage.setItem("lastNotificationTime", lastNotificationTime.toString());//save latest notification time in lastNotificationTime
                            }

                        }).done();

                    }

                })

            }).done();


        } else if (appState === 'active') {
            PushNotification.setApplicationIconBadgeNumber(0);
            AsyncStorage.setItem("notification", '');//clear notification
            // AsyncStorage.removeItem("notification");
            // console.log('notification clear:');
        }


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
        this.props.navigation.navigate('Detail', {isConnected, quake});
    };


    render() {
        var isConnected = this.props.isConnected;
        if (!isConnected) {
            return this.renderOffline();
        }
        if (this.state.loading) {
            return this.renderLoadingView();
        }


        return (
            <List>

                {this.state.quakes.map((quake, index) => (
                    <ListItem key={`list-${index}`}
                              leftIcon={{
                                  name: 'map-marker',
                                  type: 'font-awesome',
                                  size: 35,
                                  color: colorByMmi(quake.mmi)
                              }}
                              title={`NZST: ${quake.time}`}
                              subtitle={
                                  <View style={quakeStyle.info}>
                                      <Text>Magnitude: {quake.magnitude}</Text>
                                      <Text>Depth: {quake.depth}</Text>
                                      <Text>Locality: {quake.locality}</Text>
                                  </View>
                              }

                              onPress={() => this.onQuakeDetail(isConnected, quake)}
                    />
                ))}
            </List>

        )
    }

}
