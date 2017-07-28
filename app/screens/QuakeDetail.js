import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';

import QuakeMap from '../components/QuakeMap';

export default class QuakeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: this.props.navigation.state.params.isConnected,
        };
    }

    onQuakeQuality = (quake) => {
        this.props.navigation.navigate('Quality', quake);
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //
    //     var isConnected = nextProps.navigation.state.params.isConnected
    //     console.log('should update',isConnected)
    //     if (isConnected) {
    //         this.setState({isConnected: isConnected});
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        // console.log('detail')
        // console.log(this.props.navigation.state.params)
        const {geometry, properties, utime} = this.props.navigation.state.params;
        return (
            <View style={quakeStyle.container}>

                <ScrollView style={StyleSheet.absoluteFill}
                            contentContainerStyle={quakeStyle.scrollview}>
                    <QuakeMap style={quakeStyle.map} mapInfo={this.props.navigation.state.params}
                              isConnected={this.state.isConnected}/>


                    <List style={quakeStyle.detail}>
                        <ListItem
                            title="Universal Time"
                            rightTitle={utime}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Time"
                            rightTitle={properties.time}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Magnitude"
                            rightTitle={properties.magnitude}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Latitude"
                            rightTitle={(geometry.coordinates)[1].toFixed(2)}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Longitude"
                            rightTitle={(geometry.coordinates)[0].toFixed(2)}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Location"
                            rightTitle={properties.locality}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Quality"
                            rightTitle={properties.quality}
                            rightTitleStyle={quakeStyle.linkTitle}
                            hideChevron
                            onPress={() => this.onQuakeQuality(properties.quality)}
                        />

                    </List>


                </ScrollView>
            </View>
        )
    }
}
