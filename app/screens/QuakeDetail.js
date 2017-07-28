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
        console.log(this.props.navigation.state.params)
        const {quake} = this.props.navigation.state.params;
        // console.log(quake);
        return (
            <View style={quakeStyle.container}>

                <ScrollView style={StyleSheet.absoluteFill}
                            contentContainerStyle={quakeStyle.scrollview}>
                    <QuakeMap style={quakeStyle.map} mapInfo={this.props.navigation.state.params}
                              isConnected={this.state.isConnected}/>


                    <List style={quakeStyle.detail}>
                        <ListItem
                            title="Universal Time"
                            rightTitle={quake.utime}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Time"
                            rightTitle={quake.time}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Magnitude"
                            rightTitle={quake.magnitude}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Depth"
                            rightTitle={quake.depth}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Latitude"
                            rightTitle={`${(quake.coordinates).latitude}`}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Longitude"
                            rightTitle={`${(quake.coordinates).longitude}`}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Location"
                            rightTitle={quake.locality}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Quality"
                            rightTitle={quake.quality}
                            rightTitleStyle={quakeStyle.linkTitle}
                            hideChevron
                            onPress={() => this.onQuakeQuality(quake.quality)}
                        />

                    </List>


                </ScrollView>
            </View>
        )
    }
}
