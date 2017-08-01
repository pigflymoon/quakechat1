import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-elements';
import quakeStyle from '../styles/quake';


export default class QuakeQuality extends Component {
    render() {
        return (
            <View style={quakeStyle.container}>
                <Card title='Best'>
                    <Text style={quakeStyle.qualityText}>This earthquake location has been manually reviewed and has the best quality location.
                    </Text>
                </Card>
                <Card title='Good'>
                    <Text style={quakeStyle.qualityText}>
                        This is an automatic earthquake location with a lot of observations. It is likely to be
                        good quality </Text>
                </Card>
                <Card title='Caution'>
                    <Text style={quakeStyle.qualityText}>
                        This is an automatic earthquake location with only a few observations. Treat with
                        caution. </Text>
                </Card>
                <Card title='Deleted'>
                    <Text style={quakeStyle.qualityText}>
                        We don't have any quality information for this location at the moment.</Text>
                </Card>

            </View>
        )
    }
}

