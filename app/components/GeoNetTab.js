import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet
} from 'react-native';
import tabsStyle from '../styles/tabs';

export  default class GeoNetTab extends Component {
    constructor(props, context) {
        super(props, context)
    }


    state = {
        values: ['All', 'Weak+', 'Light+', 'Moderate+', 'Strong+', 'Severe+'],
        value: 'Not selected',
        selectedIndex: 0,
        showIndexValue: ''
    };

    render() {
        return (
            <View style={tabsStyle.tabsTop}>
                <SegmentedControlIOS
                    values={this.state.values}
                    selectedIndex={this.state.selectedIndex}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}/>
            </View>
        );
    }


}
