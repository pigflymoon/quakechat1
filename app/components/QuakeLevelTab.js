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
import GeoNetTab from './GeoNetTab';

export  default class QuakeLevelTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            values: ['All', 'Weak+', 'Light+', 'Moderate+', 'Strong+', 'Severe+'],
            value: 'Not selected',
            selectedIndex: 0,
            showIndexValue: '',
            activeTab: 'newzealand',
        };
    }



    setActiveTab (tab) {
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.linear, duration: 250})
        this.setState({activeTab: tab})
    }


    renderTabs () {
        const { activeTab } = this.state
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
    renderTabsContent () {
        const { activeTab } = this.state
        return activeTab === 'global' ? <GeoNetTab /> : <UsgsTab />
    }

    render() {
        return (
            <View>
                {this.renderTabs()}
            </View>
        );
    }

    // onChange = (event) => {
    //
    //     let selectedIndex = (event.nativeEvent.selectedSegmentIndex), showIndexValue;
    //     showIndexValue = selectedIndex;
    //     if (showIndexValue > 0) {
    //         showIndexValue = showIndexValue + 2;
    //     }
    //     this.setState({
    //         selectedIndex: selectedIndex,
    //         showIndexValue: showIndexValue
    //     });
    //     this.props.onQuakeLevel(showIndexValue);
    // };
    //
    // onValueChange = (value) => {
    //     this.setState({
    //         value: value,
    //     });
    //
    // };
}
