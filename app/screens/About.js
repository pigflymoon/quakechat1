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


    componentDidMount() {


    }

    render() {

        return (
            <ScrollView>
                <List>



                </List>
            </ScrollView>
        )
    }

}

