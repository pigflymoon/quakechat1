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
import Copyright from '../components/Copyright';

export default class About extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <ScrollView style={SettingStyle.container}>
                <Label text="ACKNOWLEDGEMENTS"/>
                <View style={SettingStyle.box}>
                    <Text style={SettingStyle.text}>
                        QuakeChat has utilized the following copyrighted matererial:
                        We acknowledge the New Zealand GeoNet project and its sponsors EQC, GNS Science and LINZ,
                        for providing data used by this app.
                    </Text>
                    <Text style={SettingStyle.text}>
                        We acknowledge the New Zealand GeoNet project ant its sponsors EQC, GNS Science and LINZ,
                        for providing data/images used in this app.
                    </Text>
                    <Text style={SettingStyle.text}>
                        The main data is sourced from geonet.org.nz with the latest version linking into the genet
                        rapid feed which is returning data within a couple of minutes, View the latest earthquake data
                        from GeoNet and see all detected quakes in New Zealand over the last few days in a list where
                        you can get various details on each quake, including magnitude, depth, and position on a map.
                        You may also be alerted to the latest earthquakes over magnitude by settings within minutes of
                        their occurrence.
                    </Text>
                    <Text style={SettingStyle.text}>
                        New Zealand has over 15,000 earthquakes every year, most of which are small and often unnoticed.
                        You may be surprised at how many there are. As this app uses GeoNet's data feed it shows many of
                        the smaller earthquakes that don't normally feature on their website.
                    </Text>
                    <Text style={SettingStyle.text}>
                        This application makes use of the following third party libraries:

                    </Text>
                </View>


                <Copyright/>

            </ScrollView>
        )
    }

}

