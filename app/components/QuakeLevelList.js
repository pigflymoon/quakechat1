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

import PushNotification from 'react-native-push-notification';

import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';
import {colorByMmi} from '../utils/utils';
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
    fetchQuakes(nextProps) {
        let self = this;
        let url = self.props.nps_source;

        if (nextProps) {
            if (nextProps.refreshing == true) {
                url = url + nextProps.level;
                // this.fetchApiData(url, 'refreshing');
                fetchQuakesByApi(url, function (quakes, notificationQuakes) {

                    self.setState({
                            quakes: quakes,
                            notificationQuakes: notificationQuakes,
                            loading: false,
                            error: null
                        }
                    );
                    nextProps.onRefreshData(false);
                });
            } else {
                url = url + nextProps.level;
                fetchQuakesByApi(url, function (quakes, notificationQuakes) {
                    self.setState({
                            quakes: quakes,
                            notificationQuakes: notificationQuakes,
                            loading: false,
                            error: null
                        }
                    );
                });
            }
        } else {
            url = url + self.props.level;
            fetchQuakesByApi(url, function (quakes, notificationQuakes) {
                self.setState({
                        quakes: quakes,
                        notificationQuakes: notificationQuakes,
                        loading: false,
                        error: null
                    }
                );
            });
            self.props.onRefreshData(false);
        }


    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isConnected) {
            this.fetchQuakes(nextProps);
        } else {
            // nextProps.onRefreshData(false);
            Alert.alert(
                'Network unavailable',
                'The Internet connection appears to be offline',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});
        if (isConnected) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        if (this.props.isConnected) {
            if (this.state.quakes.length <= 0) {
                this.fetchQuakes();
            }

            if (this.props.refreshing) {
                this.fetchQuakes();
            }
        }
        this.interval = setInterval(() => {
            this.fetchQuakes();
            console.log('called interval')
        }, 1000 * 10);

        // //Every half hour call data api.
        // timer = setInterval(() => {
        //     this.fetchQuakes();
        //     console.log('6min!')
        // }, 1000 * 60);


    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        // clearInterval(timer);
        console.log('unmount',this.interval)
        this.interval && clearInterval(this.interval);
        console.log('unmount',this.interval)
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
     * @returns {XML}
     */
    renderLoadingView = () => {
        return (
            <Text>Loading...</Text>
        )
    }
    /**
     *
     * @param isConnected
     * @param quake
     */
    onQuakeDetail = (isConnected, quake) => {
        this.props.navigation.navigate('Detail', {isConnected, quake});
    };

    render() {
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

                              onPress={() => this.onQuakeDetail(this.state.isConnected, quake)}
                    />
                ))}
            </List>

        )
    }

}
