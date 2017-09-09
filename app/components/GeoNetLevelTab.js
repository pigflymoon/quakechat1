import React, {Component} from 'react';
import {
    SegmentedControlIOS,
    Text,
    View,
    StyleSheet
} from 'react-native';
import tabsStyle from '../styles/tabs';

export  default class GeoNetLevelTab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            values: ['All', 'Weak+', 'Light+', 'Moderate+', 'Strong+', 'Severe+'],
            value: 'Not selected',
            selectedIndex: 0,
            showIndexValue: 0,
            activeTab: 'newzealand',
        };
    }
    componentDidMount(){
        //set default for geonet data
        this.props.onQuakeLevel('',this.state.showIndexValue);
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
        this.props.onQuakeLevel('',showIndexValue);
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
