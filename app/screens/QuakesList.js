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
import listStyle from '../styles/list';
import Config from '../config/ApiConfig';

export default class QuakesList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            level: 0,
            refreshing: false,
            isConnected: false,
            api_source: Config.api.quakes_geonet_url,
            tab: 'newzealand'
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);

        var isConnected = nextProps.screenProps.isConnected;//update netinfo
        console.log('list  is ?', nextProps)
        console.log('list  is ?', isConnected)
        this.setState({isConnected: isConnected});
        if (!nextProps.screenProps.isConnected) {
            this.setState({
                refreshing: false,
            });
        }
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

    handleQuakeLevel = (tab, level, life) => {
        console.log('this prop tab')
        var url = Config.api.quakes_geonet_url;
        if (tab === 'global') {
            url = Config.api.quakes_usgs_url;
            console.log('global quake api url', url);
            this.setState({
                tab: tab,
                api_source: url,
                level: `${level}_${life}.geojson`
            })
        } else {
            console.log('newzealand quake api url', url);
            this.setState({
                tab: tab,
                api_source: url,
                level: level
            })
        }


        // let url = (tab === 'newzealand') ? Config.api.quakes_geonet_url : usgs_url;
        // console.log('quake api url', url);
        // this.setState({
        //     api_source: url
        // })
        // this.setState({
        //     level: level
        // })
    }


    handleTab = (tab) => {
        console.log('tab ', tab);
    }
    handleDataSource = (tab, life, level) => {
        console.log('quake list  tab life level', tab, life, level)
        let usgs_url = Config.api.quakes_usgs_url + `${level}_${life}.geojson`;
        let url = (tab === 'newzealand') ? Config.api.quakes_geonet_url : usgs_url;
        console.log('quake api url', url);
        this.setState({
            api_source: url
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
                style={listStyle.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.getRefreshData}
                    />}
            >
                <QuakeLevelTab onQuakeLevel={this.handleQuakeLevel} tab={this.handleTab}/>
                <QuakeLevelList onRefreshData={this.handleRefreshData} navigation={this.props.navigation}
                                nps_source={this.state.api_source}
                                tab={this.state.tab}
                                refreshing={this.state.refreshing}
                                level={this.state.level}
                                isConnected={true}
                />
            </ScrollView>
        )
    }

    componentWillUnmount() {
        console.log('list will unmount')
    }

    render() {
        var isConnected = this.props.screenProps.isConnected;
        if (!isConnected) {
            return this.renderOffline();
        }
        if (this.state.loading) {
            return this.renderLoadingView();
        }
        return this.renderList();
    }
}

