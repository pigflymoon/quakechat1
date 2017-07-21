import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
    Icon,
    StyleSheet,
    AppState,
    Picker,
    Platform,
    RefreshControl
} from 'react-native';

import {bind} from '../utils/utils';
import QuakeLevelTab from '../components/QuakeLevelTab';
import QuakeLevelList from '../components/QuakeLevelList';

let nps_url = "https://api.geonet.org.nz/quake?MMI=";

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            level: 0,
            refreshing: false,
        };

        bind(this)('handleQuakeLevel', 'handleRefreshData', 'getRefreshData')
    }

    getRefreshData() {
        this.setState({
            refreshing: true
        });
    }


    handleRefreshData(value) {
        this.setState({
            refreshing: value
        });
    }

    handleQuakeLevel(level) {
        this.setState({
            level: level
        })
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.getRefreshData}
                    />}
            >
                <QuakeLevelTab onQuakeLevel={this.handleQuakeLevel}/>
                <QuakeLevelList onRefreshData={this.handleRefreshData} navigation={this.props.navigation}
                                nps_source={nps_url}
                                refreshing={this.state.refreshing}
                                level={this.state.level}/>
            </ScrollView>
        )
    }

}

