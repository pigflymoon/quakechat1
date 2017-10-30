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
import QuakeItem from './QuakeItem';
import Config from '../config/ApiConfig';
import listStyle from '../styles/list';


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
            // geonetNotificationQuakes: [],
            // usgsNotificationQuakes: [],
            foreground: true,
            // appState: AppState.currentState,
            // previousAppStates: [],
        };

    }

    /**
     *
     * @param nextProps
     */
    fetchQuakes(nextProps, notificationRule) {
        let self = this;
        // console.log('QuakesList called nextProps ', nextProps)


        if (nextProps) {
            let geoUrl = Config.api.quakes_geonet_url + nextProps.level;
            let usgUrl = Config.api.quakes_usgs_url + nextProps.level;
            let usgLevel = (nextProps.level).toString().split("_")[0];
            if (nextProps.refreshing == true) {
                if (nextProps.tab === 'newzealand') {
                    // console.log('refresh', nextProps.level, geoUrl)
                    fetchQuakesByApi(notificationRule, nextProps.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        // console.log('**********nextProps refreshing newzealand***********', notificationQuakes)
                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                // geonetNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                        nextProps.onRefreshData(false);
                        self.props.onNotification(notificationQuakes);

                        // this.stopTimer();
                    });
                } else {
                    fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        // console.log('**********nextProps refreshing usgs***********', notificationQuakes)

                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                // usgsNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );
                        self.props.onNotification(notificationQuakes);
                        nextProps.onRefreshData(false);
                    })
                }

            } else {
                console.log('next Props tab', nextProps.tab)
                if (nextProps.tab === 'newzealand') {
                    fetchQuakesByApi(notificationRule, nextProps.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                // geonetNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,

                            }
                        );

                        console.log('self props', self.props)
                        // var geonetNotificationQuakes = {
                        //     geonetNotificationQuakes: notificationQuakes
                        // }
                        self.props.onNotification(notificationQuakes);

                    });

                } else {
                    fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                        self.setState({
                                quakes: quakes,
                                // notificationQuakes: notificationQuakes,
                                // usgsNotificationQuakes: notificationQuakes,
                                loading: false,
                                error: null,
                            }
                        );
                        // console.log('usgs tab notificationQuakes', notificationQuakes)
                        // var usgsNotificationQuakes = {
                        //     usgsNotificationQuakes: notificationQuakes
                        // }
                        self.props.onNotification(notificationQuakes);
                    });
                }

            }
        } else {
            console.log('level', self.props.level)
            let geoUrl = Config.api.quakes_geonet_url + self.props.level;
            let usgUrl = Config.api.quakes_usgs_url + self.props.level;
            let usgLevel = (self.props.level).toString().split("_")[0];
            // console.log('********first time*********', self.props.tab)
            if (self.props.tab === 'newzealand') {
                fetchQuakesByApi(notificationRule, self.props.level, 'geonet', geoUrl, function (quakes, notificationQuakes) {
                    // console.log('newzealand tab notificationQuakes', notificationQuakes)
                    self.setState({
                            quakes: quakes,
                            // notificationQuakes: notificationQuakes,
                            // geonetNotificationQuakes: notificationQuakes,//first filter only by time
                            loading: false,
                            error: null,
                        }
                    );
                    // console.log('self props', self.props)
                    self.props.onNotification(notificationQuakes);

                });
                self.props.onRefreshData(false);
            } else {
                fetchQuakesByApi(notificationRule, usgLevel, 'usgs', usgUrl, function (quakes, notificationQuakes) {
                    // console.log('usgs tab notificationQuakes', notificationQuakes)
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

        // console.log('nextProps....', nextProps)
        if (nextProps.isConnected) {
            AsyncStorage.getItem("ruleValue").then((value) => {
                // console.log('quake ruleValue', value)
                if (value) {
                    var savedRule = value;
                    this.fetchQuakes(nextProps, savedRule);
                }
            });

        }
    }

    componentDidMount() {
        var notificationRule;
        if (this.props.isConnected) {
            AsyncStorage.getItem("ruleValue").then((value) => {
                if (value) {
                    notificationRule = value;
                    // console.log('!!!!!!!!!!!!!!this props&&&&&&&&&&&&&&&&', this.props)

                    if (this.state.quakes.length <= 0) {
                        this.fetchQuakes(false, notificationRule);
                    }
                    //
                    this.quakesInterval = BackgroundTimer.setInterval(() => {
                        // console.log('*************fetch data 1min************', new Date())
                        this.fetchQuakes(false, notificationRule);
                    }, 1000 * 60 * 1);

                    if (this.props.refreshing) {
                        this.fetchQuakes(false, notificationRule);
                    }
                }

            });

        }

    }


    componentWillUnmount() {
        console.log('this interval list',this.quakesInterval)
        BackgroundTimer.clearInterval(this.quakesInterval);
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
