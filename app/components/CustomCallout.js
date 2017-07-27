import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import callout from '../styles/callout';

class CustomCallout extends Component {
    render() {
        return (
            <View style={[callout.container, this.props.style]}>
                <View style={callout.bubble}>
                    <View style={callout.amount}>
                        {this.props.children}
                    </View>
                </View>
                {/*<View style={callout.arrowBorder}/>*/}
                {/*<View style={callout.arrow}/>*/}
            </View>
        );
    }
}

module.exports = CustomCallout;