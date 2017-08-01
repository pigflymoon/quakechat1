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

import {List, ListItem} from 'react-native-elements';

import colors from '../styles/colors';
import {bind} from '../utils/utils';


export default class About extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <ScrollView>
               <Text>QuakeChat has utilized the following copyrighted matererial:
                   We acknowledge the New Zealand GeoNet project and its sponsors EQC, GNS Science and LINZ, for providing data used by this app.
               </Text>
            </ScrollView>
        )
    }

}

