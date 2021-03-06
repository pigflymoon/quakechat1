import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';

import tabsStyle from '../styles/tabs';
import UsgsTab from './UsgsTab';
import GeoNetLevelTab from './GeoNetLevelTab';
import Utils from '../utils/utils';

export  default class QuakeLevelTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeTab: 'newzealand',
            level: 0,
            usgslevel: '',
            life: ''
        };

    }


    setActiveTab(tab) {
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.linear, duration: 250})
        this.setState({activeTab: tab});
    }


    handleQuakeLevel = (life, level) => {
        if (this.state.activeTab === 'newzealand') {
            this.props.onQuakeLevel('newzealand', this.state.activeTab, level, '');
            this.setState({
                level: level,
            })
        } else {
            this.props.onQuakeLevel('global', this.state.activeTab, level, life);
            this.setState({
                usgslevel: level,
                life: life,
            })
        }

    }

    renderDataSource() {
        const {activeTab} = this.state
        const newzealandStyles = [
            tabsStyle.tab, activeTab === 'newzealand' && tabsStyle.activeTab
        ]
        const globalStyles = [
            tabsStyle.tab, activeTab === 'global' && tabsStyle.activeTab
        ]
        const newzealandTextStyles = [
            tabsStyle.tabText, activeTab === 'newzealand' && tabsStyle.activeTabText
        ]
        const globalTextStyles = [
            tabsStyle.tabText, activeTab === 'global' && tabsStyle.activeTabText
        ]

        return ((this.state.activeTab === 'newzealand' ) ? <TouchableOpacity
                style={newzealandStyles}
                onPress={() => this.setActiveTab('newzealand')}>
                <Text style={newzealandTextStyles}>
                    New Zealand
                </Text>
            </TouchableOpacity> :
            <TouchableOpacity
                style={globalStyles}
                onPress={() => this.setActiveTab('global')}>
                <Text style={globalTextStyles}>
                    Global
                </Text>
            </TouchableOpacity>);
    }

    renderTabs() {
        return (
            <View style={tabsStyle.tabsContainer}>
                <View style={tabsStyle.tabs}>

                    {this.renderDataSource()}
                </View>
                {this.renderTabsContent()}
            </View>
        )
    }

    renderTabsContent() {
        const {activeTab} = this.state
        return ( (activeTab === 'newzealand') ? <GeoNetLevelTab onQuakeGeoNetLevel={this.handleQuakeLevel}/> :
                <UsgsTab onQuakeUsgsLevel={this.handleQuakeLevel}/>
        );

    }
    componentDidMount() {
        AsyncStorage.getItem("dataSource").then((value) => {
            if (value) {
                if (value === 'geonet') {
                    this.setState({activeTab: 'newzealand'});
                } else {
                    this.setState({activeTab: 'global'})
                }
            } else {
                this.setState({activeTab: 'newzealand'});//when first time load the app,value is null to set default one
            }


        });
    }
    componentWillReceiveProps() {
        AsyncStorage.getItem("dataSource").then((value) => {
            if (value) {
                if (value === 'geonet') {
                    this.setState({activeTab: 'newzealand'});
                } else {
                    this.setState({activeTab: 'global'})
                }
            } else {
                this.setState({activeTab: 'newzealand'});//when first time load the app,value is null to set default one
            }


        });
    }

    render() {
        var isConnected = this.props.isConnected;
        if (!isConnected) {
            return Utils.renderOffline();
        }
        return (
            <View>
                {this.renderTabs()}
            </View>
        );
    }
}
