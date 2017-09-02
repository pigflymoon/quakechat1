import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';
import {Badge} from 'react-native-elements';
import tabsStyle from '../styles/tabs';
import UsgsLevelTab from './UsgsLevelTab';


export  default class UsgsTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            values: ['All', 'Weak+', 'Light+', 'Moderate+', 'Strong+', 'Severe+'],
            value: 'Not selected',
            selectedIndex: 0,
            showIndexValue: '',
            activeTag: 'hour',
        };
    }


    setActiveTab(tag) {
        LayoutAnimation.configureNext({...LayoutAnimation.Presets.linear, duration: 250})
        this.setState({activeTag: tag})
    }


    renderTabs() {
        const {activeTag} = this.state;
        const hourStyles = [
            tabsStyle.tag, activeTag === 'hour' && tabsStyle.activeTag
        ];
        const dayStyles = [
            tabsStyle.tag, activeTag === 'day' && tabsStyle.activeTag
        ];
        const days7Styles = [
            tabsStyle.tag, activeTag === '7days' && tabsStyle.activeTag
        ];
        const days30Styles = [
            tabsStyle.tag, activeTag === '30days' && tabsStyle.activeTag
        ];


        return (
            <View style={tabsStyle.tabsContainer}>
                <View style={tabsStyle.tabs}>
                    <Badge containerStyle={hourStyles} wrapperStyle={{marginBottom:2}}
                           onPress={() => this.setActiveTab('hour')}>
                        <Text style={tabsStyle.tagText}>Past Hour</Text>
                    </Badge>
                    <Badge containerStyle={dayStyles} wrapperStyle={{marginBottom:2}}
                           onPress={() => this.setActiveTab('day')}>
                        <Text style={tabsStyle.tagText}>Past Day</Text>
                    </Badge>
                    <Badge containerStyle={days7Styles} wrapperStyle={{marginBottom: 2}}
                           onPress={() => this.setActiveTab('7days')}>
                        <Text style={tabsStyle.tagText}>Past 7 Days</Text>
                    </Badge>
                    <Badge containerStyle={days30Styles} wrapperStyle={{marginBottom: 2}}
                           onPress={() => this.setActiveTab('30days')}>
                        <Text style={tabsStyle.tagText}>Past 30 Days</Text>
                    </Badge>
                </View>
                {this.renderTabsContent()}
            </View>
        )
    }

    renderTabsContent() {
        const {activeTag} = this.state
        return  <UsgsLevelTab />
    }

    render() {
        return (
            <View>
                {this.renderTabs()}
            </View>
        );
    }

}
