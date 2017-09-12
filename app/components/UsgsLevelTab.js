import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet
} from 'react-native';
import tabsStyle from '../styles/tabs';

export  default class UsgsLevelTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            values: ['All', '1.0+', '2.5+', '4.5+', 'Significant+'],
            value: 'Not selected',
            selectedIndex: 0,
            showIndexValue: ''
        };


    }


    onChange = (event) => {

        let selectedIndex = (event.nativeEvent.selectedSegmentIndex), showIndexValue;

        switch (selectedIndex) {
            case 0:
                showIndexValue = 'all';
                break;
            case 1:
                showIndexValue = '1.0';
                break;
            case 2:
                showIndexValue = '2.5';
                break;
            case 3:
                showIndexValue = '4.5';
                break;
            case 4:
                showIndexValue = 'significant';
                break;
            default:
                showIndexValue = 'all';;
        }

        this.setState({
            selectedIndex: selectedIndex,
            showIndexValue: showIndexValue
        });
        this.props.onQuakeUsgsLevel(showIndexValue);
    };

    onValueChange = (value) => {
        this.setState({
            value: value,
        });

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
