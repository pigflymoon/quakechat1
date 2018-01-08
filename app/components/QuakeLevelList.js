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


    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;
        this.setState({isConnected: isConnected});

        if (nextProps.isConnected) {
            var self = this;
            AsyncStorage.getItem("ruleValue").then((value) => {
                if (value) {
                    var savedRule = value;
                    self.fetchQuakes(nextProps, savedRule);
                }
            });

        }
    }

    componentDidMount() {
        var notificationRule,self = this;
        if (this.props.isConnected) {
            AsyncStorage.getItem("ruleValue").then((value) => {
                // if (value) {
                    notificationRule = value;
                    if (self.state.quakes.length <= 0) {
                        self.fetchQuakes(false, notificationRule);
                    }
                    self.quakesInterval = BackgroundTimer.setInterval(() => {
                        self.fetchQuakes(false, notificationRule);
                    }, 1000 * 60 * 1);

                    if (self.props.refreshing) {
                        self.fetchQuakes(false, notificationRule);
                    }
                // }

            });

        }

    }


    componentWillUnmount() {
        BackgroundTimer.clearInterval(this.quakesInterval);
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
