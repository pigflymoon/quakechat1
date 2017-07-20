import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-elements';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export default class QuakeQuality extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Card title='Best'>
                    <Text style={{marginBottom: 10}}>This earthquake location has been manually reviewed and has the best quality location.
                    </Text>
                </Card>
                <Card title='Good'>
                    <Text style={{marginBottom: 10}}>
                        This is an automatic earthquake location with a lot of observations. It is likely to be
                        good quality </Text>
                </Card>
                <Card title='Caution'>
                    <Text style={{marginBottom: 10}}>
                        This is an automatic earthquake location with only a few observations. Treat with
                        caution. </Text>
                </Card>
                <Card title='Deleted'>
                    <Text style={{marginBottom: 10}}>
                        We don't have any quality information for this location at the moment.</Text>
                </Card>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },

    text: {
        flex: 1,
    },

});