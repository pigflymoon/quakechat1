import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    Picker,
    Platform,
    Switch,

} from 'react-native';

import Label from '../components/Label';
import SettingStyle from '../styles/setting';
import ResourcesList from '../components/ResourcesList';

export default class Links extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <ScrollView style={SettingStyle.container}>
                <Label text="Resources List"/>
                <ResourcesList/>
            </ScrollView>
        )
    }

}

