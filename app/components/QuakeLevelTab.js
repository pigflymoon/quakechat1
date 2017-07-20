import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet
} from 'react-native';

export  default class QuakeLevelTab extends Component {
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
            <View>
                <SegmentedControlIOS
                    values={this.state.values}
                    selectedIndex={this.state.selectedIndex}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}/>
            </View>
        );
    }

    onChange = (event) => {

        let selectedIndex = (event.nativeEvent.selectedSegmentIndex), showIndexValue;
        showIndexValue = selectedIndex;
        if (showIndexValue > 0) {
            showIndexValue = showIndexValue + 2;
        }
        this.setState({
            selectedIndex: selectedIndex,
            showIndexValue: showIndexValue
        });
        this.props.onQuakeLevel(showIndexValue);
    };

    onValueChange = (value) => {
        this.setState({
            value: value,
        });

    };
}

var styles = StyleSheet.create({
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 10,
    },

});