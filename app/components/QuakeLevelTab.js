import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';

import tabsStyle from '../styles/tabs';
import UsgsTab from './UsgsTab';
import GeoNetLevelTab from './GeoNetLevelTab';

export  default class QuakeLevelTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // values: ['All', 'Weak+', 'Light+', 'Moderate+', 'Strong+', 'Severe+'],
            // value: 'Not selected',
            // selectedIndex: 0,
            // showIndexValue: '',
            activeTab: 'newzealand',
            level: 0,
            usgslevel: 'all',
            life: 'hour'
        };
    }


    setActiveTab(tab) {
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.linear, duration: 250})
        this.setState({activeTab: tab});
        console.log('tab is ',tab)
        this.props.onDataSource(tab)
    }

    handleQuakeLevel = (level) => {
        console.log('reture to level tab', level)
        this.props.onQuakeLevel(level);
        this.setState({
            level: level
        })
    }
    handleQuakeLifeCycle = (life) => {
        this.setState({
            life: life
        })
    }

    handleQuakeUsgsLevel = (level) => {
        console.log('usgs level',level)
        this.setState({
            usgslevel: level,
        })
    }

    renderTabs() {
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

        return (
            <View style={tabsStyle.tabsContainer}>
                <View style={tabsStyle.tabs}>
                    <TouchableOpacity
                        style={newzealandStyles}
                        onPress={() => this.setActiveTab('newzealand')}>
                        <Text style={newzealandTextStyles}>
                            New Zealand
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles}
                        onPress={() => this.setActiveTab('global')}>
                        <Text style={globalTextStyles}>
                            Global
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderTabsContent()}
            </View>
        )
    }

    renderTabsContent() {
        const {activeTab} = this.state
        return activeTab === 'newzealand' ? <GeoNetLevelTab onQuakeLevel={this.handleQuakeLevel}/> :
            <UsgsTab onLifeCycle={this.handleQuakeLifeCycle} onQuakeUsgsLevel={this.handleQuakeUsgsLevel}/>
    }

    render() {
        return (
            <View>
                {this.renderTabs()}
            </View>
        );
    }
}
