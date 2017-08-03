import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
    RefreshControl,
    Alert,
} from 'react-native';

import QuakeLevelTab from '../components/QuakeLevelTab';
import QuakeLevelList from '../components/QuakeLevelList';
import showInfo from '../styles/showInfo';

let nps_url = "https://api.geonet.org.nz/quake?MMI=";

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            level: 0,
            refreshing: false,
            isConnected: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextProps.screenProps;//update netinfo
        if (isConnected) {
            this.setState({isConnected: isConnected});
            return true;
        }
        return false;
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    getRefreshData = () => {
        // this.state.isConnected = false;
        console.log(this.state.isConnected);
        if (!this.state.isConnected) {
            this.setState({
                refreshing: false
            });
        } else {
            this.setState({
                refreshing: true,
            });
        }

    }

    handleRefreshData = (value) => {
        this.setState({
            refreshing: value
        });
    }

    handleQuakeLevel = (level) => {
        this.setState({
            level: level
        })
    }

    renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>

        )
    }

    renderList = () => {
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
                                level={this.state.level}
                                isConnected={this.props.screenProps}
                />
            </ScrollView>
        )
    }

    render() {
        var isConnected = this.props.screenProps;
        if (!isConnected) {
            return this.renderOffline();
        }
        if (this.state.loading) {
            return this.renderLoadingView();
        }
        return this.renderList();
    }
}

