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
import Utils from '../utils/utils';
import listStyle from '../styles/list';
import Config from '../config/ApiConfig';

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            level: 0,
            refreshing: false,
            isConnected: true,
            api_source: '',
            tab: '',
            connectionInfo: this.props.screenProps.connectionInfo

        };
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.screenProps.currentScreen != 'QuakesList') {
        //     return;
        // }
        var isConnected = nextProps.screenProps.isConnected;//update netinfo

        this.setState({
            isConnected: isConnected,
            connectionInfo: nextProps.screenProps.connectionInfo,
        });
        if (!nextProps.screenProps.isConnected) {
            this.setState({
                refreshing: false,
            });
        }
    }

    getRefreshData = () => {
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


    handleNotification = (value) => {
        this.props.screenProps.onNotification(value);
    }

    handleQuakeLevel = (tab, tag, level, life) => {
        var url = Config.api.quakes_geonet_url;
        if (tab === 'global') {
            url = Config.api.quakes_usgs_url;
            this.setState({
                tab: 'global',
                tag: tag,
                api_source: url,
                level: `${level}_${life}.geojson`
            })
        } else {
            this.setState({
                tab: 'newzealand',
                tag: tag,
                api_source: url,
                level: level
            })
        }

    }

    renderList = () => {
        return (
            <ScrollView
                style={listStyle.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.getRefreshData}
                    />}
            >
                <QuakeLevelTab onQuakeLevel={this.handleQuakeLevel} isConnected={this.props.screenProps.isConnected}/>
                <QuakeLevelList onRefreshData={this.handleRefreshData} navigation={this.props.navigation}
                                nps_source={this.state.api_source}
                                tab={this.state.tab}
                                tag={this.state.tag}
                                refreshing={this.state.refreshing}
                                level={this.state.level}
                                isConnected={true}
                                currentScreen={this.props.screenProps.currentScreen}
                                onNotification={this.handleNotification}

                />
            </ScrollView>
        )
    }

    render() {
        var isConnected = this.props.screenProps.isConnected;
        // console.log('props QuakesList ', this.props.screenProps.currentScreen)
        // console.log(' props QuakesList ',((this.props.screenProps.currentScreen != 'List' || this.props.screenProps.currentScreen != 'QuakesList')))
        // if ((this.props.screenProps.currentScreen != 'QuakesList') && (this.props.screenProps.currentScreen != 'Detail')) {
        //     return null;
        // }
        if (!isConnected) {
            return Utils.renderOffline();
        }
        if (this.state.isLoading) {
            return Utils.renderLoadingView();
        }
        return this.renderList();
    }
}

